const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play-btn");
const playNextt = document.querySelector(".play-next");
const playPrevv = document.querySelector(".play-prev");
const imgMain = document.querySelector(".img-sized");
const mainImg = document.querySelector(".main-img");
const trackName = document.querySelector(".track-name");
const trackTime = document.querySelector(".progress");
const trackFasttime = document.querySelector(".progress-container");
const range = document.querySelector(".range");
const volumeSetings = document.querySelector(".volume-setings");
const realTime = document.querySelector(".realTime");
const fullTime = document.querySelector(".fullTime");
const minVolume = document.querySelector(".min-Volume");
const maxVolume = document.querySelector(".max-Volume");

let isPlay = false;

// песня по умолчанию
let playNum = 0;

// название песен
const songs = ["Deutschland", "Pussy", "Du hast", "Amerika"];

// init0
function loadSong(song) {
  trackName.innerHTML = song;
  audio.src = `audio/${song}.mp3`;
  imgMain.src = `img/poster${playNum + 1}.jpg`;
  mainImg.src = `img/poster${playNum + 1}.jpg`;
}

loadSong(songs[playNum]);

//  Start and Stop - player!
function playAudio() {
  if (isPlay == false) {
    isPlay = true;
    playBtn.classList.toggle("button-pause");
    audio.play();
  } else {
    if (isPlay == true) {
      isPlay = false;
      playBtn.classList.toggle("button-pause");
      audio.pause();
    }
  }
}
// Next and Back - play!
function playNext() {
  playNum++;
  playBtn.classList.add("button-pause");
  if (playNum > songs.length - 1) {
    playNum = 0;
  }
  loadSong(songs[playNum]);
  audio.play();
}

function playPrev() {
  playNum--;
  playBtn.classList.add("button-pause");
  if (playNum < 0) {
    playNum = songs.length - 1;
  }

  loadSong(songs[playNum]);
  audio.play();
}

playBtn.addEventListener("click", playAudio);
playNextt.addEventListener("click", playNext);
playPrevv.addEventListener("click", playPrev);

// progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  trackTime.style.width = `${progressPercent}%`;
}

audio.addEventListener("timeupdate", updateProgress);

// set progress
function setProgress(e) {
  const width = this.clientWidth;
  const checkX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (checkX / width) * duration;
}

trackFasttime.addEventListener("click", setProgress);

// nextAuto
audio.addEventListener("ended", playNext);

// VolumePower//
const volumeLvl = {
  volume: document.querySelector(".track-volume"),
  level: document.querySelector(".level-audio"),
};

volumeLvl.volume.addEventListener("input", volumPower);
function volumPower() {
  const point = volumeLvl.volume.value / 100;
  audio.volume = point;
  volumeLvl.level.style.width = "40%";
  volumeLvl.level.style.width = `${volumeLvl.volume.value}%`;
}

// volumeButton(icon)
function minVol() {
  audio.volume = 0;
  volumeLvl.volume.value = 0;
  volumeLvl.level.style.width = 0;
}
minVolume.addEventListener("click", minVol);

// max
function maxVol() {
  audio.volume = 1;
  volumeLvl.volume.value = 100;
  volumeLvl.level.style.width = "100%";
}
maxVolume.addEventListener("click", maxVol);

// preLoad procent
window.addEventListener("load", () => {
  load();
});

function load() {
  volumeLvl.level.style.width = "40%";
  audio.volume = 0.4;
}

// TIME

function allTIme() {
  realTime.textContent = audio.currentTime;
}

audio.addEventListener("timeupdate", function (e) {
  const time = e.target.currentTime;
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  const duration = e.target.duration;
  let sec1 = Math.floor(duration % 60);
  if (sec1 < 10) {
    sec1 = "0" + sec1;
  }
  let value = Math.floor(duration / 60) + ":" + sec1;
  if (isNaN(audio.duration)) {
    value = "--:--";
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  realTime.textContent = min + ":" + sec;
  fullTime.textContent = value;
});
