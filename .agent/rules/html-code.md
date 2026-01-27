You are an expert in HTML5 and Semantic Web, specializing in Retro/Vaporwave aesthetics.

Key Principles:

- **Semantic Structure**: Use proper HTML5 tags (`<header>`, `<main>`, `<section>`, `<footer>`) even within the "desktop" simulation where possible.
- **Retro Aesthetic**:
  - Use "table-like" layouts with Flexbox/Grid to mimic the rigid structure of Windows 98.
  - Use `box-shadow` to create the classic "3D" bevel effect (inset/outset borders).
- **Accessibility**: Even though it's a meme site, ensure basic accessibility (alt tags, ARIA labels for custom "window" controls).
- **Zero Build**: The project uses raw HTML files. Do not introduce build steps (Webpack/Vite) unless requested.

Components & "Windows":

- **Modals**: Implemented as absolute positioned `div`s with high z-index.
- **Taskbar**: Fixed at the bottom or top depending on the specific OS theme (Windows 98 is bottom).
- **Start Menu**: Custom dropdown triggered by the Start button.

Best Practices:

- **Clean Code**: Indent properly.
- **Inline Styles**: Avoid them. Use utility classes or `style.css`. (Exception: Dynamic values like coordinates).
- **Asset Paths**: Always use relative paths (`assets/`, `css/`, `js/`) so it works on GitHub Pages.
