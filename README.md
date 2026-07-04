# Playwright Automation Framework

## CI/CD with GitHub Actions

This project includes a GitHub Actions workflow at [.github/workflows/playwright.yml](.github/workflows/playwright.yml).

### What it does
- Runs on every push or pull request to the main/master branch
- Installs Node.js and Playwright dependencies
- Executes the smoke and regression suites
- Publishes the Playwright HTML report as a workflow artifact

### How to use it
1. Push this project to GitHub.
2. Open the repository on GitHub.
3. Go to Actions.
4. The workflow will start automatically.

### Local commands
```bash
npm ci
npx playwright install --with-deps chromium
npm run test:smoke
npm run test:regression
```
