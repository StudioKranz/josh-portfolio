# joshrosenkranz.info

Personal portfolio and résumé for Josh Rosenkranz — Apple technologist and
experience systems designer, applying for Apple's Incubation Design Prototyper
role.

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
