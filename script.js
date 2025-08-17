// Playlist with cover images
const songs = [
  { title: "RUN", artist: "A.R", src: "songs/R.mp3", length: "3:45", cover: "images1/R1.jpg" },
  { title: "Da Da Da", artist: "D.M", src: "songs/D.mp3", length: "4:12", cover: "images1/D1.jpg" },
  { title: "Mansha", artist: "M.S", src: "songs/M.mp3", length: "2:58", cover: "images1/M1.webp" }
];

// Elements
const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const volumeEl = document.getElementById("volume");
const disc = document.getElementById("disc");

let currentSong = 0;
let isPlaying = false;

// Build playlist
songs.forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist} (${song.length})`;
  li.addEventListener("click", () => loadSong(i, true));
  playlistEl.appendChild(li);
});

// Load song
function loadSong(index, autoPlay = false) {
  currentSong = index;
  audio.src = songs[index].src;
  disc.src = songs[index].cover; // update disc image

  // highlight
  [...playlistEl.children].forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });

  if (autoPlay) playSong();
}

// Play & pause
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸ Pause";
  disc.classList.add("spin");
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶ Play";
  disc.classList.remove("spin");
}

// Buttons
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong, true);
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong, true);
});

// Progress
audio.addEventListener("timeupdate", () => {
  progressBar.max = audio.duration || 0;
  progressBar.value = audio.currentTime;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  totalTimeEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

// Volume
volumeEl.addEventListener("input", () => {
  audio.volume = volumeEl.value;
});

// Auto next
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Time format
function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Start with first song
loadSong(currentSong);
