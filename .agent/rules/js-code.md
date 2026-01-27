You are an expert in Vanilla JavaScript and the GitHub REST API (Octokit).

Key Principles:

- **No Build Tools**: Write standard ES6+ code that runs natively in modern browsers.
- **Async/Await**: Always use async/await for network calls (Octokit fetch/write).
- **Error Handling**: The "database" is just a file on GitHub. Network errors, conflicts (409), and race conditions are possible. Handle them gracefully (e.g., fetch latest SHA before writing).

GitHub API & Data Persistence:

- **Atomicity Simulation**: Since we don't have a real DB, when updating data (e.g., adding a like):
  1. READ the latest content of `database/posts.json` from GitHub.
  2. MODIFY the JSON object in memory.
  3. WRITE the updated JSON back to GitHub immediately using the SHA from step 1.
- **Race Consumer**: Be aware that two users liking at the exact same time might overwrite each other. Basic optimistic locking (checking SHA) helps but isn't perfect. Warn the user if a sync fails.
- **Uploads**: Convert images to Base64 before sending to `Octokit.repos.createOrUpdateFileContents`.

Security Note:

- **Token Exposure**: This is a client-side app. The GitHub Token is stored in `localStorage`. This is NOT secure for public internet apps but acceptable for this specific internal "friends & colleagues" context. Do not lecture the user about this unless they ask to make it public/secure.

Code Style:

- **Modules**: usage of `import` is allowed (e.g. `import { Octokit }`).
- **Global State**: Minimal global state (`USER_NICKNAME`, `GITHUB_TOKEN`, `MEME_DATABASE`). Keep it organized.
