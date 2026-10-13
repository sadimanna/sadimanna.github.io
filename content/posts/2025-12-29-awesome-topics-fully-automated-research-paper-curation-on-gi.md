---
title: "awesome-topics: Fully Automated Research Paper Curation on GitHub Pages — Part 5"
date: 2025-12-29
permalink: /blog/awesome-topics-fully-automated-research-paper-curation-on-gi/
canonical_url: https://medium.com/@mannasiladittya/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-5-0d79862bf224
tags: [github-actions, automation, research, awesome-topics]
---
---

![](/images/blog/awesome-topics-fully-automated-research-paper-curation-on-gi/img1.jpeg)

This article directly matches the below intended design idea:

> run part of the workflow on a self-hosted runner, commit results, and let that push trigger the rest of the workflow on GitHub-hosted runners.

This is particularly useful if the GCP VM that we created in the previous part of our article series has usage limitations. Check the article below for some context:

[**awesome-topics: Fully Automated Research Paper Curation on GitHub Pages — Part 4**  
*A Deep, Practical Guide to a self-hosted runner on GCP/AWS to run a GitHub workflow file*medium.com](https://medium.com/the-owl/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-4-709ea8b515d3 "https://medium.com/the-owl/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-4-709ea8b515d3")

---

In the previous article of this series, we used a self-hosted GitHub Actions runner on GCP. However, there is still one architectural problem left to solve:

> ***Not every workflow step should run on a self-hosted runner.***

In this article, we design a **hybrid GitHub Actions pipeline** where:

* **Phase 1** runs on a **self-hosted runner**
* **Phase 2** runs on **GitHub-hosted runners**
* The two phases are connected explicitly using a `workflow_run` trigger. The transition between phases is handled explicitly, avoiding fragile push-based chaining.

This pattern is the **correct, scalable, and future-proof design** for serious automation pipelines like `awesome-topics`.

---

### Why a Hybrid Pipeline Is Necessary

#### The Problem with “Everything on Self-Hosted”

A self-hosted runner is still:

* Persistent
* Privileged
* Network-reachable
* Able to mutate the repository

Running **all** workflows there creates risk:

* PRs become dangerous
* Permissions are harder to reason about
* Failures affect unrelated pipelines
* Free-tier resources are wasted on builds
* Prevents overusage of GCP VM instances.

#### The Problem with “Everything on GitHub-Hosted”

Conversely, GitHub-hosted runners are:

* Ephemeral
* Stateless
* Rate-limited
* Paid beyond free quotas

They are poorly suited for:

* Long-running crawlers
* External API polling (DBLP)
* Stateful data regeneration
* Research automation

---

### The Hybrid Solution

> Split responsibilities cleanly.

### Phase 1 — Producer

* Runs on a **self-hosted runner**
* Scheduled / manual
* Generates data
* Commits and pushes

### Phase 2 — Consumer

* Runs on **GitHub-hosted runners**
* Triggered by `push`
* Builds, deploys, publishes
* Never mutates repository state

---

### High-Level Architecture

Conceptually:


```text
(schedule / manual)
        ↓
```


Each phase has **clear ownership** and **clear trust boundaries**.

---

### Workflow 1: Producer (Self-Hosted)

This workflow is responsible for **generating and updating content**.

#### Key Properties

* No PR triggers
* No `push` trigger
* Commits only deterministic outputs
* Runs on GCP Always Free

#### Workflow 1 (search-dblp): Full YAML


```text
name: search-dblp

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * 0'  # every sunday at 00:00 hrs UTC
    
permissions:
  contents: write
  issues: write

concurrency:
  group: awesome-topics-runner
  cancel-in-progress: false

jobs:
  search:
    runs-on: self-hosted
    timeout-minutes: 7200
    env:
      TZ: "Asia/Kolkata"
      RUN_ENV: "prod" # within ['prod', 'dev']
      GH_USER: ${{ github.repository_owner }}
      PYTHONDONTWRITEBYTECODE: 1

    outputs:
      data_changed: ${{steps.diff.outputs.data_changed }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          # ref: ${{ github.head_ref }}
          fetch-depth: 0

      ################################################################################
      # install dependencies
      ################################################################################

      - name: Install dependencies
        run: |
          python3 -m pip install --upgrade pip
          if [ -f requirements.txt ]; then python3 -m pip install -r requirements.txt; fi

      # ============================================
      # Run DBLP Watcher to get latest papers
      # ============================================
      - name: Run dblp watcher
        run: |
          cd src
          python3 main.py run --env=${{ env.RUN_ENV }}

      - name: Setup var
        id: vars
        run: |
          raw="${MSG:-}"
          {
            echo "raw<<EOF"
            echo "$raw"
            echo "EOF"
          } >> "$GITHUB_OUTPUT"

      ################################################################################
      # CREATES ISSUE FOR NEW PAPERS
      ################################################################################
      - name: Create an issue for new papers
        if: ${{ steps.vars.outputs.raw != '' }}
        uses: JasonEtco/create-an-issue@v2
        env:
          MSG: ${{ steps.vars.outputs.raw }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          filename: .github/issue-template.md

      ################################################################################
      # COMMIT CHANGES IF ANY
      ################################################################################
      # ------------------------------------------------
      # Detect whether _data/*.yaml changed
      # ------------------------------------------------
      - name: Detect data changes
        id: diff
        run: |
          git status --porcelain
          if git diff --name-only | grep -q '^_data/.*\.ya\?ml$'; then
            echo "data_changed=true" >> "$GITHUB_OUTPUT"
          else
            echo "data_changed=false" >> "$GITHUB_OUTPUT"
          fi

      - name: Get date time
        id: date
        run: echo "date=$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$GITHUB_OUTPUT"

      # ------------------------------------------------
      # Commit only if changes exist
      # ------------------------------------------------
      - name: Commit Updated
        if: steps.diff.outputs.data_changed == 'true'
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "new papers added @ ${{ steps.date.outputs.date }} ${{ env.TZ }}"

      - name: Cleanup
        run: |
          rm -rf $GITHUB_WORKSPACE/*
```


#### Why This Workflow Does NOT Trigger Itself

Even though it pushes commits:

* It is **not triggered by** `push`
* It runs only on `schedule` or `workflow_dispatch`
* Looping is architecturally impossible

This is **stronger than relying on idempotency alone**.

---

### Workflow 2: Consumer (GitHub-Hosted)

This workflow reacts to changes produced by Workflow 1.

#### Responsibilities

* Update **README.md** and **docs/index.md**
* Build the site
* Run checks
* Deploy GitHub Pages

#### Workflow 2 (update-paper-list): Full YAML


```text
name: update-paper-list

on:
  workflow_run:
    workflows: ["search-dblp"]
    types: [completed]
  workflow_dispatch:
    
permissions:
  contents: write
  issues: write

jobs:
  update:
    if: >
      github.event_name == 'workflow_dispatch' ||
      ( github.event.workflow_run.conclusion == 'success' &&
      contains(github.event.workflow_run.head_commit.message, 'new papers added') )

    runs-on: ubuntu-latest
    timeout-minutes: 3600
    env:
      TZ: "Asia/Kolkata"
      RUN_ENV: "prod" # within ['prod', 'dev']
      GH_USER: ${{ github.repository_owner }}
      PYTHONDONTWRITEBYTECODE: 1

    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          # ref: ${{ github.head_ref }}
          fetch-depth: 0

      - name: Set up Python 3.8
        uses: actions/setup-python@v2
        with:
          python-version: 3.8

      - name: Install dependencies
        run: |
          python3 -m pip install --upgrade pip
          if [ -f requirements.txt ]; then python3 -m pip install -r requirements.txt; fi


      - name: Update readme
        run: |
          cd scripts && python3 main.py merge_md_yaml

      - name: Copy README.md to docs/index.md
        run: |
          mkdir -p docs
          cp README.md docs/index.md


      - name: Count papers per topic
        run: |
          cd scripts
          python3 count_topics.py

      - name: Generate topic distribution bar chart
        run: |
          cd scripts
          python3 generate_topic_barchart.py
      ################################################################################
      # COMMIT CHANGES IF ANY
      ################################################################################
      - name: Get date time
        id: date
        run: echo "date=$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$GITHUB_OUTPUT"

      - name: Commit Updated
        uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "auto update @ ${{ steps.date.outputs.date }} ${{ env.TZ }}"
```


---

> **Update: Why the push-based workflow failed and how it was fixed**

> In the original setup, I tried to chain workflows using a simple `push` trigger: one workflow would update the repository, and another would react to that push. On paper, this looks reasonable—but it turns out GitHub intentionally blocks this pattern when the push is made by a workflow using `GITHUB_TOKEN`. Even though files were updated and GitHub Pages rebuilt correctly, the downstream workflow never ran, because GitHub suppresses workflow triggers caused by automation-authored commits to prevent infinite loops.

---

> **Update: Workflow orchestration improvements**

> The automation pipeline was refactored to use `workflow_run`**–based chaining** instead of push-triggered workflows, ensuring deterministic execution and eliminating recursive triggers caused by `GITHUB_TOKEN` commits. The DBLP ingestion workflow now explicitly detects whether `_data/*.yaml` files actually changed using a Git diff, and exports this signal as a workflow output. The downstream rendering workflow runs **only when real data changes occur**, preventing no-op commits, unnecessary Pages rebuilds, and CI noise. Together, these changes add loop protection, path-level guards, and cleaner separation between data ingestion and documentation generation.

### Why This Separation Is So Important

#### Security

* Self-hosted runner never executes PR code
* GitHub-hosted runners handle public events
* No secrets exposed to forks

#### Reliability

* Generator failures do not block deployments
* Builds do not consume free-tier VM resources
* Each phase can be debugged independently

#### Scalability

* You can add more generators
* You can parallelize consumers
* You can move generators to other clouds later

---

Like, Clap and Share if you found this article useful!!

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-5-0d79862bf224).*
