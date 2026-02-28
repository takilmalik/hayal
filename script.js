let level = localStorage.getItem("level") ? parseInt(localStorage.getItem("level")) : 1;
let xp = localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0;

const levelDisplay = document.getElementById("level");
const xpDisplay = document.getElementById("xp");
const progress = document.getElementById("progress");
const button = document.getElementById("gainXp");

function updateUI() {
    levelDisplay.textContent = level;
    xpDisplay.textContent = xp;
    progress.style.width = xp + "%";
}

button.addEventListener("click", () => {
    xp += 10;

    if (xp >= 100) {
        xp = 0;
        level++;
    }

    localStorage.setItem("level", level);
    localStorage.setItem("xp", xp);

    updateUI();
});

updateUI();