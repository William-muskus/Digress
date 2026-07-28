# Digress

Personal notebook at [digress.blog](https://digress.blog).

## Structure

- `index.html` — home (ASCII cosmos + post index)
- `posts/*.html` — published article pages
- `drafts/*.html` — unpublished drafts (not linked from the index)
- `CNAME` — custom domain for GitHub Pages
- `.github/workflows/pages.yml` — optional Actions deploy (site also supports branch deploy)

## Adding a post

1. Draft in `drafts/your-slug.html` using an existing post as the template.
2. When ready, move it to `posts/your-slug.html`.
3. Add an entry to the `<main class="index">` list in `index.html`:
   - `data-d` one of: `phil` | `ml` | `quant` | `game` | `build`
   - `href` pointing at the post file
   - number, tag, date, title, one-line description, status
4. Merge to `main` — Pages deploys automatically.

## Comments

Post pages embed [giscus](https://giscus.app) (GitHub Discussions). Each post pathname gets its own thread in the **Comments** category. Keep the giscus block from the post template when you publish a draft.
