// CONFIG & STATE
const VALID_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "bmp"];
const MASTER_HASH = "a6c30408546530fa990e15cac376a86b";

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 */
const MD5 = (function () {
  "use strict";
  function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (msw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function binlMD5(x, len) {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894907506);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787280);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }
  function binl2rhex(binarray) {
    var hex_tab = "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
      str +=
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
        hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    }
    return str;
  }
  function str2binl(str) {
    var bin = [];
    var mask = (1 << 8) - 1;
    for (var i = 0; i < str.length * 8; i += 8) {
      bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
    }
    return bin;
  }
  return function (s) {
    return binl2rhex(binlMD5(str2binl(s), s.length * 8));
  };
})();

let MEME_DATABASE = [];
let USER_LIST = {}; // Nickname -> User data
let USER_NICKNAME = localStorage.getItem("meme_user_nickname") || null;
let GITHUB_TOKEN = localStorage.getItem("gh_token") || null;
let REPO_OWNER = "junibaac";
let REPO_NAME = "sarcastick";
let OCTOKIT = null;
let CURRENT_MEME = null;

// ELEMENTS
const bootScreen = document.getElementById("boot-screen");
const bootProgress = document.getElementById("boot-progress");
const loginScreen = document.getElementById("login-screen");
const desktop = document.getElementById("desktop");
const nicknameInput = document.getElementById("nickname-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const loginCancelBtn = document.getElementById("login-cancel-btn");
const loginHelpBtn = document.getElementById("login-help-btn");
const userDisplay = document.getElementById("user-display");
const connectionStatus = document.getElementById("connection-status");
const startupSound = document.getElementById("startup-sound");

// VIEWS & CONTAINERS
const galleryContainer = document.getElementById("gallery-container");
const profileContainer = document.getElementById("profile-container");
const hofContainer = document.getElementById("hof-container");
const fileUploader = document.getElementById("file-uploader");
const uploadSubmitBtn = document.getElementById("upload-submit-btn");

// MODAL ELEMENTS
const imageModal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalAuthor = document.getElementById("modal-author");
const modalDate = document.getElementById("modal-date");
const modalVotes = document.getElementById("modal-votes");
const commentList = document.getElementById("comment-list");
const commentInput = document.getElementById("comment-input");

startupSound.volume = 0.05;

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", async () => {
  // 1. BOOT SEQUENCE
  bootScreen.style.display = "flex";
  void bootScreen.offsetWidth;
  bootProgress.style.width = "100%";

  // 2. CHECK LOGIN
  setTimeout(async () => {
    bootScreen.style.display = "none";
    if (USER_NICKNAME) {
      if (GITHUB_TOKEN) initOctokit();
      await loadUsers(); // Load users for returning user
      setupDesktop();

      // Show welcome back
      const clippyText = document.getElementById("clippy-text");
      if (clippyText) {
        clippyText.innerHTML = `<b>Bentornato, ${USER_NICKNAME}!</b><br>Tutto è rimasto come lo avevi lasciato nell'Archivio. 💾`;
      }
    } else {
      loginScreen.style.display = "flex";
    }
  }, 3000);
});

// LOGIN ACTION
loginBtn.addEventListener("click", async () => {
  const nick = nicknameInput.value.trim();
  const pass = passwordInput.value;

  if (!nick || !pass) {
    alert("Inserisci un Nickname e una Password!");
    return;
  }

  // 1. Validate Password (Shared secret)
  // Check if it's the admin token (backdoor for owner)
  if (pass.startsWith('ghp_') || pass.startsWith('github_pat_')) {
      localStorage.setItem('gh_token', pass);
      GITHUB_TOKEN = pass;
      initOctokit();
  } 
  // Otherwise check against Master Password
  else if (MD5(pass) !== MASTER_HASH) {
      alert("Password errata! Accesso negato.");
      return;
  }

  // 2. Load users to check if existing
  await loadUsers();

  const isNewUser = !USER_LIST[nick];

  // 3. Register or Update
  if (isNewUser) {
    USER_LIST[nick] = {
      joinedDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    await syncUsers();
    
    // NEW USER WELCOME
    document.getElementById('welcome-user-title').textContent = `Benvenuto, ${nick}!`;
    document.getElementById('welcome-window').style.display = 'flex';
  } else {
    USER_LIST[nick].lastLogin = new Date().toISOString();
    await syncUsers();
  }

  USER_NICKNAME = nick;
  localStorage.setItem("meme_user_nickname", nick);
  loginScreen.style.display = "none";
  
  if (startupSound) {
    try { startupSound.play().catch(() => {}); } catch (e) {}
  }

  setupDesktop();
});

window.closeWelcome = function() {
    document.getElementById('welcome-window').style.display = 'none';
}

// LOGIN EXTRA ACTIONS
loginCancelBtn.addEventListener("click", () => {
  // Attempt to close the tab
  window.close();
});

loginHelpBtn.addEventListener("click", () => {
  alert(
    "⚠ ATTENZIONE ALLA RETE:\n\nSe scegli una Username questa deve essere definitiva.\nUsando un nome diverso in futuro creerai un nuovo profilo separato e perderai l'accesso ai tuoi dati precedenti.",
  );
});

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
    connectionStatus.innerHTML =
      '<span style="color: lime;">🟢 Online (Connected)</span>';
    refreshDB();
  }
}

function setupDesktop() {
  desktop.style.display = "flex";
  userDisplay.textContent = USER_NICKNAME;
  switchView("gallery");
}

// --- NAVIGATION ---
window.switchView = function (viewId) {
  document
    .querySelectorAll(".view-section")
    .forEach((v) => (v.style.display = "none"));
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.style.display = "block";

  document
    .querySelectorAll(".nav-menu li")
    .forEach((li) => li.classList.remove("active"));
  document.getElementById(`nav-${viewId}`)?.classList.add("active");

  if (viewId === "profile") renderProfile();
  if (viewId === "hall-of-fame") renderHallOfFame();
  if (viewId === "gallery") renderGallery(MEME_DATABASE);
};

// --- GITHUB "DATABASE" LOGIC ---

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

// --- UPLOAD LOGIC ---
uploadSubmitBtn.addEventListener("click", async () => {
  if (!OCTOKIT) {
    alert("GitHub non connesso!");
    return;
  }
  if (fileUploader.files.length === 0) {
    alert("Scegli un file!");
    return;
  }

  const file = fileUploader.files[0];
  const reader = new FileReader();

  uploadSubmitBtn.disabled = true;
  uploadSubmitBtn.textContent = "CARICAMENTO...";

  reader.onload = async () => {
    const base64 = reader.result.split(",")[1];
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

    try {
      // 1. Upload Image to uploads/
      await OCTOKIT.rest.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: `uploads/${fileName}`,
        message: `New Meme: ${fileName}`,
        content: base64,
      });

      // 2. Add to Database
      const newPost = {
        id: Date.now(),
        name: file.name,
        fileName: fileName,
        url: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/uploads/${fileName}`,
        uploadedBy: USER_NICKNAME,
        uploadDate: new Date().toISOString(),
        likedBy: [],
        comments: [],
      };

      MEME_DATABASE.push(newPost);
      await syncDB();

      alert("Meme pubblicato sul Reticolo!");
      fileUploader.value = "";
      switchView("gallery");
      refreshDB();
    } catch (e) {
      console.error(e);
      alert("Errore caricamento: " + e.message);
    } finally {
      uploadSubmitBtn.disabled = false;
      uploadSubmitBtn.textContent = "PUBBLICA SUL RETICOLO";
    }
  };
  reader.readAsDataURL(file);
});

// --- UI RENDERING ---

function renderGallery(memes, containerId = "gallery-container") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  if (memes.length === 0) {
    container.innerHTML =
      '<p style="color:#666; width:100%; text-align:center;">Il Reticolo è vuoto. Carica il primo meme!</p>';
    return;
  }

  memes.forEach((post) => {
    const card = createPostCard(post);
    container.appendChild(card);
  });
}

function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "meme-card";
  card.onclick = (e) => {
    if (e.target.tagName !== "SPAN") openModal(post);
  };

  const hasLiked = post.likedBy.includes(USER_NICKNAME);

  card.innerHTML = `
        <img src="${post.url}" title="${post.name}" loading="lazy">
        <div class="meme-info">
            <b title="${post.name}">${post.name}</b>
            <span class="like-counter ${hasLiked ? "active" : ""}" onclick="event.stopPropagation(); votePost(${post.id})">
                ${hasLiked ? "❤️" : "🤍"} ${post.likedBy.length}
            </span>
        </div>
        <div style="font-size: 10px; color: #3b5998; text-align: left; margin-top: 5px;">
            Node: <b>${post.uploadedBy}</b>
        </div>
    `;
  return card;
}

function renderProfile() {
  const myPosts = MEME_DATABASE.filter((p) => p.uploadedBy === USER_NICKNAME);
  renderGallery(myPosts, "profile-container");
}

function renderHallOfFame() {
  const sorted = [...MEME_DATABASE].sort(
    (a, b) => b.likedBy.length - a.likedBy.length,
  );
  renderGallery(sorted.slice(0, 10), "hof-container");
}

// --- SOCIAL MODAL ---
window.openModal = function (post) {
  CURRENT_MEME = post;
  imageModal.style.display = "flex";
  modalImg.src = post.url;
  modalAuthor.textContent = post.uploadedBy;
  modalDate.textContent = new Date(post.uploadDate).toLocaleString();
  modalTitle.textContent = post.name;
  modalVotes.textContent = post.likedBy.length;

  updateModalLikeUI();
  renderComments(post.comments);
};

function updateModalLikeUI() {
  if (!CURRENT_MEME) return;
  const hasLiked = CURRENT_MEME.likedBy.includes(USER_NICKNAME);
  const likeBtn = document.querySelector(
    '.action-btn[onclick="voteCurrent()"]',
  );
  if (likeBtn) {
    likeBtn.innerHTML = `${hasLiked ? "❤️ Ti piace" : "👍 Like"} <span>${CURRENT_MEME.likedBy.length}</span>`;
    likeBtn.style.color = hasLiked ? "#ff00ff" : "#606770";
  }
}

window.votePost = async function (postId) {
  const post = MEME_DATABASE.find((p) => p.id === postId);
  if (!post) return;

  const index = post.likedBy.indexOf(USER_NICKNAME);
  if (index === -1) post.likedBy.push(USER_NICKNAME);
  else post.likedBy.splice(index, 1);

  renderGallery(MEME_DATABASE);
  await syncDB();
};

window.voteCurrent = async function () {
  if (!CURRENT_MEME) return;
  await votePost(CURRENT_MEME.id);
  updateModalLikeUI();
};

window.submitComment = async function () {
  const text = commentInput.value.trim();
  if (!text || !CURRENT_MEME) return;

  CURRENT_MEME.comments.push({
    user: USER_NICKNAME,
    text: text,
    date: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  commentInput.value = "";
  renderComments(CURRENT_MEME.comments);
  await syncDB();
};

function renderComments(comments) {
  commentList.innerHTML = "";
  if (comments.length === 0) {
    commentList.innerHTML =
      '<div style="color:#90949c; text-align:center; padding:10px;">Vuoto spaziale...</div>';
    return;
  }
  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `<span class="comment-author-name">${c.user}</span> <span style="color:#1d2129;">${c.text}</span><div style="font-size:11px; color:#90949c;">${c.date}</div>`;
    commentList.appendChild(div);
  });
}

// --- MOUSE TRAIL ---
document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = e.pageX + "px";
  trail.style.top = e.pageY + "px";
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 500);
});
