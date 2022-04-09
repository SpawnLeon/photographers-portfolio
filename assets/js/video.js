const inputEvt = new Event('input');

const viewer = document.querySelector('.viewer');
const playBtn = document.querySelector('[data-js="play-button"]');
const controlPlayBtn = document.querySelector('[data-js="control-play-button"]');
const volumeBtn = document.querySelector('[data-js="volume-button"]');
const fullscreenBtn = document.querySelector('[data-js="fullscreen-button"]');
const progressRange = document.querySelector('[data-js="progress-range"]');
const volumeRange = document.querySelector('[data-js="volume-range"]');

const currentVolume = 0.5;
let progression;

const setRangeBackground = (element, value) => {
  element.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value
  * 100}%, #c4c4c4 ${value * 100}%, #c4c4c4 100%)`;
};

const updateProgress = () => {
  const progress = viewer.currentTime / viewer.duration;
  progressRange.value = progress;
  setRangeBackground(progressRange, progress);
};

const togglePlay = (evt) => {
  evt.preventDefault();
  if (viewer.paused) {
    viewer.play();
    controlPlayBtn.textContent = '❚❚';
    progression = window.setInterval(updateProgress, 200);
  } else {
    viewer.pause();
    controlPlayBtn.textContent = '►';
    clearInterval(progression);
  }
};

const toggleVolume = (evt) => {
  evt.preventDefault();

  if (viewer.muted) {
    viewer.muted = false;
    volumeBtn.classList.remove('muted');
    volumeRange.value = currentVolume;
  } else {
    viewer.muted = true;
    volumeBtn.classList.add('muted');
    volumeRange.value = 0;
  }
  volumeRange.dispatchEvent(inputEvt);
};

const playHandler = (evt) => {
  evt.preventDefault();
  if (viewer.paused) {
    playBtn.style.display = 'block';
  } else {
    playBtn.style.display = 'none';
  }
};

const progressRangeHandler = (evt) => {
  const element = evt.target;
  const { value } = element;
  if (viewer.duration) {
    viewer.currentTime = value * viewer.duration;
  }
  setRangeBackground(element, value);
};

const volumeRangeHandler = (evt) => {
  const { value } = volumeRange;
  viewer.volume = volumeRange.value;
  if (value === '0') {
    volumeBtn.classList.add('muted');
  } else {
    volumeBtn.classList.remove('muted');
  }

  setRangeBackground(volumeRange, value);
};

const fullscreenHandler = () => {
  viewer.requestFullscreen().then();
};

playBtn.addEventListener('click', togglePlay);
controlPlayBtn.addEventListener('click', togglePlay);
viewer.addEventListener('click', togglePlay);
viewer.addEventListener('play', playHandler);

viewer.addEventListener('pause', playHandler);
volumeBtn.addEventListener('click', toggleVolume);
fullscreenBtn.addEventListener('click', fullscreenHandler);
progressRange.addEventListener('input', progressRangeHandler);
volumeRange.addEventListener('input', volumeRangeHandler);
viewer.addEventListener('ended', (evt) => {
  viewer.currentTime = 0;
  progressRange.value = 0;
  progressRange.dispatchEvent(inputEvt);
  playHandler(evt);
  controlPlayBtn.textContent = '►';
});

//

progressRange.dispatchEvent(inputEvt);
volumeRange.dispatchEvent(inputEvt);
