# Integration Tests

## Overview
This module gives you the ability to test the integrations in several environments. 

## Why?
We want the ability to test integrations before (and, in some cases, after) deployment takes place to a target environment

## What is available now?
You can run integration tests before and after deployment to `test`, `stage` and `production` environments


## How?
*Run tests before deployment to a target env*
- `npm run integration-local-test` or `npm run integration` Starts a server locally and runs tests against the `test` environment
- `npm run integration-local-stage` Starts a server locally and runs tests against the `stage` environment
- `npm run integration-local-prod` Starts a server locally and runs tests against the `prod` environment

*Run tests after deployment to a target env*
 - `npm run integration-test` Runs tests against the `test` environment
 - `npm run integration-stage` Runs tests against the `stage` environment
 - `npm run integration-prod` Runs tests against the `prod` environment

Note: `npm run integration` is a synonym command for `npm run intregration-local-test`. Engineers can run this command before creating a PR to ensure that their changes to do not break the `test` environment