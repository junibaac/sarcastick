// --- UI RENDERING & NAVIGATION ---

window.switchView = function (viewId) {
    window.currentView = viewId;
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
  
  function renderGallery(memes, containerId = "gallery-container") {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
  
    if (memes.length === 0) {
      container.innerHTML =
        '<p style="color:#666; width:100%; text-align:center;">La grid è vuota. Carica il primo meme!</p>';
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
    // Update Profile Header Name
    const wallName = document.getElementById("wall-user-name");
    if(wallName) wallName.textContent = USER_NICKNAME;

    // Update names in the quick post box labels if present
    document.querySelectorAll(".current-user-name").forEach(el => {
        el.textContent = USER_NICKNAME;
    });

    const myPosts = MEME_DATABASE.filter((p) => p.uploadedBy === USER_NICKNAME);
    renderGallery(myPosts, "profile-container");
  }

  function renderHallOfFame() {
    // Sort by TOTAL engagement: LIKES + COMMENTS
    const sorted = [...MEME_DATABASE].sort((a, b) => {
      const engA = (a.likedBy?.length || 0) + (a.comments?.length || 0);
      const engB = (b.likedBy?.length || 0) + (b.comments?.length || 0);
      return engB - engA;
    });
    renderGallery(sorted.slice(0, 10), "hof-container");
  }

  function setupDesktop() {
    desktop.style.display = "flex";
    userDisplay.textContent = USER_NICKNAME;
    switchView("gallery");
  }

    // UPLOAD LOGIC
    const handleUpload = async () => {
    if (!GITHUB_TOKEN) {
        alert("Accesso 'Read Only'. Per caricare devi fare Login con il GitHub Token.");
        return;
    }
    if (!OCTOKIT) {
        alert("Errore di connessione a GitHub.");
        return;
    }
    if (fileUploader.files.length === 0) {
        alert("Scegli un file!");
        return;
    }

    const file = fileUploader.files[0];
    
    // Check File Size (Max 300KB)
    if (file.size > 300 * 1024) {
        alert(`File troppo grande! (${(file.size/1024).toFixed(1)}KB)\nIl limite è 300KB per non intasare l'archivio.`);
        return;
    }
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

        alert("Meme pubblicato sulla GRID!");
        fileUploader.value = "";
        switchView("gallery");
        refreshDB();
        } catch (e) {
        console.error(e);
        alert("Errore caricamento: " + e.message);
        } finally {
        if(uploadSubmitBtn) {
            uploadSubmitBtn.disabled = false;
            uploadSubmitBtn.textContent = "PUBBLICA SULLA GRID";
        }
        }
    };
    reader.readAsDataURL(file);
    };

    // QUICK POST LOGIC (Facebook Style)
    window.handleQuickPost = async (btn) => {
        const parent = btn.closest(".window");
        const textInput = parent.querySelector(".post-text-input");
        const fileInput = parent.querySelector(".post-file-input");

        const text = textInput.value.trim();
        const file = fileInput.files[0];

        if (!GITHUB_TOKEN) {
            alert("Accesso 'Read Only'. Fai Login con Password per postare!");
            return;
        }
        if (!file) {
            alert("Devi allegare almeno UNA foto!");
            return;
        }

        // Check File Size (Max 300KB)
        if (file.size > 300 * 1024) {
            alert(`File troppo grande! (${(file.size/1024).toFixed(1)}KB)\nIl limite è 300KB.`);
            return;
        }

        // Disable UI
        btn.disabled = true;
        const oldText = btn.textContent;
        btn.textContent = "Pubblicazione...";

        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result.split(",")[1];
            // Use text as name, fallback to filename if empty
            const postName = text || file.name; 
            const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;

            try {
                 // 1. Upload Image
                 await OCTOKIT.rest.repos.createOrUpdateFileContents({
                    owner: REPO_OWNER,
                    repo: REPO_NAME,
                    path: `uploads/${fileName}`,
                    message: `New Quick Post: ${fileName}`,
                    content: base64,
                });

                // 2. Update DB
                const newPost = {
                    id: Date.now(),
                    name: postName,
                    fileName: fileName,
                    url: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/uploads/${fileName}`,
                    uploadedBy: USER_NICKNAME,
                    uploadDate: new Date().toISOString(),
                    likedBy: [],
                    comments: [],
                };

                MEME_DATABASE.push(newPost);
                await syncDB();

                alert("Post pubblicato!");
                textInput.value = "";
                fileInput.value = "";
                
                // Refresh views
                if (window.currentView === "profile") renderProfile();
                else refreshDB(); 

            } catch (e) {
                console.error(e);
                alert("Errore durante il post: " + e.message);
            } finally {
                btn.disabled = false;
                btn.textContent = oldText;
            }
        };
        reader.readAsDataURL(file);
    }
