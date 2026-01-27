# Technology Stack

## Core

- **HTML5**: Semantic structure, heavily styled to resemble Windows 98 windows.
- **CSS3 (Vanilla)**: All styling is custom. No frameworks like Tailwind or Bootstrap (unless explicitly requested, but currently using pure CSS).
  - Uses specific Windows 98 color palettes (Teal background `#008080`, Gray windows `#c0c0c0`).
  - CSS Variables for theme colors.
- **JavaScript (Vanilla ES6+)**:
  - Modules are used (e.g., `import { Octokit }`).
  - No build step (currently runs directly in browser).
  - MD5 hashing for password/integrity checks.

## Libraries & Dependencies

- **Octokit**: `https://esm.sh/octokit`. Used for all interactions with the GitHub API.
  - `rest.repos.getContent`: To read DB and files.
  - `rest.repos.createOrUpdateFileContents`: To write DB updates and upload images.
- **Blueimp MD5**: For client-side hashing.

## Data Structure

- **`database/users.json`**:
  ```json
  {
    "Nickname": {
      "joinedDate": "ISOString",
      "lastLogin": "ISOString"
    }
  }
  ```
- **`database/posts.json`**:
  ```json
  [
    {
      "id": 123456789,
      "name": "filename.jpg",
      "fileName": "timestamp_filename.jpg",
      "url": "https://raw.githubusercontent.com/...",
      "uploadedBy": "UserNick",
      "uploadDate": "ISOString",
      "likedBy": ["User1", "User2"],
      "comments": [{ "user": "User1", "text": "LOL", "date": "10:00" }]
    }
  ]
  ```

## Environment

- **Browser**: Chrome/Firefox/Safari (modern browsers supporting ES modules).
- **Local Development**: Simple HTTP server (e.g., Live Server) required to handle ES modules.
- **Deployment**: GitHub Pages (likely target).
