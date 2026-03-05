// PUT YOUR VIDEOS HERE!
// Leave a section empty like [] if you don't want it to show up.
const myWork = {
    longForm: [
        {
            channelName: "Ankur Warikoo",
            avatarUrl: "https://via.placeholder.com/45", // Replace with actual image link
            subCount: "3.2M subscribers",
            youtubeVideoId: "dQw4w9WgXcQ" // The text after ?v= in a YouTube link
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
    motionGraphics: [] // Left empty! So the Motion Graphics section will hide automatically.
};

// --- DO NOT TOUCH THE CODE BELOW (UNLESS YOU ARE FEELING BRAVE) ---

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

    if (videoArray.length > 0) {
        section.style.display = "block"; // Turn it on!
        videoArray.forEach(video => {
            grid.innerHTML += createVideoCard(video);
        });
    }
}

// Build the page
renderSection('long-form-section', 'long-form-grid', myWork.longForm);
renderSection('reels-section', 'reels-grid', myWork.reels);
renderSection('motion-section', 'motion-grid', myWork.motionGraphics);