# Digress

Personal notebook at [digress.blog](https://digress.blog).

## Structure

- `index.html` — home (ASCII cosmos + post index)
- `posts/*.html` — article pages
- `CNAME` — custom domain for static hosting / GitHub Pages

## Adding a post

1. Create `posts/your-slug.html` using an existing post as the template (nav, theme toggle, Spectral/Archivo/Mono typography).
2. Add an entry to the `<main class="index">` list in `index.html`:
   - `data-d` one of: `phil` | `ml` | `quant` | `game` | `build`
   - `href` pointing at the post file
   - number, tag, date, title, one-line description, status
3. Deploy (Porkbun Static Hosting GitHub sync, or upload the site root).

Draft HTML sources can live alongside while you extract; published reading pages belong under `posts/`.
