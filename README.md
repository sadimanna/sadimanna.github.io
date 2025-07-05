# 🚀 Deploying a Next.js Static Site to GitHub Pages

## 1. Prerequisites

Node.js and npm installed

A Next.js project (create one with `npx create-next-app my-app`)

A GitHub repository for your project

## 2. Prepare Your Next.js App for Static Export

### a. Ensure Your Pages Are Static

Only use `getStaticProps` and `getStaticPaths` or no data fetching at all.

Do NOT use `getServerSideProps` or API routes—they are not supported for static export.

### b. Configure `next.config.js`

Add or update your `next.config.js` to enable static export and set up the path for GitHub Pages:

/ @type {import('next').NextConfig} */
const repoName = 'your-repo-name'; // Replace with your repo name

const nextConfig = {
  output: 'export',
  // If your site will be served from a subpath (not root domain):
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
};

module.exports = nextConfig;
Copy
js
If deploying to https://<username>.github.io/<repo-name>/, you must set `basePath` and `assetPrefix`.
If deploying to a root user/organization site (https://<username>.github.io/), omit `basePath` and `assetPrefix`.

## 3. Update `package.json` Scripts

Add scripts for exporting and deploying:

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "export": "next export",
  "predeploy": "npm run build && npm run export",
  "deploy": "gh-pages -d out"
}
Copy
json

## 4. Install `gh-pages`

npm install --save-dev gh-pages

yarn add --dev gh-pages

## 5. Build and Export Your Static Site

npm run build

npm run export

This will output your static site in the `out` directory.

## 6. Set Up Your GitHub Repository

Create a repository on GitHub (e.g., `your-repo-name`).

Initialize git in your project if you haven't:
    git init
    git remote add origin <a href="https://github.com/<your-username>/<your-repo-name>.git" class="underline" target="_blank">https://github.com/<your-username>/<your-repo-name>.git</a>
    git add .
    git commit -m "Initial commit"
    git push -u origin main
    
## 7. Deploy to GitHub Pages

npm run deploy

This will publish the contents of `out` to the `gh-pages` branch.

## 8. Configure GitHub Pages

Go to your repository on GitHub.

Navigate to Settings > Pages.

Under Source, select the `gh-pages` branch and root (`/`).

Save.

## 9. (Optional) Set `homepage` in `package.json`

This isn't required for Next.js, but may help with asset resolution:

"homepage": "<a href="https://<your-username>.github.io/<your-repo-name>/"" class="underline" target="_blank">https://<your-username>.github.io/<your-repo-name>/"</a>

## 10. Access Your Site

After a few moments, visit:

https://<your-username>.github.io/<your-repo-name>/

## 11. (Advanced) Handle Client-Side Routing

GitHub Pages serves only static files. For client-side routes (e.g., `/about`), ensure you have an `out/about/index.html`.

If you get 404s on client-side routes, you can:

Use [next export]https://nextjs.org/docs/pages/building-your-application/deploying/static-exports (it generates all static pages).

If you need a fallback, copy `out/index.html` to `out/404.html` after export:
    cp out/index.html out/404.html
    
This helps GitHub Pages route unknown paths back to your app’s entry point. 

## 12. (Optional) Custom Domain 
- Add a `CNAME` file to `out/` with your custom domain before deploying.
- Or, configure custom domain in GitHub Pages settings.

## 13. (Troubleshooting & Tips) 
- White page or broken CSS?
- Double-check `basePath` and `assetPrefix` in `next.config.js`.
- Ensure all links use Next.js `<Link>` or are prefixed with `basePath`.
- Images not showing?
- Use the correct path prefix.
- 404 on refresh?
- Ensure all pages are statically exported.
- Use the `404.html` trick above.

## References 
- [Next.js Static Export Docs]https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
- [gh-pages npm package]https://www.npmjs.com/package/gh-pages
- [GitHub Pages Documentation]https://docs.github.com/en/pages

## Summary Workflow 

1. Configure `next.config.js` for static export and subpath (if needed)
2. Add scripts to `package.json`
3. Install `gh-pages`
4. Build and export: `npm run build && npm run export`
5. Deploy: `npm run deploy`
6. Set Pages source to `gh-pages` branch in GitHub
7. Visit your site!

If you need a minimal example repo or have a specific structure, let me know!
