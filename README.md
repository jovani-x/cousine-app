# Cuisine App

Under construction...

## Data

All recipes come from [spoonacular food API](https://spoonacular.com/food-api) via a [proxy server](https://github.com/jovani-x/cuisine-app-proxy)

## Tech stack

- React + TypeScript
- React Router
- React Query + Axios
- IndexedDB + Dexie
- Material UI (MUI)
- Chart.js
- Vite

## Restrictions

### Only one user's device (for now)

The collection can't be shared with a few user's devices because it is stored in local IndexedDB.

### There are spoonacular API restrictions:

#### Cache lifetime

> You may cache user-requested data to improve performance (for a maximum of 1 hour). After 1 hour, you must delete your cache and refresh the data via the spoonacular API. If you stop using the spoonacular API or if your access to the API is suspended for any reason, then you must delete all data you ever obtained from the spoonacular API.

So, only recipe IDs are permanently stored in IndexedDB to track which recipes the user "has" in their collection. And data is refetched every hour.

#### Limited number of requests per day

[Quotas details](https://spoonacular.com/food-api/docs#Quotas).
