const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-button'); // why can this not be a querySelector with class?
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

//* Play & Pause ----------------------------------- //

function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// On video end, show play button icon

//* Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}
//update progress bar as video play
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// click to seek within the video
function setProgressBar(e) {
  const barClickX = (e.offsetX / this.clientWidth) * 100; // where we're clicking on the progress-range divided by the container length. Then multiplied by 100 so we find the percentage of where we click on the progress-range
  progressBar.style.width = `${barClickX}%`;
  const newCurrentTime = (video.duration / 100) * barClickX;
  video.currentTime = `${newCurrentTime}`;
}

//* Volume Controls --------------------------- //

let lastVolume = 1;
// volume bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volumne = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // change icon depending on volume
  volumeIcon.className = ''; // remove class names
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// Mute / Unmute
function toggleMute() {
  volumeIcon.className = ''; // remove class names
  // if video.volume is not 0, then...
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-off');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    // else if volume is 0, then...
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;

    if (video.volume > 0.7) {
      volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (video.volume < 0.7 && video.volume > 0) {
      volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (video.volume === 0) {
      volumeIcon.classList.add('fas', 'fa-volume-off');
    }
  }
}

//* Change Playback Speed -------------------- //

//* Fullscreen ------------------------------- //

/* Event listeners */
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
video.addEventListener('ended', showPlayIcon);
progressRange.addEventListener('click', setProgressBar);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
