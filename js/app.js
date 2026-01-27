// --- INITIALIZATION ---
window.startApp = async function() {
    console.log("App Starting...");
    
    // SELECT ELEMENTS (Now that HTML is injected)
    assignDomElements();
  
    if (startupSound) startupSound.volume = 0.05;
  
    // RE-ATTACH LISTENERS (Since elements are new)
    attachEventListeners();
  
    // 1. BOOT SEQUENCE
    if(bootScreen) {
        bootScreen.style.display = "flex";
        void bootScreen.offsetWidth;
        if(bootProgress) bootProgress.style.width = "100%";
    }
  
    // 2. CHECK LOGIN
    setTimeout(async () => {
      if(bootScreen) bootScreen.style.display = "none";
      if (USER_NICKNAME) {
        if (GITHUB_TOKEN) initOctokit();
        else refreshDB(); // Load data in read-only mode if no token
        
        await loadUsers(); 
        setupDesktop();
  
        // Show welcome back
        const clippyText = document.getElementById("clippy-text");
        if (clippyText) {
          clippyText.innerHTML = `<b>Bentornato, ${USER_NICKNAME}!</b><br>Tutto è rimasto come lo avevi lasciato nell'Archivio. 💾`;
        }
      } else {
        if(loginScreen) loginScreen.style.display = "flex";
      }
    }, 3000);
  }
  
  function assignDomElements() {
      bootScreen = document.getElementById("boot-screen");
      bootProgress = document.getElementById("boot-progress");
      loginScreen = document.getElementById("login-screen");
      desktop = document.getElementById("desktop");
      nicknameInput = document.getElementById("nickname-input");
      passwordInput = document.getElementById("password-input");
      loginBtn = document.getElementById("login-btn");
      loginCancelBtn = document.getElementById("login-cancel-btn");
      loginHelpBtn = document.getElementById("login-help-btn");
      userDisplay = document.getElementById("user-display");
      connectionStatus = document.getElementById("connection-status");
      startupSound = document.getElementById("startup-sound");
    
      galleryContainer = document.getElementById("gallery-container");
      profileContainer = document.getElementById("profile-container");
      hofContainer = document.getElementById("hof-container");
      fileUploader = document.getElementById("file-uploader");
      uploadSubmitBtn = document.getElementById("upload-submit-btn");
    
      imageModal = document.getElementById("image-modal");
      modalImg = document.getElementById("modal-img");
      modalTitle = document.getElementById("modal-title");
      modalAuthor = document.getElementById("modal-author");
      modalDate = document.getElementById("modal-date");
      modalVotes = document.getElementById("modal-votes");
      commentList = document.getElementById("comment-list");
      commentInput = document.getElementById("comment-input");
  }
  
  function attachEventListeners() {
      if(loginBtn) loginBtn.addEventListener("click", handleLogin);
      if(loginCancelBtn) loginCancelBtn.addEventListener("click", () => window.close());
      if(loginHelpBtn) loginHelpBtn.addEventListener("click", () => {
          alert("⚠ ATTENZIONE ALLA RETE:\n\nSe scegli una Username questa deve essere definitiva.\nUsando un nome diverso in futuro creerai un nuovo profilo separato e perderai l'accesso ai tuoi dati precedenti.");
      });
      if(uploadSubmitBtn) uploadSubmitBtn.addEventListener("click", handleUpload);
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
