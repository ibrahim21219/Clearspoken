# Clearspoken — concept website

A one-page responsive site for Clearspoken, a fictional executive voice and accent coaching brand. Plain HTML, CSS and JavaScript: no framework and no build step.

## Files

```
index.html      the page (12 sections)
css/site.css    styles, design tokens, breakpoints, scroll reveals
js/site.js      reveals, menu, anchor scrolling, Q&A accordion, "Read more"
img/            19 photos (JPEG)
```

Open `index.html` in a browser to view it. To host it, serve the folder as static files with `index.html` at the root.

## Before this goes public

The brand, client names, quotes, logos and figures are placeholders. The page says so in a notice bar at the top and in "Sample" labels on the client strip and testimonials. Keep those until real content replaces the placeholders; they are marked with comments in `index.html`.

Also still placeholders:

- The booking button is a `mailto:` link to `hello@clearspoken.example`. Point it at a real inbox or booking page.
- The method "video" is a still image with a play disc. Swap it for a `<video>` when there is a film.
- Legal and social items in the footer and social strip are plain text, not links.

## Notes

- Fonts (Italiana and Inter) load from Google Fonts.
- Breakpoints are 768 px and 1280 px. Display type scales fluidly between the mobile and desktop sizes.
- Animations use only opacity and transform, and fall back to a short fade when the visitor's system asks for reduced motion.
- Photos are from Unsplash under the free Unsplash licence.
