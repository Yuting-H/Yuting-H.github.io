<div align="center">

# My Personal Portfolio

React + Vite portfolio with a few of my coding projects.

[yuting-h.github.io](https://yuting-h.github.io/)

</div>

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

`npm run build` also writes `dist/404.html` so client-side routes such as
`/calculator` work on hard refresh when hosted on GitHub Pages.

## Projects

| Route             | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `/`               | Landing page                                             |
| `/calculator`     | Calculator                                               |
| `/etch`           | Etch & Sketch                                            |
| `/sort-visualizer`| Sorting algorithm visualizer                             |
| `/restaurant`     | Mock restaurant page (kept from the old Webpack project) |

Old URLs (`/etch/index.html`, `/calculator/index.html`,
`/sort-visualizer/sort.html`) redirect to the new routes.

## Deployment

Pushes to `main` are built and deployed to GitHub Pages by
`.github/workflows/static.yml`.
