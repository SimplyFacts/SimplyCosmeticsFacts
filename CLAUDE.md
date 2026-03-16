# SimplyCosmeticsFacts

A React Native/Expo app for scanning cosmetic/beauty products and alerting users to
ingredients they want to avoid, powered by Open Beauty Facts data.

## Project Structure

This repo contains TWO `apps/mobile` directories — do not confuse them:

- `anything/apps/mobile/` — ✅ THIS IS SimplyCosmeticsFacts (the active codebase)
- `apps/mobile/` — ⚠️ orphaned SimplyFoodFacts scaffold from the original fork; ignore

Always work in `anything/apps/mobile/` unless explicitly told otherwise.

## Tech Stack

- React Native / Expo (Expo Router)
- Zustand (state management)
- React Query / TanStack Query v5 (data fetching)
- lucide-react-native (icons)
- Hono (backend, hosted on Anything platform)
- Neon (Postgres database)

## TanStack Query v5 Note

Use `isPending && !isError` instead of `isLoading` for loading states. In v5,
`isLoading` stays true during retries and can block empty/error states from rendering.

## Backend

- URL: `simply-cosmetics-facts-590.created.app`
- Project group ID: `04b4fcd7-31e9-46f0-b0e3-9b95ddcf898b`
- Database tables: `ingredient_alerts`, `scan_history` (both include `device_id` column)

## Device Isolation

This app shares devices with SimplyFoodFacts. To prevent ID collisions, AsyncStorage
uses a distinct key: `"simplycosmeticsfacts_device_id"`.

The four files that enforce device isolation:

**Mobile:**
1. `src/utils/deviceId.js`
2. `src/store/alertsStore.js`
3. `src/hooks/useScanHistory.js`
4. `src/utils/settingsActions.js`

**Backend:** four corresponding API route files

## Ingredient Alert Toggles

The four cosmetics-specific settings tracked in `alertMatching.js`:

- `showSyntheticFragrances`
- `showParabens`
- `showPFAS`
- `showSulfates`

⚠️ These toggles are not yet wired up to the ingredient matching logic on the backend.

## Apple Developer

- Team: David Carlton Grizzle (5MG8AK45K9)
- Expo account: carlton.grizzle
- GitHub org: SimplyFacts
