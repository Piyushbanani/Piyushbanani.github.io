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

// --- 2. YOUR VIDEO DATA (THE TEMPLATE BLOCKS) ---
// To add a new video, just copy one of these blocks {} and fill in the details!
const myWork = {
    longForm: [
        {
            platform: "drive", // Type "youtube" or "drive"
            videoLink: "https://drive.google.com/file/d/13S3bmxCsDd4ZFkcQYKudlnFxvXOOk28M/view?usp=sharing", // Just paste the raw link here
            channelName: "Aevytv",
            username: "@aevytv",
            channelLink: "https://www.youtube.com/@aevytv",
            avatarUrl: "https://yt3.ggpht.com/smpvbfd6kga9xo3rTSPe-wZt0VEejfcK9uUcFmZKAkBV8_CJgMBHSBnXn_MHx7_nF8Mul3jJ2Q=s176-c-k-c0x00ffffff-no-rj-mo", // Right-click YT picture -> Copy image address
            subStart: 0.10, // Starting number (0.10 means 100k)
            subEnd: 1.21,   // Ending number (1.21 means 1.21M)
            subSuffix: "M", // M for Millions, K for Thousands
            videoCount: "540"
        },
        {
            platform: "youtube",
            videoLink: "https://youtu.be/2LVasifxts8?t=385", // For YouTube, just paste the Video ID
            channelName: "Shyam Meera Singh",
            username: "@ShyamMeeraSingh1",
            channelLink: "https://www.youtube.com/@ShyamMeeraSingh1",
            avatarUrl: "https://yt3.googleusercontent.com/1abhPJau58hVgF4BA4sinMwEyJ9XFGQn90XNnN82-3ZAU6aM9Ksco9kVD5HtKXQBWm2UHCIjXg=s160-c-k-c0x00ffffff-no-rj", 
            subStart: 0.50, 
            subEnd: 1.69,
            subSuffix: "M",
            videoCount: "146"
        }
    ],
    reels: [],
    motionGraphics: [] 
};

// --- AUTOMATIC VIDEO CARD BUILDER ---
// --- AUTOMATIC VIDEO CARD BUILDER ---
function createVideoCard(videoData) {
    let embedUrl = "";
    
    if (videoData.platform === "youtube") {
        // This new code automatically fixes whatever kind of YouTube link you paste!
        let cleanId = videoData.videoLink;
        if (cleanId.includes('youtu.be/')) {
            cleanId = cleanId.split('youtu.be/')[1].split('?')[0];
        } else if (cleanId.includes('watch?v=')) {
            cleanId = cleanId.split('watch?v=')[1].split('&')[0];
        }
        embedUrl = `https://www.youtube.com/embed/${cleanId}`;
        
    } else if (videoData.platform === "drive") {
        embedUrl = videoData.videoLink.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }

    return `
        <div class="video-card">
            <div class="creator-info">
                <a href="${videoData.channelLink}" target="_blank" class="creator-name-link">
                    <img src="${videoData.avatarUrl}" alt="Avatar" class="creator-avatar">
                </a>
                
                <div class="creator-details">
                    <div class="creator-name-row">
                        <a href="${videoData.channelLink}" target="_blank" class="creator-name-link">
                            <span>${videoData.channelName}</span>
                        </a>
                        <span class="verified-tick">✔</span>
                    </div>
                    
                    <a href="${videoData.channelLink}" target="_blank" class="creator-name-link creator-username">
                        ${videoData.username}
                    </a>
                    
                    <div class="stats-row">
                        <span class="sub-count" id="sub-${videoData.uniqueId}">0 subscribers</span>
                        <span>• ${videoData.videoCount} videos</span>
                    </div>
                </div>
            </div>
            <div class="video-wrapper">
                <iframe src="${embedUrl}" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

// --- NUMBER ANIMATION ENGINE ---
function animateValue(obj, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function for a smooth cinematic slowdown at the end
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = (easeProgress * (end - start) + start).toFixed(2); 
        
        obj.innerHTML = currentVal + suffix + " subscribers";
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end + suffix + " subscribers"; // lock exactly on the final number
        }
    };
    window.requestAnimationFrame(step);
}

function renderSection(sectionId, gridId, videoArray) {
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);

    if (section && grid && videoArray.length > 0) {
        section.style.display = "block"; 
        
        let htmlString = "";
        videoArray.forEach((video, index) => {
            video.uniqueId = sectionId + '-' + index; // Create a unique ID for the animation target
            htmlString += createVideoCard(video);
        });
        grid.innerHTML = htmlString; // Inject all cards at once

        // Trigger animations for each card taking exactly 3 seconds (3000ms)
        videoArray.forEach(video => {
            const subElement = document.getElementById(`sub-${video.uniqueId}`);
            if (subElement) {
                animateValue(subElement, video.subStart, video.subEnd, 3000, video.subSuffix);
            }
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

// --- MAC BUTTON FUNCTIONS & BULLETPROOF CLICK RULES ---
function closeWindow() {
    macWindow.classList.remove('active');
    setTimeout(() => {
        macWindow.classList.remove('maximized');
        macContent.innerHTML = ''; 
    }, 600);
}

function maximizeWindow() {
    macWindow.classList.toggle('maximized');
}

document.addEventListener('click', function(event) {
    if (macWindow.classList.contains('active')) {
        const clickedInsideWindow = macWindow.contains(event.target);
        const clickedOpenButton = event.target.closest('.button');

        if (!clickedInsideWindow && !clickedOpenButton) {
            closeWindow();
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && macWindow.classList.contains('active')) {
        closeWindow();
    }
});