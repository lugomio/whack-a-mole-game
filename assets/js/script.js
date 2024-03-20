// ELEMENTS

const moles = document.querySelectorAll(".mole");
const toggleBtn = document.querySelector(".togglePlay");
const resultBox = document.querySelector(".points");

// FUNCTIONS

let points = 0;
let running = false;
let game;
let lastMole;

function play() {
    game = setInterval(() => {
        let mole = randomMole(moles);
        let hasBait = randomInt(0, 4) === 0 ? true : false;

        if (hasBait) {
            let baitMole = randomMole(moles);
            baitMole.classList.add("bait");
            setTimeout(() => {
                baitMole.classList.remove("active", "bait")
                mole.classList.add("active");
                setTimeout(() => mole.classList.remove("active", "bait"), randomInt(400, 500));
            }, 300);
        } else {
            mole.classList.add("active");
            setTimeout(() => mole.classList.remove("active", "bait"), randomInt(400, 700));
        }

        lastMole = mole;
    }, randomInt(800, 1200));
}

function randomMole(moles) {
    let i = Math.floor(Math.random() * moles.length);
    let mole = moles[i];

    if (mole === lastMole) {
        return randomMole(moles);
    }

    lastMole = mole;
    return mole;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function togglePlay() {
    if (running) {
        toggleBtn.textContent = "Play";
        resultBox.textContent = "0";
        points = 0;
        clearInterval(game);
        running = false;
    } else {
        toggleBtn.textContent = "Reset";
        running = true;
        play();
    }
}

// EVENTS

moles.forEach(mole => mole.addEventListener('click', (e) => {
    points++;
    resultBox.textContent = points;
}));

toggleBtn.addEventListener('click', togglePlay);