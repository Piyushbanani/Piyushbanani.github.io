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

// --- 2. YOUR VIDEO DATA (MIXED HOSTING) ---
const myWork = {
    longForm: [
        {
            platform: "local", 
            videoLink: "portfolio videos/aevytv_1.mp4", 
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
            platform: "local", 
            videoLink: "portfolio videos/shivanshu_1.mp4", 
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
            avatarUrl: "https://yt3.ggpht.com/vZOk8EXPt-z2D47EcxH7joqFahSmmw_OnmWb5yoL-m8wgzOnp0fuwbMp8i7yuChmuU_v9IOJ=s176-c-k-c0x00ffffff-no-rj-mo",
            subStart: 500,
            subEnd: 964,
            subSuffix: "K",
            videoCount: "544",
            videos: [
                { platform: "local", videoLink: "portfolio videos/aniket_1.mp4" },
                { platform: "local", videoLink: "portfolio videos/aniket_2.mp4" },
                { platform: "local", videoLink: "portfolio videos/aniket_3.mp4" }
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
                { platform: "local", videoLink: "portfolio videos/adarsh_1.mp4" },
                { platform: "local", videoLink: "portfolio videos/adarsh_2.mp4" },
                { platform: "local", videoLink: "portfolio videos/adarsh_3.mp4" }
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
                { platform: "local", videoLink: "portfolio videos/nerdy_1.mp4" },
                { platform: "local", videoLink: "portfolio videos/nerdy_2.mp4" },
                { platform: "local", videoLink: "portfolio videos/nerdy_3.mp4" }
            ]
        }
    ],
    motionGraphics: [
        {
            platform: "local",
            videoLink: "portfolio videos/motion_1.mp4"
        },
        {
            platform: "local",
            videoLink: "portfolio videos/motion_2.mp4"
        }
    ] 
};

// --- CLIENTS DATA ---
const clientsData = [
    {
        name: "Aevytv",
        username: "@aevytv",
        avatar: "https://yt3.ggpht.com/smpvbfd6kga9xo3rTSPe-wZt0VEejfcK9uUcFmZKAkBV8_CJgMBHSBnXn_MHx7_nF8Mul3jJ2Q=s176-c-k-c0x00ffffff-no-rj-mo",
        platform: "YouTube",
        niche: "Entertainment",
        from: "100K",
        to: "1.21M",
        link: "https://www.youtube.com/@aevytv"
    },
    {
        name: "Shivanshu Agrawal",
        username: "@Shivanshu.Agrawal",
        avatar: "https://yt3.googleusercontent.com/XiLMw-52SS9NYuIB7CpUG8A75tahD783323deqfJ5N773h_v28YecrKEadpVQFFNKOPGWlNR4Q=s160-c-k-c0x00ffffff-no-rj",
        platform: "YouTube",
        niche: "Finance",
        from: "500K",
        to: "1.82M",
        link: "https://www.youtube.com/@Shivanshu.Agrawal"
    },
    {
        name: "Shyam Meera Singh",
        username: "@ShyamMeeraSingh1",
        avatar: "https://yt3.googleusercontent.com/1abhPJau58hVgF4BA4sinMwEyJ9XFGQn90XNnN82-3ZAU6aM9Ksco9kVD5HtKXQBWm2UHCIjXg=s160-c-k-c0x00ffffff-no-rj",
        platform: "YouTube",
        niche: "Commentary",
        from: "500K",
        to: "1.69M",
        link: "https://www.youtube.com/@ShyamMeeraSingh1"
    },
    {
        name: "Personal Finance TV",
        username: "@PersonalFinanceTV",
        avatar: "https://yt3.googleusercontent.com/VjEDkL6UnO0qtUgBJ7gq5HKT5opMqryDuKAfmVH-oSh8NNM53_0qmh7bS06j4rFHDYkvO-Flhw=s160-c-k-c0x00ffffff-no-rj",
        platform: "YouTube",
        niche: "Finance",
        from: "0",
        to: "250K",
        link: "https://www.youtube.com/@PersonalFinanceTV"
    },
    {
        name: "Aniket Thakur",
        username: "@anikett.thakurr",
        avatar: "https://yt3.ggpht.com/vZOk8EXPt-z2D47EcxH7joqFahSmmw_OnmWb5yoL-m8wgzOnp0fuwbMp8i7yuChmuU_v9IOJ=s176-c-k-c0x00ffffff-no-rj-mo",
        platform: "Instagram",
        niche: "Lifestyle",
        from: "500K",
        to: "964K",
        link: "https://www.instagram.com/anikett.thakurr/"
    },
    {
        name: "Adarsh Gupta",
        username: "@adarshh.gupta",
        avatar: "https://yt3.googleusercontent.com/buet1DbdJ3gsiDZ6anqVQ8uMy1Y8tL5ZQmjJLTNHuEzgA-kOwLH90lx6jOKuGBUoLVu_u5vENg=s160-c-k-c0x00ffffff-no-rj",
        platform: "Instagram",
        niche: "Lifestyle",
        from: "1M",
        to: "2M",
        link: "https://www.instagram.com/adarshh.gupta/"
    },
    {
        name: "Nerdy Snacking",
        username: "@nerdySnacking",
        avatar: "https://yt3.googleusercontent.com/CizRmSh_ZSi6RSTfYQml0hNSHfLOre4pK9_PA6SQCxSkCSH_yb0o58ajdMlx-WGQb_XvtGAyPQ=s160-c-k-c0x00ffffff-no-rj",
        platform: "YouTube",
        niche: "Food",
        from: "100K",
        to: "500K",
        link: "https://www.youtube.com/@nerdySnacking"
    }
];

// --- FEEDBACKS DATA ---
const feedbacksData = [
    {
        name: "Aevytv",
        username: "@aevytv",
        avatar: "https://yt3.ggpht.com/smpvbfd6kga9xo3rTSPe-wZt0VEejfcK9uUcFmZKAkBV8_CJgMBHSBnXn_MHx7_nF8Mul3jJ2Q=s176-c-k-c0x00ffffff-no-rj-mo",
        rating: 5,
        quote: "Piyush's editing genuinely changed the game for us. Our watch time went up and viewers literally ask in the comments who edits our videos. The cuts are surgical, the pacing is insane.",
        platform: "YouTube",
        link: "https://www.youtube.com/@aevytv"
    },
    {
        name: "Shivanshu Agrawal",
        username: "@Shivanshu.Agrawal",
        avatar: "https://yt3.googleusercontent.com/XiLMw-52SS9NYuIB7CpUG8A75tahD783323deqfJ5N773h_v28YecrKEadpVQFFNKOPGWlNR4Q=s160-c-k-c0x00ffffff-no-rj",
        rating: 5,
        quote: "What sets Piyush apart is that he actually understands finance content. He doesn't just cut clips — he tells the story. Our audience retention numbers are the best they've ever been.",
        platform: "YouTube",
        link: "https://www.youtube.com/@Shivanshu.Agrawal"
    },
    {
        name: "Adarsh Gupta",
        username: "@adarshh.gupta",
        avatar: "https://yt3.googleusercontent.com/buet1DbdJ3gsiDZ6anqVQ8uMy1Y8tL5ZQmjJLTNHuEzgA-kOwLH90lx6jOKuGBUoLVu_u5vENg=s160-c-k-c0x00ffffff-no-rj",
        rating: 5,
        quote: "Fast turnaround, zero revisions needed, and the transitions are so smooth. Feels like he edited a hundred of my reels before he even started. 10/10 would recommend to any creator.",
        platform: "Instagram",
        link: "https://www.instagram.com/adarshh.gupta/"
    },
    {
        name: "Shyam Meera Singh",
        username: "@ShyamMeeraSingh1",
        avatar: "https://yt3.googleusercontent.com/1abhPJau58hVgF4BA4sinMwEyJ9XFGQn90XNnN82-3ZAU6aM9Ksco9kVD5HtKXQBWm2UHCIjXg=s160-c-k-c0x00ffffff-no-rj",
        rating: 5,
        quote: "He takes very complex topics and makes them feel cinematic. The color grading, the sound design — everything feels polished. My subscribers constantly compliment the production quality now.",
        platform: "YouTube",
        link: "https://www.youtube.com/@ShyamMeeraSingh1"
    },
    {
        name: "Aniket Thakur",
        username: "@anikett.thakurr",
        avatar: "https://yt3.ggpht.com/vZOk8EXPt-z2D47EcxH7joqFahSmmw_OnmWb5yoL-m8wgzOnp0fuwbMp8i7yuChmuU_v9IOJ=s176-c-k-c0x00ffffff-no-rj-mo",
        rating: 5,
        quote: "Working with Piyush felt less like hiring an editor and more like having a creative partner. He anticipates what the video needs before I even say it. Absolute gem.",
        platform: "Instagram",
        link: "https://www.instagram.com/anikett.thakurr/"
    },
    {
        name: "Nerdy Snacking",
        username: "@nerdySnacking",
        avatar: "https://yt3.googleusercontent.com/CizRmSh_ZSi6RSTfYQml0hNSHfLOre4pK9_PA6SQCxSkCSH_yb0o58ajdMlx-WGQb_XvtGAyPQ=s160-c-k-c0x00ffffff-no-rj",
        rating: 5,
        quote: "Our shorts started performing 3x better after Piyush took over editing. The hooks he creates in the first 3 seconds are just addictive. Genuinely worth every rupee.",
        platform: "YouTube",
        link: "https://www.youtube.com/@nerdySnacking"
    }
];

// --- YOUTUBE URL PARSER ---
function getEmbedUrl(videoData) {
    if (videoData.platform === "youtube") {
        let cleanId = videoData.videoLink;
        if (cleanId === "cook here" || cleanId === "") return "";
        if (cleanId.includes('youtu.be/')) {
            cleanId = cleanId.split('youtu.be/')[1].split('?')[0];
        } else if (cleanId.includes('watch?v=')) {
            cleanId = cleanId.split('watch?v=')[1].split('&')[0];
        } else if (cleanId.includes('/shorts/')) {
            cleanId = cleanId.split('/shorts/')[1].split('?')[0]; 
        }
        return `https://www.youtube.com/embed/${cleanId}`;
    }
    return "";
}

// --- FLAT CARD BUILDER (Handles Local & YouTube) ---
function createVideoCard(videoData) {
    let mediaHtml = "";

    if (videoData.platform === "youtube") {
        let embedUrl = getEmbedUrl(videoData);
        mediaHtml = embedUrl ? `<iframe src="${embedUrl}" allowfullscreen loading="lazy"></iframe>` : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#888;">Placeholder</div>`;
    } else {
        mediaHtml = `<video src="${videoData.videoLink}" controls controlsList="nodownload" preload="metadata" class="native-video"></video>`;
    }

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
                ${mediaHtml}
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
function renderGroupedSection(sectionId, gridId, dataArray) {
    const section = document.getElementById(sectionId);
    const grid = document.getElementById(gridId);

    if (section && grid && dataArray.length > 0) {
        section.style.display = "block"; 
        let htmlString = "";
        dataArray.forEach((creator) => {
            let videosHtml = "";
            creator.videos.forEach(vid => {
                let mediaHtml = "";
                if (vid.platform === "youtube") {
                    let embedUrl = getEmbedUrl(vid);
                    mediaHtml = embedUrl ? `<iframe src="${embedUrl}" allowfullscreen loading="lazy"></iframe>` : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#888;">Placeholder</div>`;
                } else {
                    mediaHtml = `<video src="${vid.videoLink}" controls controlsList="nodownload" preload="metadata" class="native-video"></video>`;
                }
                videosHtml += `
                    <div class="video-card no-margin">
                        <div class="video-wrapper">
                            ${mediaHtml}
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
let scrollObserver;

function initScrollAnimations() {
    if (scrollObserver) scrollObserver.disconnect();
    
    scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const subCounter = entry.target.querySelector('.sub-count');
                if (subCounter && !subCounter.classList.contains('animated')) {
                    subCounter.classList.add('animated'); 
                    const startVal = parseFloat(subCounter.dataset.start) || 0;
                    const endVal = parseFloat(subCounter.dataset.end) || 0;
                    const suffix = subCounter.dataset.suffix || "";
                    animateValue(subCounter, startVal, endVal, 2500, suffix);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        root: document.getElementById('mac-content'), 
        rootMargin: '0px 0px -40px 0px', 
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

        setTimeout(() => {
            initScrollAnimations();
        }, 100);

    } else if (section === 'clients') {
        windowTitle.innerText = "Clients";

        // Build platform filter tabs HTML
        const clientCardsHTML = clientsData.map((c, i) => `
            <a href="${c.link}" target="_blank" class="client-card slide-animate" data-platform="${c.platform}" style="animation-delay: ${i * 60}ms; text-decoration: none; color: inherit;">
                <div class="cc-top">
                    <img src="${c.avatar}" class="cc-avatar" alt="${c.name}" onerror="this.style.background='var(--border-color)'">
                    <div class="cc-meta">
                        <div class="cc-name">${c.name}</div>
                        <div class="cc-username">${c.username}</div>
                    </div>
                    <span class="cc-platform-badge ${c.platform === 'YouTube' ? 'badge-yt' : 'badge-ig'}">
                        ${c.platform === 'YouTube' ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>` : `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2c1.3-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>`}
                        ${c.platform}
                    </span>
                </div>
                <div class="cc-niche-row">
                    <span class="cc-niche">${c.niche}</span>
                </div>
                <div class="cc-growth">
                    <div class="cc-growth-inner">
                        <div class="cc-growth-col">
                            <div class="cc-growth-label">Before</div>
                            <div class="cc-growth-value from">${c.from}</div>
                        </div>
                        <div class="cc-arrow-wrap">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </div>
                        <div class="cc-growth-col">
                            <div class="cc-growth-label">After</div>
                            <div class="cc-growth-value to">${c.to}</div>
                        </div>
                    </div>
                </div>
            </a>
        `).join('');

        macContent.innerHTML = `
            <style>
                .clients-page { max-width: 680px; margin: 0 auto; padding: 30px 10px 40px; }

                .clients-hero { text-align: center; padding-bottom: 28px; border-bottom: 1px solid var(--border-color); margin-bottom: 28px; }
                .clients-hero-eyebrow { font-size: 11px; letter-spacing: 3px; color: var(--mac-subtext); text-transform: uppercase; margin-bottom: 10px; }
                .clients-hero-title { font-family: "Times New Roman", Times, serif; font-size: 30px; font-weight: normal; letter-spacing: 5px; text-transform: uppercase; margin: 0 0 10px; color: var(--mac-text); }
                .clients-hero-subtitle { font-size: 13px; color: var(--mac-subtext); margin: 0; }
                .clients-hero-subtitle span { color: var(--mac-text); font-weight: 600; }

                .clients-filter { display: flex; gap: 8px; justify-content: center; margin-bottom: 24px; flex-wrap: wrap; }
                .filter-btn { font-size: 12px; font-weight: 600; padding: 6px 16px; border-radius: 20px; border: 1px solid var(--border-color); background: transparent; color: var(--mac-subtext); cursor: pointer; transition: all 0.2s; font-family: inherit; letter-spacing: 0.5px; }
                .filter-btn.active, .filter-btn:hover { background: var(--mac-text); color: var(--mac-bg); border-color: var(--mac-text); }

                .clients-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
                @media (max-width: 480px) { .clients-grid { grid-template-columns: 1fr; } }

                .client-card { background: var(--border-color); border-radius: 18px; padding: 18px; display: flex; flex-direction: column; gap: 12px; transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s; cursor: pointer; }
                .client-card:hover { transform: translateY(-4px) scale(1.01); }
                .client-card.hidden-card { display: none; }

                .cc-top { display: flex; align-items: center; gap: 10px; }
                .cc-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; flex-shrink: 0; background: var(--mac-scrollbar); }
                .cc-meta { flex: 1; min-width: 0; }
                .cc-name { font-weight: 700; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .cc-username { font-size: 11.5px; color: var(--mac-subtext); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .cc-platform-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 10.5px; font-weight: 700; padding: 4px 9px; border-radius: 20px; letter-spacing: 0.3px; flex-shrink: 0; white-space: nowrap; }
                .badge-yt { background: #ff0000; color: #fff; }
                .badge-ig { background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; }

                .cc-niche-row { display: flex; }
                .cc-niche { font-size: 11px; font-weight: 600; padding: 3px 12px; border-radius: 20px; background: var(--card-bg); color: var(--mac-subtext); border: 1px solid var(--mac-scrollbar); letter-spacing: 0.5px; text-transform: uppercase; }

                .cc-growth { background: var(--card-bg); border-radius: 12px; padding: 12px 16px; }
                .cc-growth-inner { display: flex; align-items: center; justify-content: space-between; }
                .cc-growth-col { text-align: center; }
                .cc-growth-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--mac-subtext); margin-bottom: 4px; }
                .cc-growth-value { font-size: 18px; font-weight: 800; letter-spacing: -0.5px; }
                .cc-growth-value.from { color: var(--mac-subtext); }
                .cc-growth-value.to { color: #27c93f; }
                .cc-arrow-wrap { color: #27c93f; opacity: 0.8; }
            </style>

            <div class="clients-page">
                <div class="clients-hero slide-animate">
                    <p class="clients-hero-eyebrow">Trusted by creators</p>
                    <h2 class="clients-hero-title">My Clients</h2>
                    <p class="clients-hero-subtitle"><span>7 Creators</span> &nbsp;·&nbsp; <span>9M+</span> Combined Reach</p>
                </div>

                <div class="clients-filter slide-animate">
                    <button class="filter-btn active" onclick="filterClients('all', this)">All</button>
                    <button class="filter-btn" onclick="filterClients('YouTube', this)">YouTube</button>
                    <button class="filter-btn" onclick="filterClients('Instagram', this)">Instagram</button>
                </div>

                <div class="clients-grid" id="clients-grid">
                    ${clientCardsHTML}
                </div>
            </div>
        `;

        setTimeout(() => initScrollAnimations(), 100);

    } else if (section === 'feedbacks') {
        windowTitle.innerText = "Feedbacks";

        const starsHTML = (n) => Array(n).fill('★').join('') + Array(5 - n).fill('☆').join('');

        const feedbackCardsHTML = feedbacksData.map((f, i) => `
            <div class="fb-card slide-animate" style="animation-delay: ${i * 80}ms;">
                <div class="fb-stars">${starsHTML(f.rating)}</div>
                <p class="fb-quote">"${f.quote}"</p>
                <div class="fb-author">
                    <a href="${f.link}" target="_blank" class="fb-author-link">
                        <img src="${f.avatar}" class="fb-avatar" alt="${f.name}" onerror="this.style.background='var(--border-color)'">
                    </a>
                    <div class="fb-author-info">
                        <a href="${f.link}" target="_blank" class="fb-author-link">
                            <span class="fb-name">${f.name}</span>
                        </a>
                        <span class="fb-username">${f.username}</span>
                    </div>
                    <span class="fb-platform-badge ${f.platform === 'YouTube' ? 'badge-yt' : 'badge-ig'}">
                        ${f.platform === 'YouTube' ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>` : `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2c1.3-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>`}
                    </span>
                </div>
            </div>
        `).join('');

        macContent.innerHTML = `
            <style>
                .feedbacks-page { max-width: 640px; margin: 0 auto; padding: 30px 10px 40px; }

                .fb-hero { text-align: center; padding-bottom: 28px; border-bottom: 1px solid var(--border-color); margin-bottom: 28px; }
                .fb-hero-eyebrow { font-size: 11px; letter-spacing: 3px; color: var(--mac-subtext); text-transform: uppercase; margin-bottom: 10px; }
                .fb-hero-title { font-family: "Times New Roman", Times, serif; font-size: 30px; font-weight: normal; letter-spacing: 5px; text-transform: uppercase; margin: 0 0 10px; }
                .fb-hero-avg { display: inline-flex; align-items: center; gap: 8px; background: var(--border-color); padding: 8px 18px; border-radius: 30px; margin-top: 8px; }
                .fb-hero-avg-stars { font-size: 18px; color: #FFAF00; letter-spacing: 2px; }
                .fb-hero-avg-text { font-size: 13px; font-weight: 600; color: var(--mac-text); }
                .fb-hero-avg-sub { font-size: 12px; color: var(--mac-subtext); }

                .fb-list { display: flex; flex-direction: column; gap: 16px; }

                .fb-card { background: var(--border-color); border-radius: 18px; padding: 22px; display: flex; flex-direction: column; gap: 14px; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; }
                .fb-card:hover { transform: translateY(-3px); }
                .fb-card::before { content: '"'; position: absolute; top: -10px; right: 20px; font-family: "Times New Roman", serif; font-size: 120px; color: var(--mac-scrollbar); opacity: 0.4; line-height: 1; pointer-events: none; }

                .fb-stars { font-size: 16px; color: #FFAF00; letter-spacing: 3px; }

                .fb-quote { font-size: 14.5px; line-height: 1.7; color: var(--mac-text); margin: 0; font-style: italic; position: relative; z-index: 1; }

                .fb-author { display: flex; align-items: center; gap: 10px; padding-top: 4px; border-top: 1px solid var(--mac-scrollbar); }
                .fb-author-link { text-decoration: none; color: inherit; }
                .fb-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; background: var(--mac-scrollbar); }
                .fb-author-info { flex: 1; display: flex; flex-direction: column; }
                .fb-name { font-weight: 700; font-size: 13.5px; color: var(--mac-text); }
                .fb-name:hover { opacity: 0.8; }
                .fb-username { font-size: 11.5px; color: var(--mac-subtext); }
                .fb-platform-badge { display: inline-flex; align-items: center; gap: 3px; font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 20px; }
                .badge-yt { background: #ff0000; color: #fff; }
                .badge-ig { background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; }
            </style>

            <div class="feedbacks-page">
                <div class="fb-hero slide-animate">
                    <p class="fb-hero-eyebrow">What creators say</p>
                    <h2 class="fb-hero-title">Feedbacks</h2>
                    <div class="fb-hero-avg">
                        <span class="fb-hero-avg-stars">★★★★★</span>
                        <span class="fb-hero-avg-text">5.0</span>
                        <span class="fb-hero-avg-sub">from ${feedbacksData.length} clients</span>
                    </div>
                </div>

                <div class="fb-list">
                    ${feedbackCardsHTML}
                </div>
            </div>
        `;

        setTimeout(() => initScrollAnimations(), 100);
    }
}

// --- CLIENTS FILTER FUNCTION ---
function filterClients(platform, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    document.querySelectorAll('.client-card').forEach(card => {
        const cardPlatform = card.dataset.platform;
        if (platform === 'all' || cardPlatform === platform) {
            card.classList.remove('hidden-card');
        } else {
            card.classList.add('hidden-card');
        }
    });
}

// --- MAC BUTTON FUNCTIONS ---
function closeWindow() {
    macWindow.classList.remove('active');
    windowOverlay.classList.remove('active'); 
    
    const videos = document.querySelectorAll('.native-video');
    videos.forEach(video => {
        if (!video.paused) {
            video.pause();
        }
    });
    
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