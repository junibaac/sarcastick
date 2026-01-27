// NEW CONFIG
// We now use File System Access API for persistence

let DIR_HANDLE = null;
let METADATA = {}; // { filename: { comments: [], votes: 0, date: ... } }

// UPDATED DROP LOGIC
// 1. Get Directory Handle
// 2. Request R/W Permission (on first write or immediately)
// 3. Read/Create '\_metadata.json'

// DATA STRUCTURE (\_metadata.json)
/_
{
"meme1.jpg": {
"uploaded": "2025-01-20T10:00:00Z",
"votes": 5,
"comments": [
{ "user": "Luigi", "text": "Lol!", "date": "..." }
]
}
}
_/

// UI UPDATES
// - Click Image -> Open Modal
// - Modal: Large Image Left, Comments/Details Right (Facebook style)
