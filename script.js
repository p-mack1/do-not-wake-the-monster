const message = document.getElementById("message");
const game = document.querySelector(".game");
const meterFill = document.getElementById("meterFill");
const wakeText = document.getElementById("wakeText");
const room = document.getElementById("room");
const monster = document.getElementById("monster");
const sleepText = document.getElementById("sleepText");
const key = document.getElementById("key");
const door = document.getElementById("door");

const keyStatus = document.getElementById("keyStatus");
const hideStatus = document.getElementById("hideStatus");

const sneakBtn = document.getElementById("sneakBtn");
const hideBtn = document.getElementById("hideBtn");
const keyBtn = document.getElementById("keyBtn");
const doorBtn = document.getElementById("doorBtn");
const pokeBtn = document.getElementById("pokeBtn");
const dropCoinBtn = document.getElementById("dropCoinBtn");
const quietBtn = document.getElementById("quietBtn");
const restartBtn = document.getElementById("restartBtn");

let wakeLevel = 0;
let hasKey = false;
let isHidden = false;
let gameOver = false;

function updateWakeMeter() {
    if (wakeLevel > 100) {
        wakeLevel = 100;
    }

    meterFill.style.width = wakeLevel + "%";
    wakeText.textContent = wakeLevel + "%";

    updateMonsterMood();

    if (wakeLevel >= 100) {
        wakeMonster();
    }
}

function increaseWake(amount) {
    if (gameOver) {
        return;
    }

    wakeLevel += amount;
    updateWakeMeter();
}

function decreaseWake(amount) {
    if (gameOver) {
        return;
    }

    wakeLevel = Math.max(0, wakeLevel - amount);
    updateWakeMeter();
}

function updateMonsterMood() {
    monster.classList.remove("restless", "angry", "almost-awake");
    room.classList.toggle("snoring", wakeLevel < 40);

    if (wakeLevel >= 90) {
        monster.classList.add("almost-awake");
        sleepText.textContent = "...!";
    } else if (wakeLevel>= 70) {
        monster.classList.add("angry");
        sleepText.textContent = "grrr...";
    } else if (wakeLevel >= 40) {
        monster.classList.add("restless");
        sleepText.textContent = "z...?";
    } else {
        sleepText.textContent = "Z z z";
    }
}

sneakBtn.addEventListener("click", function() {
    if (gameOver) {
        return;
    }

    isHidden = false;

    hideStatus.textContent = "HIDDEN: NO";

    message.textContent = "You creep across the floor...";

    increaseWake(12);

    if (Math.random() < 0.25) {
        message.textContent = "A floorboard creaks! The monster stirs.";
        increaseWake(10);
    }
});

hideBtn.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    isHidden = true;
    hideStatus.textContent = "HIDDEN: YES";
    message.textContent = "You hide behind the curtain. Stay quiet!";

    increaseWake(5);
});

keyBtn.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    if (hasKey) {
        message.textContent = "You already have the key.";
        return;
    }

    hasKey = true;
    keyStatus.textContent = "KEY: FOUND";
    key.classList.add("collected");

    if (isHidden) {
        message.textContent = "You reach out from hiding and quietly grab the key.";
        increaseWake(10);
    } else {
        message.textContent = "You grab the key, but the monster hears you!";
        increaseWake(25);
    }
});

doorBtn.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    if (!hasKey) {
        message.textContent = "The door is locked. You need the key!";
        increaseWake(15);
        return;
    }

    winGame();
});

pokeBtn.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    message.textContent = "WHY WOULD YOU DO THAT?!";
    increaseWake(100);
});

dropCoinBtn.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    message.textContent = "The coin clatters on the floor!";
    increaseWake(8);
});

quietBtn.addEventListener("click", function () {
    if (gameOver) {
        return;
    }

    message.textContent = "You take a slow, silent breath.";
    decreaseWake(10);
});

function wakeMonster() {
    if (gameOver) {
        return;
    }

    gameOver = true;

    message.textContent = "YOU WOKE THE MONSTER!";
    sleepText.textContent = "AWAKE!";
    monster.classList.add("awake");

    disableGameButtons();
}

function winGame() {
    gameOver = true;

    message.textContent = "YOU ESCAPED WITHOUT WAKING THE MONSTER!";
    door.classList.add("open-door");
    game.classList.add("victory");

    disableGameButtons();
}

function disableGameButtons() {
    sneakBtn.disabled = true;
    hideBtn.disabled = true;
    keyBtn.disabled = true;
    doorBtn.disabled = true;
    pokeBtn.disabled = true;
    dropCoinBtn.disabled = true;
    quietBtn.disabled = true;
}

restartBtn.addEventListener("click", function () {
    location.reload();
});