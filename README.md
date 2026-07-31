# Digress

Personal notebook at [digress.blog](https://digress.blog).

## Structure

- `index.html` — home (ASCII cosmos + post index)
- `posts/*.html` — published article pages
- `drafts/*.html` — unpublished drafts (not linked from the index)
- `assets/post-nav.js` — shared post breadcrumb / return chrome
- `CNAME` — custom domain for GitHub Pages
- `.github/workflows/pages.yml` — optional Actions deploy (site also supports branch deploy)

## Adding a post

1. Draft in `drafts/your-slug.html` using an existing post as the template.
2. When ready, move it to `posts/your-slug.html`.
3. Include Digress chrome near `</body>` (works for Digress-styled posts and self-contained papers):

```html
<script src="../assets/post-nav.js" data-category="econ"></script>
```

   - `data-category` one of: `phil` | `ml` | `quant` | `game` | `build` | `econ`
   - optional `data-category-label` to override the breadcrumb label
   - optional `data-title` if the page has no usable `<h1>`
   - injects sticky breadcrumb: **Digress / Category / Title**, plus theme toggle
   - category links back to `index.html#category` and filters the index

4. Add an entry to the `<main class="index">` list in `index.html`:
   - `data-d` matching the post category key above
   - `href` pointing at the post file
   - number, tag, date, title, one-line description, status
5. Merge to `main` — Pages deploys automatically.

## Comments

Post pages embed [giscus](https://giscus.app) (GitHub Discussions). Each post pathname gets its own thread in the **Comments** category. Keep the giscus block from the post template when you publish a draft.
