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

## Notes

The suite is still growing. Additional tests, page objects, and supporting helpers will be added as the room booking coverage expands.
