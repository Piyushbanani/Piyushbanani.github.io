// --- 1. THE THEME SWITCHER (WITH MEMORY) ---
const toggleSwitch = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true; 
}

toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// --- 2. YOUR VIDEO DATA (Moved from works.js) ---
const myWork = {
    longForm: [
        {
            channelName: "Ankur Warikoo",
            avatarUrl: "https://via.placeholder.com/45", 
            subCount: "3.2M subscribers",
            youtubeVideoId: "dQw4w9WgXcQ" 
        },
        {
            channelName: "Shyam Meera Singh",
            avatarUrl: "https://via.placeholder.com/45", 
            subCount: "1.5M subscribers",
            youtubeVideoId: "dQw4w9WgXcQ" 
        }
    ],
    reels: [
        {
            channelName: "Animation Guy",
            avatarUrl: "https://via.placeholder.com/45",
            subCount: "500K followers",
            youtubeVideoId: "dQw4w9WgXcQ" 
        }
    ],
    motionGraphics: [] 
};

function createVideoCard(videoData) {
    return `
        <div class="video-card">
            <div class="creator-info">
                <img src="${videoData.avatarUrl}" alt="Avatar" class="creator-avatar">
                <div class="creator-details">
                    <div class="creator-name-row">
                        <span>${videoData.channelName}</span>
                        <span class="verified-tick">✔</span>
                    </div>
                    <span class="sub-count">${videoData.subCount}</span>
                </div>
            </div>
            <div class="video-wrapper">
                <iframe src="https://www.youtube.com/embed/${videoData.youtubeVideoId}" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

function renderSection(sectionId, gridId, videoArray) {
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);

    if (section && grid && videoArray.length > 0) {
        section.style.display = "block"; 
        grid.innerHTML = ""; // Clear it first so it doesn't double-load
        videoArray.forEach(video => {
            grid.innerHTML += createVideoCard(video);
        });
    }
}

// --- 3. THE FLOATING MAC WINDOW LOGIC ---
const macWindow = document.getElementById('mac-animation');
const macContent = document.getElementById('mac-content');
const windowTitle = document.getElementById('window-title');

function openWindow(section) {
    macWindow.classList.add('active');

    if (section === 'works') {
        windowTitle.innerText = "Works";
        
        // Inject the empty structure first
        macContent.innerHTML = `
            <div class="works-container" style="padding: 10px 0;">
                <div id="long-form-section" class="category-section" style="display: none;">
                    <h2 class="elegant-title">LONG FORM</h2>
                    <div id="long-form-grid" class="video-grid long-form"></div>
                </div>

                <div id="reels-section" class="category-section" style="display: none;">
                    <h2 class="elegant-title">REELS</h2>
                    <div id="reels-grid" class="video-grid reels"></div>
                </div>

                <div id="motion-section" class="category-section" style="display: none;">
                    <h2 class="elegant-title">MOTION GRAPHICS</h2>
                    <div id="motion-grid" class="video-grid motion"></div>
                </div>
            </div>
        `;

        // Now tell the code to fill that structure with your videos!
        renderSection('long-form-section', 'long-form-grid', myWork.longForm);
        renderSection('reels-section', 'reels-grid', myWork.reels);
        renderSection('motion-section', 'motion-grid', myWork.motionGraphics);

    } else if (section === 'clients') {
        windowTitle.innerText = "Clients";
        macContent.innerHTML = `<h2 class="elegant-title">MY CLIENTS</h2><p style="text-align:center;">List of clients goes here.</p>`;
    } else if (section === 'feedbacks') {
        windowTitle.innerText = "Feedbacks";
        macContent.innerHTML = `<h2 class="elegant-title">CLIENT FEEDBACKS</h2><p style="text-align:center;">Awesome reviews go here.</p>`;
    }
}

// --- MAC BUTTON FUNCTIONS ---
function closeWindow() {
    macWindow.classList.remove('active');
    setTimeout(() => {
        macWindow.classList.remove('maximized');
        macWindow.classList.remove('minimized');
        macContent.innerHTML = ''; 
    }, 600);
}

function maximizeWindow() {
    macWindow.classList.remove('minimized'); // Un-minimize if needed
    macWindow.classList.toggle('maximized');
}



// --- BULLETPROOF CLICK RULES ---

// This single listener handles all clicks on the entire page
document.addEventListener('click', function(event) {
    // 1. Check if the Mac window is currently open
    if (macWindow.classList.contains('active')) {
        
        // 2. Check exactly what the user just clicked
        const clickedInsideWindow = macWindow.contains(event.target);
        const clickedOpenButton = event.target.closest('.button');

        // 3. THE RULE: If they clicked OUTSIDE the Mac window, 
        // AND they didn't just click a button to open it... close the window!
        if (!clickedInsideWindow && !clickedOpenButton) {
            closeWindow();
        }
    }
});

// Close with the Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && macWindow.classList.contains('active')) {
        closeWindow();
    }
});