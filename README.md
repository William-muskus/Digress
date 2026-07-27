# Digress

Personal notebook at [digress.blog](https://digress.blog).

## Structure

- `index.html` — home (ASCII cosmos + post index)
- `posts/*.html` — article pages
- `CNAME` — custom domain for GitHub Pages
- `.github/workflows/pages.yml` — deploy to GitHub Pages on push to `main`

## Go live (one-time)

DNS for `digress.blog` already points at GitHub Pages. Finish setup in GitHub:

1. Make this repository **public** (free Pages requires a public repo).
2. Open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Merge the site to `main` (or run the **Deploy Digress to GitHub Pages** workflow).
5. Under **Custom domain**, confirm `digress.blog` and enable **Enforce HTTPS** once the certificate is ready.

## Adding a post

1. Create `posts/your-slug.html` using an existing post as the template (nav, theme toggle, Spectral/Archivo/Mono typography).
2. Add an entry to the `<main class="index">` list in `index.html`:
   - `data-d` one of: `phil` | `ml` | `quant` | `game` | `build`
   - `href` pointing at the post file
   - number, tag, date, title, one-line description, status
3. Merge to `main` — Pages deploys automatically.

Draft HTML sources can live alongside while you extract; published reading pages belong under `posts/`.
