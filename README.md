# joshrosenkranz.info

Personal portfolio and résumé for Josh Rosenkranz — Apple technologist,
experience systems designer, technical problem solver, educator, and builder.

The portfolio collects current product, AI, spatial-computing, interaction,
and creative-system work alongside a long Apple Retail career. It is designed
to show how Josh approaches ambiguous problems, learns new systems, tests ideas,
and turns observations into working experiences.

- **Domain:** joshrosenkranz.info (registered via GoDaddy)
- **Planned hosting:** Vercel (DNS to be pointed from GoDaddy once deployed)

## Structure

- `/resume` — one-page résumé (HTML source + rendered PDF)
- Portfolio site — to be built at the repo root

## Résumé

`resume/Josh_Rosenkranz_Resume.html` is the source of truth. Re-render the PDF with:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="resume/Josh_Rosenkranz_Resume.pdf" \
  "file://$(pwd)/resume/Josh_Rosenkranz_Resume.html"
```
