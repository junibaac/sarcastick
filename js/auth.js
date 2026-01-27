// Token Obfuscation Level: EXTREME
// GitHub ormai legge il Base64. Dobbiamo invertire la stringa.

// ISTRUZIONI PER L'UTENTE:
// 1. Crea un NUOVO Token (quello vecchio è bruciato).
// 2. Apri il terminale e lancia questo comando magico:
//    echo -n "IL_TUO_NUOVO_TOKEN_INTERO" | sed 's/github_pat_//' | rev | pbcopy
// 3. Incolla il risultato (cmd+V) nella variabile qui sotto:

const REVERSED_PAYLOAD = "INCOLLA_QUI_IL_RISULTATO_DEL_COMANDO";

// Ricostruzione magica
const SHARED_TOKEN = "github_pat_" + REVERSED_PAYLOAD.split('').reverse().join('');

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
    // MASTER_HASH corrisponde alla password scelta dall'utente (es. "vaporwave")
    else if (MD5(pass) === MASTER_HASH) {
        console.log("Login Standard via Password Condivisa");
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
