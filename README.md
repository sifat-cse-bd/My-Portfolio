# My Route Portfolio

## Central portfolio data

The admin page writes projects, education and profile assets to Supabase through the Vercel function at `api/portfolio.js`. Browser `localStorage` is retained only as an offline fallback.

### One-time deployment setup

1. Create a Supabase project and run [`supabase-schema.sql`](supabase-schema.sql) in its SQL editor.
2. Add these Vercel environment variables for Production (and Preview if needed):
	- `SUPABASE_URL`: the Supabase project URL.
	- `SUPABASE_SERVICE_ROLE_KEY`: the Supabase service-role key. Keep this server-only; never prefix it with `VITE_`.
	- `ADMIN_ACCESS_CODE`: the private admin password used by the API.
3. Redeploy the project.
4. Open `/admin`, sign in, and click **Publish browser data** once. This migrates the current browser's projects, education and assets to the central database.

After that, changes made in `/admin` are visible to every visitor and browser. Do not put `SUPABASE_SERVICE_ROLE_KEY` in frontend environment variables.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
