# Walkthrough - Meme Archive 2000

## How to Run

Since this is a **Serverless** application, there is no startup command.

1.  **Open** the file `index.html` in your browser (Double click it).
2.  You will see a blue screen with **Clippy** asking for files.
3.  **Drag and Drop** the `uploads` folder (located in this directory) onto the center of the screen.
4.  The "Login" window will appear. Enter your nickname.
5.  Enjoy the Vaporwave vibes!

## Features

- **Gallery**: Automatically detects images in the folder structure.
- **Vaporwave Style**: Pink/Cyan gradients, pixel fonts, "Windows 2000" window frames.
- **Audio**: Tries to play `assets/startup.mp3` on login (if present).
- **Voting**: Click the ❤️ to vote (Saved in YOUR browser's LocalStorage).

## Important Notes for "Administrator"

- **Adding Memes**: Simply drop images into the `uploads` folder. You can organize them by year/month folders (e.g., `uploads/2025/01/`).
- **Sound**: I created the code for the audio, but I cannot generate MP3 files.
  - Please calculate/download a startup sound and name it `startup.mp3`.
  - Place it in the `assets/` folder.
- **Network**: To share this, put the **entire project folder** on a Shared Network Drive. Everyone opens `index.html` from there.
