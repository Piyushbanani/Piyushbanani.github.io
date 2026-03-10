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
const myWork = {
    longForm: [
        {
            platform: "drive", 
            videoLink: "https://drive.google.com/file/d/13S3bmxCsDd4ZFkcQYKudlnFxvXOOk28M/view?usp=sharing", 
            channelName: "Aevytv",
            username: "@aevytv",
            channelLink: "https://www.youtube.com/@aevytv",
            avatarUrl: "https://yt3.ggpht.com/smpvbfd6kga9xo3rTSPe-wZt0VEejfcK9uUcFmZKAkBV8_CJgMBHSBnXn_MHx7_nF8Mul3jJ2Q=s176-c-k-c0x00ffffff-no-rj-mo", 
            subStart: 0.10, 
            subEnd: 1.21,   
            subSuffix: "M", 
            videoCount: "540"
        },
        {
            platform: "drive", 
            videoLink: "https://drive.google.com/file/d/1Ps4dZHsptFCuiuEkqk5TyXwYkuSvqREU/view?usp=sharing", 
            channelName: "Shivanshu Agrawal",
            username: "@Shivanshu.Agrawal",
            channelLink: "https://www.youtube.com/@Shivanshu.Agrawal",
            avatarUrl: "https://yt3.googleusercontent.com/XiLMw-52SS9NYuIB7CpUG8A75tahD783323deqfJ5N773h_v28YecrKEadpVQFFNKOPGWlNR4Q=s160-c-k-c0x00ffffff-no-rj", 
            subStart: 0.50, 
            subEnd: 1.82,   
            subSuffix: "M", 
            videoCount: "150"
        },
        {
            platform: "youtube",
            videoLink: "https://youtu.be/2LVasifxts8?t=385", 
            channelName: "Shyam Meera Singh",
            username: "@ShyamMeeraSingh1",
            channelLink: "https://www.youtube.com/@ShyamMeeraSingh1",
            avatarUrl: "https://yt3.googleusercontent.com/1abhPJau58hVgF4BA4sinMwEyJ9XFGQn90XNnN82-3ZAU6aM9Ksco9kVD5HtKXQBWm2UHCIjXg=s160-c-k-c0x00ffffff-no-rj", 
            subStart: 0.50, 
            subEnd: 1.69,
            subSuffix: "M",
            videoCount: "146"
        },
        {
            platform: "youtube",
            videoLink: "https://www.youtube.com/watch?v=dCsInyX7Q-g", 
            channelName: "Personal Finance TV",
            username: "@PersonalFinanceTV",
            channelLink: "https://www.youtube.com/@PersonalFinanceTV",
            avatarUrl: "https://yt3.googleusercontent.com/VjEDkL6UnO0qtUgBJ7gq5HKT5opMqryDuKAfmVH-oSh8NNM53_0qmh7bS06j4rFHDYkvO-Flhw=s160-c-k-c0x00ffffff-no-rj", 
            subStart: 0.00, 
            subEnd: 250,
            subSuffix: "K",
            videoCount: "125"
        }
    ],
    reels: [
        {
            channelName: "Aniket Thakur",
            username: "@Aniketthakur01",
            channelLink: "https://www.instagram.com/anikett.thakurr/",
            avatarUrl: "https://yt3.googleusercontent.com/vZOk8EXPt-z2D47EcxH7joqFahSmmw_OnmWb5yoL-m8wgzOnp0fuwbMp8i7yuChmuU_v9IOJ=s160-c-k-c0x00ffffff-no-rj",
            subStart: 500,
            subEnd: 964,
            subSuffix: "K",
            videoCount: "544",
            videos: [
                { platform: "drive", videoLink: "https://drive.google.com/file/d/1_X_JHKWxXAN0FepVgNiymipEUg668osf/view?usp=sharing" },
                { platform: "drive", videoLink: "https://drive.google.com/file/d/106WH4WJ3JwgMPYt08InnIKVqQDtG5fz1/view?usp=sharing" },
                { platform: "drive", videoLink: "https://drive.google.com/file/d/138eB2030DdxbX4wZfHEkvNZVo2Yw7l0k/view?usp=sharing" }
            ]
        },
        {
            channelName: "Adarsh Gupta",
            username: "@adarshh.gupta",
            channelLink: "https://www.instagram.com/adarshh.gupta/",
            avatarUrl: "https://yt3.googleusercontent.com/buet1DbdJ3gsiDZ6anqVQ8uMy1Y8tL5ZQmjJLTNHuEzgA-kOwLH90lx6jOKuGBUoLVu_u5vENg=s160-c-k-c0x00ffffff-no-rj",
            subStart: 1.0,
            subEnd: 2.0,
            subSuffix: "M",
            videoCount: "799",
            videos: [
                { platform: "drive", videoLink: "https://drive.google.com/file/d/10tVHHFUCRIs25hK0MgHLc_QWFzlQnFRv/view?usp=sharing" },
                { platform: "drive", videoLink: "https://drive.google.com/file/d/1DODujJnRCP8A_CKq5AOYWAWPEr1vmdni/view?usp=sharing" },
                { platform: "drive", videoLink: "https://drive.google.com/file/d/1l9XFZcpFAFmccVWGERBgpTejKRjjz4qh/view?usp=sharing" }
            ]
        },
        {
            channelName: "Nerdy Snacking",
            username: "@nerdySnacking",
            channelLink: "https://www.youtube.com/@nerdySnacking/shorts",
            avatarUrl: "https://yt3.googleusercontent.com/CizRmSh_ZSi6RSTfYQml0hNSHfLOre4pK9_PA6SQCxSkCSH_yb0o58ajdMlx-WGQb_XvtGAyPQ=s160-c-k-c0x00ffffff-no-rj",
            subStart: 100,
            subEnd: 500,
            subSuffix: "K",
            videoCount: "300",
            videos: [
                { platform: "drive", videoLink: "https://drive.google.com/file/d/1OtOYIqvHqDrOVYwhDQ7A188X-uvymL4P/view?usp=sharing" },
                { platform: "drive", videoLink: "https://drive.google.com/file/d/15NXwwUDoRTdGtSlLkbmXoDWwUpnGqlPb/view?usp=sharing" },
                { platform: "drive", videoLink: "https://drive.google.com/file/d/1rsFp-oCk76kr75Xom61iBGof5UjIOlbI/view?usp=sharing" }
            ]
        }
    ],
    motionGraphics: [
        {
            platform: "drive",
            videoLink: "https://drive.google.com/file/d/1ZIEW5npLFCkueg_3lH_yJW9tlr3diROd/view?usp=sharing"
        },
        {
            platform: "drive",
            videoLink: "https://drive.google.com/file/d/1zN2dVB9N9LiZHWfe43J_1v-GmcoNXPo4/view?usp=sharing"
        }
    ] 
};

// --- HELPER FUNCTION FOR VIDEO LINKS ---
function getEmbedUrl(videoData) {
    let embedUrl = "";
    if (videoData.platform === "youtube") {
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
    return embedUrl;
}

// --- FLAT CARD BUILDER (Long form & Motion Graphics) ---
// Added 'slide-animate' and data attributes for the observer to trigger animations
function createVideoCard(videoData) {
    let embedUrl = getEmbedUrl(videoData);

    let creatorInfoHtml = "";
    if (videoData.channelName) {
        creatorInfoHtml = `
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
                        <span class="sub-count" data-start="${videoData.subStart}" data-end="${videoData.subEnd}" data-suffix="${videoData.subSuffix}">0 subscribers</span>
                        <span>• ${videoData.videoCount} videos</span>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <div class="video-card slide-animate">
            ${creatorInfoHtml}
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
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = (easeProgress * (end - start) + start).toFixed(2); 
        
        obj.innerHTML = currentVal + suffix + " subscribers";
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end + suffix + " subscribers"; 
        }
    };
    window.requestAnimationFrame(step);
}

// --- RENDER STANDARD LIST (Long Form, Motion Graphics) ---
function renderSection(sectionId, gridId, videoArray) {
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);

    if (section && grid && videoArray.length > 0) {
        section.style.display = "block"; 
        
        let htmlString = "";
        videoArray.forEach((video) => {
            htmlString += createVideoCard(video);
        });
        grid.innerHTML = htmlString; 
    }
}

// --- RENDER GROUPED LIST (Reels) ---
// Added 'slide-animate' and data attributes for the observer
function renderGroupedSection(sectionId, gridId, dataArray) {
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);

    if (section && grid && dataArray.length > 0) {
        section.style.display = "block"; 
        
        let htmlString = "";
        dataArray.forEach((creator) => {
            let videosHtml = "";
            creator.videos.forEach(vid => {
                let embedUrl = getEmbedUrl(vid);
                videosHtml += `
                    <div class="video-card no-margin">
                        <div class="video-wrapper">
                            <iframe src="${embedUrl}" allowfullscreen></iframe>
                        </div>
                    </div>
                `;
            });

            htmlString += `
                <div class="slide-animate" style="margin-bottom: 50px;">
                    <div class="creator-info">
                        <a href="${creator.channelLink}" target="_blank" class="creator-name-link">
                            <img src="${creator.avatarUrl}" alt="Avatar" class="creator-avatar">
                        </a>
                        <div class="creator-details">
                            <div class="creator-name-row">
                                <a href="${creator.channelLink}" target="_blank" class="creator-name-link">
                                    <span>${creator.channelName}</span>
                                </a>
                                <span class="verified-tick">✔</span>
                            </div>
                            <a href="${creator.channelLink}" target="_blank" class="creator-name-link creator-username">
                                ${creator.username}
                            </a>
                            <div class="stats-row">
                                <span class="sub-count" data-start="${creator.subStart}" data-end="${creator.subEnd}" data-suffix="${creator.subSuffix}">0 subscribers</span>
                                <span>• ${creator.videoCount} videos</span>
                            </div>
                        </div>
                    </div>
                    <div class="reels-grid">
                        ${videosHtml}
                    </div>
                </div>
            `;
        });
        grid.innerHTML = htmlString; 
    }
}

// --- SCROLL ANIMATION OBSERVER ---
// This watches elements and animates them ONLY when they scroll into view
let scrollObserver;

function initScrollAnimations() {
    if (scrollObserver) scrollObserver.disconnect();
    
    scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. Trigger the Apple bouncy slide-in
                entry.target.classList.add('visible');
                
                // 2. Trigger the number counter (if one exists inside this block)
                const subCounter = entry.target.querySelector('.sub-count');
                if (subCounter && !subCounter.classList.contains('animated')) {
                    subCounter.classList.add('animated'); // Mark so it doesn't double-animate
                    const startVal = parseFloat(subCounter.dataset.start) || 0;
                    const endVal = parseFloat(subCounter.dataset.end) || 0;
                    const suffix = subCounter.dataset.suffix || "";
                    animateValue(subCounter, startVal, endVal, 2500, suffix);
                }
                
                // 3. Unobserve so it only happens ONCE per window open!
                observer.unobserve(entry.target);
            }
        });
    }, { 
        root: document.getElementById('mac-content'), 
        rootMargin: '0px 0px -40px 0px', // Triggers slightly before it fully hits the bottom
        threshold: 0.1 
    });

    document.querySelectorAll('.slide-animate').forEach(el => scrollObserver.observe(el));
}


// --- 3. THE FLOATING MAC WINDOW LOGIC ---
const macWindow = document.getElementById('mac-animation');
const windowOverlay = document.getElementById('window-overlay');
const macContent = document.getElementById('mac-content');
const windowTitle = document.getElementById('window-title');

function openWindow(section) {
    macWindow.classList.add('active');
    windowOverlay.classList.add('active'); 
    macContent.style.scrollBehavior = 'smooth';

    if (section === 'works') {
        windowTitle.innerText = "Works";
        
        macContent.innerHTML = `
            <div style="display: flex; justify-content: flex-end; gap: 20px; padding: 10px 0; position: sticky; top: -20px; z-index: 10; background-color: var(--mac-bg); border-bottom: 1px solid var(--border-color);">
                <a href="#long-form-section" style="color: var(--mac-text); text-decoration: none; font-weight: 600; font-size: 14px;">Long Form</a>
                <a href="#reels-section" style="color: var(--mac-text); text-decoration: none; font-weight: 600; font-size: 14px;">Reels</a>
                <a href="#motion-section" style="color: var(--mac-text); text-decoration: none; font-weight: 600; font-size: 14px;">Motion Graphics</a>
            </div>
            <div class="works-container" style="padding: 10px 0;">
                <div id="long-form-section" class="category-section" style="display: none; scroll-margin-top: 50px;">
                    <h2 class="elegant-title">LONG FORM</h2>
                    <div id="long-form-grid" class="video-grid long-form"></div>
                </div>

                <div id="reels-section" class="category-section" style="display: none; scroll-margin-top: 50px;">
                    <h2 class="elegant-title">REELS</h2>
                    <div id="reels-wrapper"></div> 
                </div>

                <div id="motion-section" class="category-section" style="display: none; scroll-margin-top: 50px;">
                    <h2 class="elegant-title">MOTION GRAPHICS</h2>
                    <div id="motion-grid" class="video-grid motion"></div>
                </div>
            </div>
        `;

        renderSection('long-form-section', 'long-form-grid', myWork.longForm);
        renderGroupedSection('reels-section', 'reels-wrapper', myWork.reels);
        renderSection('motion-section', 'motion-grid', myWork.motionGraphics);

        // Initialize the scroll observer right after injecting the HTML
        setTimeout(() => {
            initScrollAnimations();
        }, 100);

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
    windowOverlay.classList.remove('active'); 
    
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
        if (event.target === windowOverlay) {
            closeWindow();
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && macWindow.classList.contains('active')) {
        closeWindow();
    }
});

// --- 4. EXPAND/COLLAPSE CARD LOGIC ---
const aboutMeBtn = document.getElementById('aboutMeBtn');
const profileCard = document.querySelector('.profile-card');

if (aboutMeBtn && profileCard) {
    aboutMeBtn.addEventListener('click', function() {
        profileCard.classList.toggle('expanded');
    });
}