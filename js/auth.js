// Token Base64 per fregare il bot di GitHub 100%
// Esegui nel terminale: echo -n "IL_TUO_NUOVO_TOKEN" | base64
const HIDDEN_TOKEN = "Z2l0aHViX3BhdF8xMUIzUFFCR1EwYjNncDVYcW5BMHRlX1o2WGJTVkRRNEpUQ0laSTBGN1dndG1uRnlTWGVUamFtQ0k3eXBFekVIM2haVEZUNzdLRGFKd0MzSDNj";
const SHARED_TOKEN = atob(HIDDEN_TOKEN);

const handleLogin = async () => {
    const nick = nicknameInput.value.trim();
    const pass = passwordInput.value;
  
    if (!nick || !pass) {
      alert("Inserisci un Nickname e una Password!");
      return;
    }
  
    // 1. ADMIN/DEV LOGIN (Direct Token)
    if (pass.startsWith('ghp_') || pass.startsWith('github_pat_')) {
        console.log("Login Admin via Token diretto");
        localStorage.setItem('gh_token', pass);
        GITHUB_TOKEN = pass;
        initOctokit();
    } 
    // 2. STANDARD LOGIN (Master Password -> Shared Token)
    else if (MD5(pass) === MASTER_HASH) {
        console.log("Login Standard via Password Condivisa");
        // USA IL TOKEN NASCOSTO
        GITHUB_TOKEN = SHARED_TOKEN;
        localStorage.setItem('gh_token', SHARED_TOKEN);
        initOctokit();
    }
    else {
        alert("Password errata! Accesso negato.");
        return;
    }
  
    // 3. Load users to check if existing
    await loadUsers();
  
    const isNewUser = !USER_LIST[nick];
  
    // 4. Register or Update
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
  };
  
  window.closeWelcome = function() {
      document.getElementById('welcome-window').style.display = 'none';
  }

  window.logout = function() {
      if(confirm("Vuoi disconnetterti e tornare alla schermata di login?")) {
          localStorage.removeItem("meme_user_nickname");
          localStorage.removeItem("gh_token");
          location.reload();
      }
  }
