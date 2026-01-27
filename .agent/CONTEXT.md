# Sarcastick - Project Context

## Overview

"Sarcastick" (aka MEME ARCHIVE 2000) is a static Single Page Application (SPA) designed as a vaporwave/Windows 98 themed meme repository for colleagues. It is a fun, internal social platform where users can upload memes, like content, and comment.

## Aesthetic & Theme

- **Theme**: Windows 98 / Vaporwave / Retro '90s Web.
- **Visuals**: CRT monitors, scanlines, neon colors (Cyan #00ffff, Magenta #ff00ff), pixelated icons, and classic Windows 95/98 UI elements (gray backgrounds, bevel borders).
- **Atmosphere**: Nostalgic, ironic, and playful.

## Architecture (The "Serverless" GitHub Trick)

This project uses a unique "serverless" architecture where the GitHub repository itself acts as the database and file storage.

- **No Backend**: There is no traditional backend server (Node, Python, PHP, etc.).
- **Database**: JSON files hosted in the repository (`database/users.json`, `database/posts.json`) serve as the database.
- **File Storage**: Images are uploaded directly to the `uploads/` directory in the repository.
- **API**: The application uses the GitHub REST API (via `Octokit`) to read and write these files directly from the client's browser.
- **Authentication**: Users authenticate using a GitHub Personal Access Token (or a shared secret/password logic for simple access, though write operations require a token).

## Key Features

1.  **Boot & Login**: Simulates a BIOS boot sequence and a Windows network login.
2.  **Desktop Interface**: A simulated desktop with a taskbar, start menu (button), and windowed interface for navigation.
3.  **Gallery**: Infinite scroll (or grid) of memes with like counters.
4.  **Upload**: Allows users to upload images. The app converts them to Base64 and commits them to the repo.
5.  **Social Interactions**: Likes and comments are stored by updating the `database/posts.json` file via the GitHub API.
6.  **Hall of Fame**: Displays top-rated memes.

## Data Flow

1.  **Read**: The app fetches `database/posts.json` and `database/users.json` (raw content) to display data.
2.  **Write**: When a user performs an action (upload, like, comment), the app:
    - Fetches the latest file SHA from GitHub.
    - Updates the JSON content locally.
    - Commits the updated file back to GitHub using `Octokit.repos.createOrUpdateFileContents`.

## Target Audience

Colleagues and friends. The project is "internal" and meant for humor.
