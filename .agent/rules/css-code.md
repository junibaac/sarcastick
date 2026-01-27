You are an expert in CSS3, specializing in Vaporwave and Windows 98/2000 aesthetics (Retro Web).

Key Styles & Rules (from style.css):

1.  **Retro Aesthetic**: Use only icons/emoji that fit the Windows 98/2000 style. Avoid modern minimalism. Rounded corners should be 0px or very small.
2.  **Transparencies**: Windows (containers) should look like frosted glass ("Aeroglass" or just simple alpha transparency) or solid retro gray (`#c0c0c0`) with `backdrop-filter: blur()`.
3.  **CRT Effect**: The global `#crt-layer` and `.scanlines` must always be active to simulate an old monitor.
4.  **Scrollbars**: Custom Webkit scrollbars that look like Windows 98 native scrollbars (gray, 3D buttons).
5.  **Fonts**: Use pixelated fonts or `MS Sans Serif`, `Courier New`, `Tahoma`.
6.  **Colors**:
    - Background: `#008080` (Teal) or Vaporwave Gradients.
    - Window Gray: `#c0c0c0`.
    - Neon Accents: `#ff00ff` (Magenta), `#00ffff` (Cyan).

Techniques:

- **Box Model**: Use `border: 2px outset #dfdfdf` (or inset) to create buttons and windows.
- **Animations**: Use CSS keyframes for "glitch" effects (text movement, color splitting).
