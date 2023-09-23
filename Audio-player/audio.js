const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play-btn");
const playNextt = document.querySelector(".play-next");
const playPrevv = document.querySelector(".play-prev");
const imgMain = document.querySelector(".img-sized");
const mainImg = document.querySelector(".main-img");
const trackName = document.querySelector(".track-name");
const trackTime = document.querySelector(".progress");
const trackFasttime = document.querySelector(".progress-container");

let isPlay = false;

// песня по умолчанию
let playNum = 0;

// название песен
const songs = [
  "Город Под Подошвой",
  "Организация",
  "Где Нас Нет",
  "Всего Лишь Писатель",
];

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
    audio.currentTime = 0;
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
