const handleLogin = async () => {
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
  };
  
  window.closeWelcome = function() {
      document.getElementById('welcome-window').style.display = 'none';
  }
