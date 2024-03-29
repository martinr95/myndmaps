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
let targetMinutes = 25;
let targetSeconds = 60;
let seconds = 0;
let minutes = 0;
let displayLevel = document.getElementById("displayLevel");
displayLevel.innerHTML = "Level" + " " + score;
// OTHER LEVEL BASED
//let testSwitch = document.querySelector(".switch");
let userTitle = localStorage.getItem("userStoryTitle") || "woodlands";
console.log(userTitle);
let userStoryTitle = userTitle;
let userStoryId = localStorage.getItem("userStoryId") || "w";
console.log(userStoryId);
let userBranch = 0;
let userAdventureNumber = 1;

//
//
const timerWrapper = document.querySelector(".timer-wrapper");

let displayMinutes = document.getElementById("displayMinutes");
let displaySeconds = document.getElementById("displaySeconds");
let displayMinutes2 = document.getElementById("displayMinutes2");
let displaySeconds2 = document.getElementById("displaySeconds2");
let timer = null;
//
const playBtn = document.getElementById("play-btn");
const resetBtn = document.getElementById("reset-btn");
const pauseBtn = document.getElementById("pause-btn");
const exploreBtn = document.getElementById("explore-btn");
const deleteBtn = document.getElementById("delete-btn");
const stopwatchBtn = document.getElementById("stopwatch-btn");
//
const playscreen = document.querySelector(".playscreen");
const addendumPage = document.querySelector(".addendum-page");
const addendumText = document.getElementById("addendum-text");

let currentAdventureId = userStoryId + score + userBranch + userAdventureNumber;

//
// FUNCTIONS
//
//
var switches = document.querySelectorAll('.switch input[type="checkbox"]');

// Add an event listener to each switch
switches.forEach(function (switchElement) {
  switchElement.addEventListener("change", function () {
    // This function is called whenever a switch is flipped

    // The 'this' keyword refers to the checkbox that triggered the event
    if (this.checked) {
      console.log(
        "Test mode is On, target seconds are now 04 and target minutes are 2"
      );
      targetSeconds = 4;
      targetMinutes = 2;
    } else {
      console.log("Test mode is OFF. Target seconds: 60, Target minutes 25");
      targetSeconds = 60;
      targetMinutes = 25;
    }
  });
});

function stopwatch() {
  seconds++;
  localStorage.setItem("seconds", seconds);
  localStorage.setItem("minutes", minutes);
  seconds = localStorage.getItem("seconds");
  minutes = localStorage.getItem("minutes");
  if (seconds == targetSeconds) {
    seconds = 0;
    minutes++;

    defaultOverlayOpacity = defaultOverlayOpacity - 0.01;
    storyOverlay.style.opacity = defaultOverlayOpacity;
    /*
    console.log(defaultOverlayOpacity);
    console.log(storyOverlay.style.opacity);*/
    if (minutes == targetMinutes) {
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
  displaySeconds2.innerHTML = s;
  displayMinutes2.innerHTML = m;
}

function watchStart() {
  if (timer !== null) {
    clearInterval(timer);
  }
  if (localStorage.getItem("seconds") && localStorage.getItem("minutes")) {
    seconds = localStorage.getItem("seconds");
    minutes = localStorage.getItem("minutes");
  } else {
    seconds = 0;
    minutes = 0;
  }

  timer = setInterval(stopwatch, 1000);
}

function watchStop() {
  clearInterval(timer);
  //console.log(adventuresData.woodlands);
}

function watchReset() {
  [seconds, minutes] = [0, 0];
  localStorage.setItem("seconds", seconds);
  localStorage.setItem("minutes", minutes);
  clearInterval(timer);
}

function changeScore() {
  score = localStorage.getItem("level");
  displayLevel.innerHTML = "Level" + " " + score;
  displayMinutes.innerHTML = "00";
  displaySeconds.innerHTML = "00";
  displayMinutes2.innerHTML = "00";
  displaySeconds2.innerHTML = "00";
}

function resetAll() {
  localStorage.clear();
  score = 0;

  displayLevel.innerHTML = "Level" + " " + score;
  displayMinutes.innerHTML = "00";
  displaySeconds.innerHTML = "00";
  displayMinutes2.innerHTML = "00";
  displaySeconds2.innerHTML = "00";
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
  // console.log(adventuresData[userStoryTitle]);
  let currentBackground =
    adventuresData[userStoryTitle].adventuresInside[currentAdventureId]
      .adventureimgPortrait;
  console.log(currentBackground);
  storyBg.style.backgroundImage = 'url("' + currentBackground + '")';
  //text
  let currentText =
    adventuresData[userStoryTitle].adventuresInside[currentAdventureId]
      .adventureText;
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
  playscreen.classList.remove("hidden");
});
pauseBtn.addEventListener("click", function () {
  watchStop();
});
resetBtn.addEventListener("click", function () {
  watchReset();
  changeScore();
  // console.log(seconds, minutes);
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

playscreen.addEventListener("click", function () {
  playscreen.classList.add("hidden");
});
