# SauceDemo Playwright Automation

TypeScript and Playwright Test coverage for the SauceDemo QA Automation Engineer technical assignment.

## Prerequisites

- Node.js 18 or newer
- npm

## Installation

```bash
npm ci
npx playwright install --with-deps chromium
```

## Execution

```bash
npm test
npm run test:headed
npm run report
```

The test run produces an HTML report in `playwright-report/`. Playwright captures screenshots on failure and retains traces on test failure. Generated evidence is stored locally and excluded from the submitted repository.

## Project Structure

```text
playwright.config.ts       Runner, base URL, browser and evidence settings
pages/                     Page-object abstractions
tests/                     Automated scenarios A1-A6
TEST_PLAN.md               Scenario-to-risk mapping
BUG_REPORT.md              A7 exploratory check
```

## Design Choices

- Accessible role, label and stable data test id locators are preferred.
- Playwright Test provides an isolated browser context for each test. The session-independence scenario also creates separate contexts explicitly to verify isolation.
- Numeric prices and checkout totals are parsed before comparison.
- Playwright web-first assertions provide synchronization; no fixed sleeps are used.
- Page objects keep navigation and UI mechanics separate from scenario intent.

## Assumptions and Limitations

The suite targets the public SauceDemo environment and Chromium. Its test data uses the credentials supplied in the assignment. A7 is documented as a focused exploratory check rather than a fully automated persona regression suite. The remote application can be unavailable or change independently of this repository.