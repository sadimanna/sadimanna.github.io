---
title: "awesome-topics: Fully Automated Research Paper Curation on GitHub Pages — Part 4"
date: 2025-12-28
permalink: /blog/awesome-topics-fully-automated-research-paper-curation-on-gi/
canonical_url: https://medium.com/@mannasiladittya/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-4-709ea8b515d3
tags: [github-actions, automation, research, awesome-topics]
---
---

![](/images/blog/awesome-topics-fully-automated-research-paper-curation-on-gi/img1.jpeg)

GitHub Actions are excellent for CI/CD, but many **research automation workflows** do not fit the standard CI mold. Pipelines that crawl external sources, regenerate datasets, update markdown indexes, and commit results back to the repository benefit from **persistent, controlled execution environments**. Also, there is a time limit of 360 minutes for execution on GitHub-hosted runners.

In this article, we build a **self-hosted GitHub Actions runner on Google Cloud Platform (GCP)** using the “**Always Free” tier**, and adapt it to our research automation project: `awesome-topics`.

This post is deliberately long and detailed. It answers not only *how* to set things up, but *why each decision is made*, addressing common confusions and subtle pitfalls along the way.

> ***Scope of this article***

* No Docker (yet)
* No PR-based CI
* Focus on scheduled, trusted automation
* Zero-cost, production-safe setup

**Docker isolation** and **hybrid workflows** are covered in later articles.

---

### Why a Self-Hosted Runner?

The `awesome-topics` pipeline performs tasks that are:

* Scheduled (daily DBLP queries)
* Stateful (updates `_data/` and `_docs/`)
* Deterministic (same inputs → same outputs)
* Repository-mutating (commits and pushes)
* Not performance-intensive

[**awesome-topics: Fully Automated Research Paper Curation on GitHub Pages — Part 1**  
*Get the venue and year-wise research paper list at <user-name>.github.io/awesome-topics*medium.com](https://medium.com/the-owl/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-1-4098f4222d66 "https://medium.com/the-owl/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-1-4098f4222d66")

Running these repeatedly on GitHub-hosted runners is unnecessary and brittle. A **self-hosted runner** gives us:

* Persistent environment
* Full control over dependencies
* No GitHub minutes consumed
* Predictable scheduling

> However, the primary reason for switching to the idea of a self-hosted runner is the time limit of 360 minutes time limit in GitHub Actions as the default maximum runtime for any single job.

---

### High-Level Architecture

At a conceptual level, the architecture is simple:


```text
GitHub Scheduler / Manual Trigger
            ↓
```


**Important:**  
GitHub never connects *to* your VM.  
The runner **polls GitHub outbound** over HTTPS.

---

### Step 1: Create a GCP Project

Create a new GCP project and **enable billing**.

---

### Step 2: Create the Always-Free VM

This step must be done **carefully**, or you will silently lose free-tier eligibility.

### Required VM Configuration


```text
|  Setting   |               Value              |
|------------|----------------------------------|
|Machine Type|e2-micro                          |
```


This VM is enough for Python-based automation.

---

### Step 3: Firewall Rules

### In GCP:

* Firewall rules are **network-level objects**
* They are evaluated dynamically
* Adding or removing rules does **not require VM recreation**

### Security Principle

A self-hosted runner:

* **Does not need inbound web traffic**
* **Does not receive jobs from GitHub**
* **Only makes outbound connections**

Therefore:

> *The firewall should allow* ***SSH only*** *and block everything else by default.*

### Minimal Firewall Policy

Your runner needs:

* **Inbound:** SSH (port 22) from *you*
* **Outbound:** unrestricted (default)

No HTTP, HTTPS, or custom ports are required.

Below is a **precise, step-by-step guide to setting up firewall rules for a GCP VM used as a self-hosted GitHub Actions runner**, with explanations tailored to your `awesome-topics` **automation pipeline**.

This focuses on **minimum required access** and **free-tier safety**.

### Step 3.1: Navigate to Firewall Rules

1. Open **GCP Console**
2. Go to  
   **VPC Network → Firewall**
3. Click **Create Firewall Rule**

---

### Step 3.2: Create SSH-Only Firewall Rule

#### Basic Settings


```text
|Field    |Value                  |
|---------|-----------------------|
```


---

#### Targets

Choose **one** of the following:

### ✅ Recommended (Tag-based)

* **Targets**: Specified target tags
* **Target tags**:`github-runner`

Then tag your VM with: `github-runner`

This prevents accidental exposure of other VMs.

#### ❌ Avoid

* “All instances in the network”

---

#### Source Filters


```text
|Field           |Value             |
|----------------|------------------|
|Source type     |IPv4 ranges       |
|Source IP ranges|Your public IP /32|
```


Example:


```text
203.0.113.45/32
```


👉 Find your IP via `https://ifconfig.me`

#### Protocols and Ports

* Check **Specified protocols and ports**
* Enable:`tcp:22`

### Step 3.3: Save the Rule

Click **Create**.

---

### Step 4: Tag the VM

1. Go to **Compute Engine → VM instances**
2. Click your VM
3. Click **Edit**
4. Under **Network tags**, add:`github-runner`
5. Save

### Verifying Firewall Correctness

#### From Your Local Machine


```text
ssh github@<VM_EXTERNAL_IP>
```


#### From Any Other IP

* SSH should **fail**
* No services should respond

### Why This Is Safe for awesome-topics

* GitHub cannot connect inbound
* Forks cannot access the VM
* Runner polls GitHub securely
* Attack surface is minimal

### Common Mistakes to Avoid

* Opening SSH to `0.0.0.0/0`
* Using default “allow all” rules
* Running runner as root
* Allowing PR workflows

### “Why do I need my public IP?”

A firewall rule must specify **who is allowed to SSH**.

If you write:


```text
0.0.0.0/0
```


You are saying:

> *“Anyone on the internet may attempt to log in.”*

Restricting SSH to:


```text
YOUR_PUBLIC_IP/32
```


reduces the attack surface to effectively zero.

---

### IPv6 Confusion (Common Pitfall)

If you use IPv6 and see:

> Invalid IPv6 address or range. Enter the lowest IPv6 address in the subnet.

This means your CIDR prefix is invalid.

**Rule:**  
For a single IPv6 address, always use `/128`.

Example:


```text
2401:db00:abcd:1234:5678:9abc:def0:1111/128
```


This is correct, unambiguous, and secure.

---

### Step 5: SSH into the VM and Prepare the System


```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl python3 python3-pip ca-certificates
```


---

### Step 6: Install the GitHub Actions Runner

These instructions are available from GitHub itself. Follow the instructions below


```text
Actions >> Runners >> Self-hosted runner >> New runner >> 
New self-hosted runner >> Choose Runner image and architecture
```


Or, run these commands below


```text
mkdir actions-runner && cd actions-runner

curl -o actions-runner-linux-x64-2.330.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.330.0/actions-runner-linux-x64-2.330.0.tar.gz

tar xzf actions-runner.tar.gz
```


---

### Step 7: Configure the Runner

Run (follow instructions from GitHub):


```text
./config.sh \
  --url https://github.com/sadimanna/awesome-topics \
  --token <TOKEN>
```


You can skip the next prompts to choose the default values. The SSH window will show the labels assigned to the self-hosted runner, and ***self-hosted*** will be one of them.

---

### Step 8: Run the Runner as a Service


```bash
sudo ./svc.sh install
sudo ./svc.sh start
```


### “If I close the SSH window, will the runner stop?”

**No.**

Because:

* The runner is now a **systemd service**
* It survives SSH logout
* It survives network drops
* It restarts on reboot

Verify with:


```bash
sudo ./svc.sh status
```


---

### Step 9: The Workflow (and Why It Looks This Way)

Here is the complete workflow used by `awesome-topics`.


```text
name: auto

on:
  push:
    branches: ['main']
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'
    
permissions:
  contents: write
  issues: write

concurrency:
  group: awesome-topics-runner
  cancel-in-progress: false

jobs:
  update:
    runs-on: self-hosted
    env:
      TZ: "Asia/Kolkata"
      RUN_ENV: "prod" # within ['prod', 'dev']
      GH_USER: ${{ github.repository_owner }}
      PYTHONDONTWRITEBYTECODE: 1

    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          ref: ${{ github.head_ref }}
          fetch-depth: 0

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

      - name: Create an issue for new papers
        if: ${{ steps.vars.outputs.raw != '' }}
        uses: JasonEtco/create-an-issue@v2
        env:
          MSG: ${{ steps.vars.outputs.raw }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          filename: .github/issue-template.md

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

      - name: Cleanup
        run: |
          rm -rf $GITHUB_WORKSPACE/*
```


---

### Why is cleanup required?

Deleting the GitHub workspace (`rm -rf $GITHUB_WORKSPACE/*`) is required on self-hosted runners because the workspace **persists across runs**. Without cleanup, leftover files from previous jobs can affect diffs, cause incorrect commits, introduce non-deterministic behaviour, and eventually exhaust disk space. Removing the workspace ensures **each run starts from a clean checkout**, matching the behaviour of GitHub-hosted (ephemeral) runners and keeping the automation reliable.

---

### Final Security Model

* Forks cannot trigger the workflow
* PRs are ignored
* GitHub never SSHs into your VM
* SSH is restricted to you
* Runner polls GitHub outbound only

This is **safe by design**.

---

### What This Article Does Not Solve (Yet)

* Dependency isolation
* Environment drift
* Partial Docker execution
* Hybrid runners

These are addressed in **Part 5** and **Part 6**.

---

### What’s Next

* **Part 5:** Docker-isolated execution on the same runner
* **Part 6:** Hybrid pipelines (self-hosted → GitHub-hosted)

---
*Originally published on [Medium](https://medium.com/@mannasiladittya/awesome-topics-fully-automated-research-paper-curation-on-github-pages-part-4-709ea8b515d3).*
