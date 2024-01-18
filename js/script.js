import adventuresData from "./adventures.js";
//
// NOTIFICATION
//
document.addEventListener("DOMContentLoaded", function () {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});
//
const storyOverlay = document.querySelector(".story-overlay");
const storyBg = document.querySelector(".story-bg");
let defaultOverlayOpacity = 1;
//
//SET LEVEL (get it from localstorage -so like a savefile - or display 0)
let score = localStorage.getItem("level") || 0;
let [seconds, minutes] = [0, 0];
let displayLevel = document.getElementById("displayLevel");
displayLevel.innerHTML = "Level" + " " + score;
// OTHER LEVEL BASED
let userStoryId = "w";
let userBranch = 0;
let userAdventureNumber = 1;

//
//
const timerWrapper = document.querySelector(".timer-wrapper");
let displayMinutes = document.getElementById("displayMinutes");
let displaySeconds = document.getElementById("displaySeconds");
let timer = null;
//
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const pauseBtn = document.getElementById("pause-btn");
const exploreBtn = document.getElementById("explore-btn");
const deleteBtn = document.getElementById("delete-btn");
const stopwatchBtn = document.getElementById("stopwatch-btn");
//
const addendumPage = document.querySelector(".addendum-page");
const addendumText = document.getElementById("addendum-text");

let currentAdventureId = userStoryId + score + userBranch + userAdventureNumber;

//
// FUNCTIONS
//
//
function stopwatch() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;

    defaultOverlayOpacity = defaultOverlayOpacity - 0.01;
    storyOverlay.style.opacity = defaultOverlayOpacity;
    console.log(defaultOverlayOpacity);
    console.log(storyOverlay.style.opacity);
    if (minutes == 25) {
      score++;
      displayLevel.innerHTML = "Level" + " " + score;
      localStorage.setItem("level", score);
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          new Notification("Excellent", {
            body: "You did it!",
          });
        }
      });
    }
  }
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;

  displaySeconds.innerHTML = s;
  displayMinutes.innerHTML = m;
}

function watchStart() {
  if (timer !== null) {
    clearInterval(timer);
  }
  timer = setInterval(stopwatch, 1000);
}

function watchStop() {
  clearInterval(timer);
  console.log(adventuresData.woodlands);
}

function watchReset() {
  [seconds, minutes] = [0, 0];
  clearInterval(timer);
}

function changeScore() {
  score = localStorage.getItem("level");
  displayLevel.innerHTML = "Level" + " " + score;
  displayMinutes.innerHTML = "00";
  displaySeconds.innerHTML = "00";
}

function resetAll() {
  localStorage.clear();
  score = 0;
  displayLevel.innerHTML = "Level" + " " + score;
  displayMinutes.innerHTML = "00";
  displaySeconds.innerHTML = "00";
  defaultOverlayOpacity = 1;
  storyOverlay.style.opacity = defaultOverlayOpacity;
  watchReset();
}

function setAdventureId() {
  currentAdventureId = userStoryId + score + userBranch + userAdventureNumber;
  console.log(currentAdventureId);
}

function updateAdventure() {
  //Background
  let currentBackground =
    adventuresData.woodlands.adventuresInside[currentAdventureId]
      .adventureimgPortrait;
  console.log(currentBackground);
  storyBg.style.backgroundImage = 'url("' + currentBackground + '")';
  //text
  let currentText =
    adventuresData.woodlands.adventuresInside[currentAdventureId].adventureText;
  addendumText.innerHTML = currentText;
}

//
//
// BUTTONS
//
//

playBtn.addEventListener("click", function () {
  setAdventureId();
  updateAdventure();

  watchStart();
});
pauseBtn.addEventListener("click", function () {
  watchStop();
});
resetBtn.addEventListener("click", function () {
  watchReset();
  changeScore();
  console.log(seconds, minutes);
});
exploreBtn.addEventListener("click", function () {
  watchReset();
  changeScore();
  timerWrapper.classList.add("hidden");
  storyOverlay.classList.add("hidden");
  addendumPage.classList.remove("hidden");
});
deleteBtn.addEventListener("click", function () {
  resetAll();
});
stopwatchBtn.addEventListener("click", function () {
  timerWrapper.classList.remove("hidden");
  defaultOverlayOpacity = 1;
  storyOverlay.style.opacity = defaultOverlayOpacity;
  storyOverlay.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  addendumPage.classList.add("hidden");
});
