# shady-meadows-playwright-ts

Playwright test automation for the Automation in Testing "Shady Meadows" UI, written in TypeScript.

## Overview

This repository contains browser-level checks for the public front page and room booking flow, plus a setup step for authenticated test state. The suite is organized around page objects and shared helpers so the test surface can grow without duplicating selector logic.

## Current Coverage

- Front page smoke checks
- Booking section assertions
- Room listing assertions
- Room detail assertions
- Auth setup for saved storage state
- Shared test hooks for consistent test logging
- GitHub Actions workflow for push and pull request runs

## Project Structure

- `pages/` - page objects and shared page helpers
  - `base.page.ts` - common page-object utilities
  - `front.page.ts` - front page interactions and assertions
  - `booking-section.page.ts` - booking form actions
  - `rooms-section.page.ts` - room listing assertions
  - `room.page.ts` - room detail page assertions
  - `index.ts` - page-object barrel exports
- `tests/` - Playwright specs
  - `auth.setup.ts` - authentication setup and storage state generation
  - `front-page/` - front page and rooms-section specs
  - `room-page/` - room detail specs
- `utils/` - shared test utilities
  - `testHooks.ts` - custom Playwright test wrapper with logging
- `playwright/` - generated Playwright artifacts, including auth state

## Environment

The suite reads its runtime values from environment variables.

- `BASE_URL` - repository variable in GitHub Actions, local `.env` for development
- `TEST_USERNAME` - repository secret in GitHub Actions, local `.env` for development
- `TEST_PASSWORD` - repository secret in GitHub Actions, local `.env` for development

The `auth.setup.ts` setup test uses these values to create the saved storage state used by the rest of the suite.

## CI

GitHub Actions runs the Playwright workflow from `.github/workflows/playwright.yml`.

- triggers on `push`
- triggers on `pull_request`
- can be run manually from the Actions tab

The workflow installs dependencies, installs Playwright browsers, runs the suite, and uploads the HTML report as an artifact.

## Notes

The suite is still growing. Additional tests, page objects, and supporting helpers will be added as the room booking coverage expands.
