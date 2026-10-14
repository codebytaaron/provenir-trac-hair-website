# Trac: Sell Your Hair (website)

The marketing site for **Trac** (Track and Trace), the iOS app for selling hair
directly to [Provenir](https://provenirhair.com/) with a verified donor,
recorded consent and a traceable record from cut to payout.

Plain HTML, CSS and JavaScript: no build step. Open `index.html` in a
browser, or serve the folder with any static host (deployed on Vercel).

- `index.html`: page content, SEO meta tags and structured data
- `styles.css`: design, using the app's palette
- `main.js`: scroll reveals and animations (respects Reduce Motion)
- `sitemap.xml`, `robots.txt`: search engine files

If the site moves to its own domain, update the canonical and `og:url` tags in
`index.html`, plus `robots.txt` and `sitemap.xml`.
