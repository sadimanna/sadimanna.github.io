# sadimanna.github.io

A static Next.js site configured for GitHub Pages deployment.

## Prerequisites

- Node.js and npm installed
- A GitHub repository for this project

## Create the Project

If you are starting from scratch, create the app with:

```bash
npx create-next-app my-app
```

Then move into the project directory and install the deployment dependency if it is not already present:

```bash
npm install --save-dev gh-pages
```

## Static Export Setup

This project is configured for static export so it can be deployed to GitHub Pages.

### 1. Keep Pages Static

Only use static rendering patterns. Avoid `getServerSideProps` and API routes.

Use one of the following approaches:

- no data fetching at all
- `getStaticProps` and `getStaticPaths` for pages that need build-time data

### 2. Next.js Configuration

The project uses static export in [next.config.mjs](next.config.mjs).

For a repository hosted at `https://<username>.github.io/<repo-name>/`, set `basePath` and `assetPrefix` to the repository name.

For a root user or organization site such as `https://<username>.github.io/`, omit both values.

Example:

```js
/** @type {import('next').NextConfig} */
const repoName = 'your-repo-name'

const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
}

module.exports = nextConfig
```

This repository already uses:

- `output: 'export'`
- `trailingSlash: true`
- `images.unoptimized: true`

If your repo name differs from the current setup, update the config accordingly.

### 3. Package Scripts

The current scripts in [package.json](package.json) are:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "clean": "rm -rf .next out",
    "start": "next start",
    "lint": "next lint",
    "predeploy": "npm run clean && npm run build",
    "deploy": "touch ./out/.nojekyll && gh-pages -d out"
  }
}
```

`predeploy` runs the build, and `deploy` publishes the generated `out` directory to the `gh-pages` branch.

## Local Development

Start the development server with:

```bash
npm run dev
```

Open the local URL printed by Next.js in your browser.

## Build and Export

Generate the static site with:

```bash
npm run predeploy
```

This creates the export in the `out` directory.

## GitHub Repository Setup

1. Create a repository on GitHub.
2. Initialize git in the project if needed.
3. Add your remote and push the initial commit.

Example:

```bash
git init
git remote add origin https://github.com/<username>/<repo-name>.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Deploy to GitHub Pages

Deploy the exported site with:

```bash
npm run deploy
```

This publishes the contents of `out` to the `gh-pages` branch.

Then go to your repository settings on GitHub and configure Pages:

- Source: `gh-pages` branch
- Folder: `/ (root)`

## Optional `homepage`

You do not need `homepage` for Next.js, but you can add it to `package.json` if you want to document the public URL:

```json
{
  "homepage": "https://<username>.github.io/<repo-name>/"
}
```

## Client-Side Routing

GitHub Pages serves only static files. If a route like `/about` must be available, it needs a generated file such as `out/about/index.html`.

If you see 404s on refresh or direct navigation, make sure:

- every page is statically exported
- the app is built with `output: 'export'`
- links respect the configured `basePath` when applicable

A common fallback is copying `out/index.html` to `out/404.html` after export:

```bash
cp out/index.html out/404.html
```

## Custom Domain

If you use a custom domain, add a `CNAME` file to `out/` before deployment or configure the domain in GitHub Pages settings.

## Troubleshooting

- White page or broken CSS: verify `basePath` and `assetPrefix`.
- Images not showing: confirm the correct path prefix and that images are exported statically.
- 404 after refresh: ensure the page exists in `out/` and the app is fully static.
- Intermittent deploy failure on `/_not-found` (for example, `TypeError: e[o] is not a function`): run a clean build by deleting `.next` and `out` before export. This is handled by the `clean` script in `predeploy`.
- Build or lint issues: check the Next.js config and package scripts.
