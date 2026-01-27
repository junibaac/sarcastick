
// LOADER SCRIPT
// Fetches HTML parts and injects them into the DOM
// Then initializes the main app

async function loadPart(fileName, containerId = "app-root") {
    try {
        const response = await fetch(`parts/${fileName}?t=${Date.now()}`); // Prevent caching
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const html = await response.text();
        
        // Inject HTML
        const container = document.getElementById(containerId);
        if (container) {
            // Append or Replace? 
            // We append to a specific container for parts that are top-level
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            
            // Move children out of wrapper to avoid extra div if possible
            while (wrapper.firstChild) {
                container.appendChild(wrapper.firstChild);
            }
        }
    } catch (e) {
        console.error(`Error loading part ${fileName}:`, e);
    }
}

async function initLoader() {
    console.log("Loading System Components...");
    
    // Ordered Loading
    // 1. Background
    await loadPart("background.html", "app-root");
    
    // 2. Boot Screen
    await loadPart("boot.html", "app-root");
    
    // 3. Login Screen
    await loadPart("login.html", "app-root");
    
    // 4. Desktop (The main UI)
    await loadPart("desktop.html", "app-root");
    
    // 5. Modals (Overlays)
    await loadPart("modals.html", "app-root");

    console.log("Components Loaded. Starting OS...");
    
    // Trigger the main App initialization
    if (window.startApp) {
        window.startApp();
    } else {
        console.error("startApp function not found in app.js");
    }
}

document.addEventListener("DOMContentLoaded", initLoader);
