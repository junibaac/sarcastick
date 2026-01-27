async function refreshDB() {
  try {
    let content;
    if (OCTOKIT) {
        const res = await OCTOKIT.rest.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: 'database/posts.json'
        });
        content = atob(res.data.content);
    } else {
        const res = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/database/posts.json?t=${Date.now()}`);
        content = await res.text();
    }
    
    MEME_DATABASE = JSON.parse(content);
    renderGallery(MEME_DATABASE);
    
    // Hide Nyan Loader
    const status = document.getElementById("gallery-status");
    if(status) status.style.display = "none";
    
  } catch (e) {
    console.error("Errore fetch DB:", e);
    if (e.status === 404 || e.message.includes('Unexpected token')) {
        console.log("DB non trovato o vuoto, inizializzo...");
        MEME_DATABASE = [];
    }
  }
}

async function syncDB() {
  if (!OCTOKIT) return;
  try {
    // 1. Get SHA of existing file
    const getRes = await OCTOKIT.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: "database/posts.json",
    });

    const sha = getRes.data.sha;

    // 2. Update file
    await OCTOKIT.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: "database/posts.json",
      message: `Update Grid State (by ${USER_NICKNAME})`,
      content: btoa(JSON.stringify(MEME_DATABASE, null, 2)),
      sha: sha,
    });

    console.log("Grid Synced ✅");
  } catch (e) {
    console.error("Sync Error:", e);
  }
}

async function syncUsers() {
  if (!OCTOKIT) return;
  try {
    const getRes = await OCTOKIT.rest.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: "database/users.json",
    });
    const sha = getRes.data.sha;
    await OCTOKIT.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: "database/users.json",
      message: `User Auth: ${USER_NICKNAME}`,
      content: btoa(JSON.stringify(USER_LIST, null, 2)),
      sha: sha,
    });
  } catch (e) {
    console.error("User Sync Error:", e);
  }
}

async function loadUsers() {
  try {
    let content;
    if (OCTOKIT) {
        const res = await OCTOKIT.rest.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: "database/users.json",
        });
        content = atob(res.data.content);
    } else {
        // Fallback to public raw content (Read-Only mode)
        const res = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/database/users.json?t=${Date.now()}`);
        content = await res.text();
    }
    USER_LIST = JSON.parse(content);
  } catch (e) {
    console.error("Errore fetch utenti:", e);
    USER_LIST = {};
  }
}

function initOctokit() {
  if (window.Octokit && GITHUB_TOKEN) {
    OCTOKIT = new window.Octokit({ auth: GITHUB_TOKEN });
    if(connectionStatus) {
        connectionStatus.innerHTML = '<span style="color: lime;">🟢 Online (Connected)</span>';
    }
    refreshDB();
  }
}
