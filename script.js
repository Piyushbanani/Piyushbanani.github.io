// MAGIC TRICK 1: The Theme Switcher (WITH MEMORY)
const toggleSwitch = document.getElementById('theme-toggle');

// 1. Check the browser's memory to see if they picked a theme before
const currentTheme = localStorage.getItem('theme');

// 2. If the memory says "dark", apply it immediately before they even see the page
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true; // Visually flip the toggle switch to match
}

// 3. Listen for clicks on the switch
toggleSwitch.addEventListener('change', function() {
    if (this.checked) {
        // Turn on dark mode and save it to memory
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        // Turn off dark mode and save it to memory
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// MAGIC TRICK 2: The Floating Mac Window
const macWindow = document.getElementById('mac-animation');
const macContent = document.getElementById('mac-content');
const windowTitle = document.getElementById('window-title');

function openWindow(section) {
    // 1. Make the window pop up
    macWindow.classList.add('active');

    // 2. Change what's inside based on what button you clicked
    if (section === 'works') {
        windowTitle.innerText = "Works";
        macContent.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
                <h2 style="font-family: 'Times New Roman', serif; letter-spacing: 4px;">LONG FORM</h2>
                <p>Your video grid will go here!</p>
            </div>
        `;
    } else if (section === 'clients') {
        windowTitle.innerText = "Clients";
        macContent.innerHTML = `<h2>My Clients</h2><p>List of clients goes here.</p>`;
    } else if (section === 'feedbacks') {
        windowTitle.innerText = "Feedbacks";
        macContent.innerHTML = `<h2>Client Feedbacks</h2><p>Awesome reviews go here.</p>`;
    }
}

// 3. Make the red dot close the window
function closeWindow() {
    macWindow.classList.remove('active');
    
    // Optional: Clear the content out after it shrinks back down
    setTimeout(() => {
        macContent.innerHTML = '';
    }, 600);
}
// MAGIC TRICK 3: Better ways to close the window

// 1. Close when pressing the "Escape" key on the keyboard
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && macWindow.classList.contains('active')) {
        closeWindow();
    }
});

// 2. Close when clicking anywhere outside the Mac window
document.addEventListener('click', function(event) {
    // Check if the window is currently open
    if (macWindow.classList.contains('active')) {
        
        // Did they click inside the Mac window?
        const clickedInsideWindow = macWindow.contains(event.target);
        
        // Did they click one of the bottom buttons (Works/Clients/Feedbacks)?
        const clickedAButton = event.target.closest('.button');

        // If they clicked OUTSIDE the window, AND they didn't just click a button to open it... close it!
        if (!clickedInsideWindow && !clickedAButton) {
            closeWindow();
        }
    }
});