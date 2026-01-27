# Workflow: Implementing Personal Section

1. **Identify User Activity**: Use the `uploadedBy` field in `_metadata.json` to link memes to users.
2. **Create UI Section**: Add a hidden `view-profile` div in `index.html`.
3. **Filtering Logic**: In `app.js`, create a function `renderProfile()`:
   ```javascript
   function renderProfile() {
     const myMemes = MEME_DATABASE.filter(
       (m) => getMeta(m.name).uploadedBy === USER_NICKNAME,
     );
     renderGallery(myMemes, "profile-container");
   }
   ```
4. **Navigation**: Hook into `switchView()` to trigger `renderProfile()` when selected.
5. **Persistence**: Ensure `saveMetadata()` is called after every upload to keep the link persistent.
