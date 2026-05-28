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
        quote: "He takes very complex topics and makes them feel cinematic. The sound design, the pacing — everything feels polished. My subscribers constantly compliment the production quality now.",
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


// ─── SHARED EDITOR THEME CSS (injected into every window) ──────────────────
const EDITOR_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  /* ── slide-in animation ── */
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes playheadScan {
    0%   { left: -6%; }
    100% { left: 106%; }
  }
  @keyframes diamondPulse {
    0%, 100% { transform: rotate(45deg) scale(1);   opacity: 0.5; }
    50%       { transform: rotate(45deg) scale(1.4); opacity: 1;   }
  }
  @keyframes cutFlash {
    0%, 100% { opacity: 0.18; }
    50%       { opacity: 0.55; }
  }

  /* ── window body resets ── */
  .editor-window {
    font-family: 'DM Sans', sans-serif;
    color: var(--mac-text);
    background: var(--mac-bg);
    min-height: 100%;
    position: relative;
    overflow-x: hidden;
  }

  /* ── compact mini-timeline nav strip (Canvas bg handles the real animation) ── */
  .tl-strip {
    position: sticky;
    top: 0;
    z-index: 20;
    background: rgba(var(--mac-bg-raw, 12,12,14), 0.88);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
    padding: 0;
    margin-bottom: 32px;
  }
  /* Thin decorative multi-track bar at top of strip */
  .tl-track {
    height: 8px;
    background: transparent;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0;
  }
  .tl-track-seg {
    height: 100%;
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .tl-track-seg::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 35%;
    background: inherit;
    opacity: 0.6;
    animation: clipSlide var(--spd, 3s) ease-in-out infinite alternate;
    border-radius: 2px;
  }
  @keyframes clipSlide {
    0%   { left: 5%;  width: 30%; opacity: 0.5; }
    40%  { left: 20%; width: 45%; opacity: 0.8; }
    70%  { left: 35%; width: 25%; opacity: 0.6; }
    100% { left: 55%; width: 38%; opacity: 0.75; }
  }
  /* nav tabs row */
  .tl-nav {
    display: flex;
    gap: 4px;
    padding: 6px 16px;
    background: var(--mac-bg);
  }
  .tl-nav-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 4px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--mac-subtext);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .tl-nav-btn:hover, .tl-nav-btn.active {
    background: var(--border-color);
    color: var(--mac-text);
    border-color: rgba(255,175,0,0.3);
  }
  .tl-nav-dot {
    width: 6px; height: 6px;
    background: #FFAF00;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .tl-nav-btn:hover .tl-nav-dot,
  .tl-nav-btn.active .tl-nav-dot { opacity: 1; }

  /* ── section heading ── */
  .section-heading {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 40px 0 22px;
    animation: fadeUp 0.5s ease both;
  }
  .section-heading-bar {
    width: 3px;
    height: 28px;
    background: #FFAF00;
    border-radius: 2px;
    flex-shrink: 0;
    box-shadow: 0 0 10px rgba(255,175,0,0.5);
  }
  .section-heading-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--mac-subtext);
    flex: 1;
  }
  /* animated cut marks (\\\\) */
  .section-heading-cuts {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .cut-mark {
    width: 1.5px;
    height: 18px;
    background: var(--mac-subtext);
    transform: skewX(-20deg);
    opacity: 0.2;
    animation: cutFlash 2s ease-in-out infinite;
  }
  .cut-mark:nth-child(2) { animation-delay: 0.3s; }
  .cut-mark:nth-child(3) { animation-delay: 0.6s; }

  /* ── creator card info ── */
  .creator-info { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .creator-avatar { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; background: var(--border-color); flex-shrink: 0; }
  .creator-details { display: flex; flex-direction: column; }
  .creator-name-link { text-decoration: none; color: inherit; transition: opacity 0.2s; }
  .creator-name-link:hover { opacity: 0.75; }
  .creator-name-row { display: flex; align-items: center; gap: 5px; font-weight: 600; font-size: 14.5px; }
  .creator-username { font-size: 12.5px; color: var(--mac-subtext); margin-top: 2px; }
  .verified-tick { color: #1DA1F2; font-size: 12px; }

  /* ── badge shared ── */
  .badge-yt { background: #ff0000; color: #fff; }
  .badge-ig { background: linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); color: #fff; }
  .platform-badge {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 10px; font-weight: 700; padding: 3px 8px;
    border-radius: 4px; letter-spacing: 0.3px; flex-shrink: 0;
  }

  /* ── slide-animate ── */
  .slide-animate {
    opacity: 0;
    transform: translateX(-24px);
    transition: opacity 0.5s ease, transform 0.7s cubic-bezier(0.175,0.885,0.32,1.275);
  }
  .slide-animate.visible { opacity: 1; transform: translateX(0); }

  /* ── floating bg shape (decorative) ── */
  .bg-shape {
    position: fixed;
    pointer-events: none;
    z-index: 0;
    border-radius: 50%;
    filter: blur(80px);
    animation: orbFloat2 18s ease-in-out infinite alternate;
  }
  @keyframes orbFloat2 {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(20px,30px) scale(1.1); }
  }
`;

// ─── SVG ICONS ──────────────────────────────────────────────────────────────
const YT_SVG  = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>`;
const IG_SVG  = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.2c1.3-.1 1.6-.1 4.8-.1zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>`;

function platformBadge(platform) {
    return `<span class="platform-badge ${platform === 'YouTube' ? 'badge-yt' : 'badge-ig'}">${platform === 'YouTube' ? YT_SVG : IG_SVG} ${platform}</span>`;
}

function sectionHeading(label) {
    return `
      <div class="section-heading slide-animate">
        <div class="section-heading-bar"></div>
        <span class="section-heading-text">${label}</span>
        <div class="section-heading-cuts">
          <div class="cut-mark"></div>
          <div class="cut-mark"></div>
          <div class="cut-mark"></div>
        </div>
      </div>`;
}

function timelineStrip(navLinks) {
    const navHTML = navLinks.map((l, i) =>
        `<a href="${l.href}" class="tl-nav-btn${i === 0 ? ' active' : ''}" onclick="this.closest('.tl-strip').querySelectorAll('.tl-nav-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');">
          <div class="tl-nav-dot"></div>${l.label}
        </a>`
    ).join('');

    return `
      <div class="tl-strip">
        <div class="tl-track">
          <div class="tl-track-seg" style="background:#FF6EB4; --spd:2.8s;"></div>
          <div class="tl-track-seg" style="background:#6EB4FF; --spd:3.5s; animation-delay:-1.1s;"></div>
          <div class="tl-track-seg" style="background:#FFD166; --spd:4.2s; animation-delay:-0.6s;"></div>
          <div class="tl-track-seg" style="background:#FF6EB4; --spd:2.3s; animation-delay:-2s;"></div>
          <div class="tl-track-seg" style="background:#6EB4FF; --spd:5.0s; animation-delay:-1.8s;"></div>
        </div>
        <div class="tl-nav">${navHTML}</div>
      </div>`;
}

// ─── 3. THE FLOATING MAC WINDOW LOGIC ───────────────────────────────────────
const macWindow = document.getElementById('mac-animation');
const windowOverlay = document.getElementById('window-overlay');
const macContent = document.getElementById('mac-content');
const windowTitle = document.getElementById('window-title');

function openWindow(section) {
    macWindow.classList.add('active');
    windowOverlay.classList.add('active');
    macContent.style.scrollBehavior = 'smooth';

    // ── WORKS ────────────────────────────────────────────────────────────────
    if (section === 'works') {
        windowTitle.innerText = "Works";

        macContent.innerHTML = `
          <style>
            ${EDITOR_STYLES}
            .works-inner { max-width: 820px; margin: 0 auto; padding: 0 20px 60px; }
            /* video cards */
            .video-card { margin-bottom: 36px; }
            .video-card.no-margin { margin-bottom: 0; }
            .video-wrapper { width:100%; border-radius:10px; overflow:hidden; background:#000; position:relative; }
            .long-form .video-wrapper { aspect-ratio: 16/9; }
            .native-video, .video-wrapper iframe { position:absolute; top:0; left:0; width:100%; height:100%; border:none; display:block; }
            .native-video { object-fit:cover; }
            .reels-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
            .reels-grid .video-wrapper { aspect-ratio:9/16; }
            .motion { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
            .motion .video-wrapper { aspect-ratio:9/16; }
            @media(max-width:600px){
              .reels-grid,.motion { grid-template-columns:1fr; gap:20px; }
              .reels-grid .video-wrapper,.motion .video-wrapper { max-width:280px; margin:0 auto; }
            }
          </style>

          <div class="editor-window">
            ${timelineStrip([
              { href: '#long-form-section', label: 'Long Form' },
              { href: '#reels-section',     label: 'Reels' },
              { href: '#motion-section',    label: 'Motion' },
            ])}
            <div class="works-inner">
              <div id="long-form-section" class="category-section" style="display:none; scroll-margin-top:60px;">
                ${sectionHeading('Long Form')}
                <div id="long-form-grid" class="video-grid long-form"></div>
              </div>
              <div id="reels-section" class="category-section" style="display:none; scroll-margin-top:60px;">
                ${sectionHeading('Reels')}
                <div id="reels-wrapper"></div>
              </div>
              <div id="motion-section" class="category-section" style="display:none; scroll-margin-top:60px;">
                ${sectionHeading('Motion Graphics')}
                <div id="motion-grid" class="video-grid motion"></div>
              </div>
            </div>
          </div>`;

        renderSection('long-form-section', 'long-form-grid', myWork.longForm);
        renderGroupedSection('reels-section', 'reels-wrapper', myWork.reels);
        renderSection('motion-section', 'motion-grid', myWork.motionGraphics);
        setTimeout(() => initScrollAnimations(), 100);

    // ── CLIENTS ──────────────────────────────────────────────────────────────
    } else if (section === 'clients') {
        windowTitle.innerText = "Clients";

        const clientCardsHTML = clientsData.map((c, i) => `
          <a href="${c.link}" target="_blank"
             class="cc-card slide-animate"
             data-platform="${c.platform}"
             style="animation-delay:${i * 55}ms; text-decoration:none; color:inherit;">
            <div class="cc-frame-dot"></div>
            <div class="cc-inner">
              <img src="${c.avatar}" class="cc-avatar"
                   alt="${c.name}" onerror="this.style.background='var(--border-color)'">
              <div class="cc-body">
                <div class="cc-name-row">
                  <span class="cc-name">${c.name}</span>
                  <span class="verified-tick" style="font-size:11px;">✔</span>
                </div>
                <div class="cc-username">${c.username}</div>
              </div>
              <div class="cc-right">
                ${platformBadge(c.platform)}
                <span class="cc-niche">${c.niche}</span>
              </div>
            </div>
          </a>`).join('');

        macContent.innerHTML = `
          <style>
            ${EDITOR_STYLES}
            .clients-inner { max-width: 700px; margin: 0 auto; padding: 0 20px 60px; }

            /* hero */
            .cl-hero { text-align:center; padding: 28px 0 32px; }
            .cl-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:var(--mac-subtext); margin-bottom:10px; }
            .cl-title {
              font-family:'Playfair Display',serif;
              font-size:34px; font-weight:400; font-style:italic;
              letter-spacing:0.02em; margin:0 0 6px;
              color:var(--mac-text);
            }
            .cl-subtitle { font-size:12px; color:var(--mac-subtext); }
            .cl-subtitle b { color:var(--mac-text); font-weight:600; }

            /* filter */
            .cl-filter { display:flex; gap:6px; justify-content:center; margin-bottom:24px; flex-wrap:wrap; }
            .filter-btn {
              font-family:'DM Sans',sans-serif;
              font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase;
              padding:5px 16px; border-radius:4px; border:1px solid var(--border-color);
              background:transparent; color:var(--mac-subtext); cursor:pointer; transition:all 0.2s;
            }
            .filter-btn.active, .filter-btn:hover {
              background:var(--mac-text); color:var(--mac-bg); border-color:var(--mac-text);
            }

            /* grid */
            .cc-list { display:flex; flex-direction:column; gap:8px; }
            .cc-card {
              position:relative;
              background:var(--border-color);
              border-radius:10px;
              padding:14px 16px;
              border:1px solid transparent;
              transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                          border-color 0.25s, box-shadow 0.25s;
              overflow:hidden;
            }
            .cc-card:hover {
              transform:translateY(-2px) translateX(3px);
              border-color:rgba(255,175,0,0.35);
              box-shadow:0 4px 20px rgba(255,175,0,0.08);
            }
            /* animated left edge accent */
            .cc-frame-dot {
              position:absolute; left:0; top:0; bottom:0; width:3px;
              background:rgba(255,175,0,0);
              border-radius:0 2px 2px 0;
              transition:background 0.25s;
            }
            .cc-card:hover .cc-frame-dot { background:#FFAF00; box-shadow:0 0 8px rgba(255,175,0,0.6); }
            .cc-card.hidden-card { display:none; }

            .cc-inner { display:flex; align-items:center; gap:13px; }
            .cc-avatar { width:42px; height:42px; border-radius:50%; object-fit:cover; flex-shrink:0; background:var(--mac-scrollbar); }
            .cc-body { flex:1; min-width:0; }
            .cc-name-row { display:flex; align-items:center; gap:5px; }
            .cc-name { font-weight:600; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
            .cc-username { font-size:11.5px; color:var(--mac-subtext); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
            .cc-right { display:flex; flex-direction:column; align-items:flex-end; gap:5px; flex-shrink:0; }
            .cc-niche {
              font-size:10px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase;
              color:var(--mac-subtext); padding:2px 8px; border-radius:3px;
              border:1px solid var(--mac-scrollbar); background:var(--mac-bg);
            }
          </style>

          <div class="editor-window">
            ${timelineStrip([])}
            <div class="clients-inner">
              <div class="cl-hero slide-animate">
                <p class="cl-eyebrow">People I've worked with</p>
                <h2 class="cl-title">Clients</h2>
                <p class="cl-subtitle"><b>7 Creators</b> &nbsp;·&nbsp; <b>9M+</b> Combined Reach</p>
              </div>
              <div class="cl-filter slide-animate">
                <button class="filter-btn active" onclick="filterClients('all',this)">All</button>
                <button class="filter-btn" onclick="filterClients('YouTube',this)">YouTube</button>
                <button class="filter-btn" onclick="filterClients('Instagram',this)">Instagram</button>
              </div>
              <div class="cc-list" id="clients-grid">${clientCardsHTML}</div>
            </div>
          </div>`;

        setTimeout(() => initScrollAnimations(), 100);

    // ── FEEDBACKS ─────────────────────────────────────────────────────────────
    } else if (section === 'feedbacks') {
        windowTitle.innerText = "Feedbacks";

        const starsHTML = (n) => `<span style="color:#FFAF00; letter-spacing:2px;">${'★'.repeat(n)}${'☆'.repeat(5-n)}</span>`;

        const fbCardsHTML = feedbacksData.map((f, i) => `
          <div class="fb-card slide-animate" style="animation-delay:${i * 70}ms;">
            <div class="fb-top">
              ${starsHTML(f.rating)}
              ${platformBadge(f.platform)}
            </div>
            <p class="fb-quote">${f.quote}</p>
            <div class="fb-author">
              <a href="${f.link}" target="_blank" style="text-decoration:none; flex-shrink:0;">
                <img src="${f.avatar}" class="fb-avatar" alt="${f.name}"
                     onerror="this.style.background='var(--border-color)'">
              </a>
              <div class="fb-info">
                <a href="${f.link}" target="_blank" class="fb-name">${f.name}</a>
                <span class="fb-username">${f.username}</span>
              </div>
            </div>
          </div>`).join('');

        macContent.innerHTML = `
          <style>
            ${EDITOR_STYLES}
            .fb-inner { max-width: 640px; margin: 0 auto; padding: 0 20px 60px; }

            /* hero */
            .fb-hero { text-align:center; padding:28px 0 32px; }
            .fb-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:var(--mac-subtext); margin-bottom:10px; }
            .fb-title {
              font-family:'Playfair Display',serif;
              font-size:34px; font-weight:400; font-style:italic;
              letter-spacing:0.02em; margin:0 0 12px;
            }
            /* overall rating pill */
            .fb-rating-pill {
              display:inline-flex; align-items:center; gap:10px;
              background:var(--border-color); padding:8px 20px;
              border-radius:6px; border:1px solid rgba(255,175,0,0.2);
            }
            .fb-rating-num { font-size:22px; font-weight:700; color:var(--mac-text); line-height:1; }
            .fb-rating-stars { font-size:14px; }
            .fb-rating-sub { font-size:11px; color:var(--mac-subtext); }

            /* cards */
            .fb-list { display:flex; flex-direction:column; gap:12px; }
            .fb-card {
              background:var(--border-color);
              border-radius:10px;
              padding:20px 22px;
              border:1px solid transparent;
              display:flex; flex-direction:column; gap:14px;
              position:relative; overflow:hidden;
              transition: border-color 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
            }
            .fb-card:hover {
              transform:translateY(-2px);
              border-color:rgba(255,175,0,0.25);
              box-shadow:0 6px 24px rgba(255,175,0,0.06);
            }
            /* giant background quote mark */
            .fb-card::after {
              content: '\u201C';
              position:absolute; top:-14px; right:16px;
              font-family:'Playfair Display',serif;
              font-size:110px; line-height:1;
              color:var(--mac-scrollbar); opacity:0.35;
              pointer-events:none;
            }
            .fb-top { display:flex; align-items:center; justify-content:space-between; }
            .fb-quote {
              font-size:14px; line-height:1.75;
              color:var(--mac-text); margin:0;
              font-style:italic; position:relative; z-index:1;
            }
            .fb-author { display:flex; align-items:center; gap:11px; padding-top:6px; border-top:1px solid var(--mac-scrollbar); }
            .fb-avatar { width:36px; height:36px; border-radius:50%; object-fit:cover; background:var(--mac-scrollbar); display:block; }
            .fb-info { display:flex; flex-direction:column; }
            .fb-name { font-weight:600; font-size:13px; color:var(--mac-text); text-decoration:none; transition:opacity 0.2s; }
            .fb-name:hover { opacity:0.7; }
            .fb-username { font-size:11px; color:var(--mac-subtext); margin-top:1px; }
          </style>

          <div class="editor-window">
            ${timelineStrip([])}
            <div class="fb-inner">
              <div class="fb-hero slide-animate">
                <p class="fb-eyebrow">What creators say</p>
                <h2 class="fb-title">Feedbacks</h2>
                <div class="fb-rating-pill">
                  <span class="fb-rating-num">5.0</span>
                  <div>
                    <div class="fb-rating-stars">${starsHTML(5)}</div>
                    <div class="fb-rating-sub">from ${feedbacksData.length} clients</div>
                  </div>
                </div>
              </div>
              <div class="fb-list">${fbCardsHTML}</div>
            </div>
          </div>`;

        setTimeout(() => initScrollAnimations(), 100);
    }
}

// --- CLIENTS FILTER FUNCTION ---
function filterClients(platform, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    document.querySelectorAll('.cc-card').forEach(card => {
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