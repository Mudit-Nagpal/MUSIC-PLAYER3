const songs = [
    {
        title: "Jhoome Jo Pathan",
        artist: "Vishal-Shekhar",
        src: "Jhoome Jo Pathaan - Pathaan 320 Kbps.mp3",
        cover: "jhoome jo pathan poster.jpg",
    },
    {
        title: "Mera Dholna 3.0",
        artist: "Amaal Mallik, Sonu Nigam, Sameer, Pritam",
        src: "Mere Dholna 3.0 - Bhool Bhulaiyaa 3 320 Kbps.mp3",
        cover: "mera dholna 3.0 poster.jpg",
    },
    {
        title: "Pushpa-Pushpa",
        artist: "Nakash Aziz, Deepak, Devi Sri Prasad and Chandrabose",
        src: "Pushpa Pushpa - Pushpa 2 The Rule 320 Kbps.mp3",
        cover: "Pushpa_2 poster.jpg",
    },
    {
        title: "Wavyy",
        artist: "Karan Aujla",
        src: "Wavy - Karan Aujla 320 Kbps.mp3",
        cover: "wavy poster.jpeg",
    },
    {
        title: "Water",
        artist: "Diljeet Dosanjh",
        src: "Water - Diljit Dosanjh.mp3",
        cover: "water poster.jpeg",
    },
    {
        title: "Tera Naa",
        artist: "Deep",
        src: "Tera Naa(KoshalWorld.Com).mp3",
        cover: "tera naa poster.jpg",
    },
    {
        title: "Sayian jii",
        artist: "Neha Kakkar,Yoyo Honey Singh",
        src: "Saiyaan Ji - Yo Yo Honey Singh 320 Kbps.mp3",
        cover: "saiyanji.jpeg",
    },
    {
        title: "Kitne They Khwaab Dekhe",
        artist: "Amaal Mallik, Armaan Malik, Shreya Ghoshal",
        src: "Kitne-The-Khwab-Dekhe.mp3",
        cover: "Kitne-The-Khwab-Dekhe.jpeg",
    },
    {
             title: "Dev Nagri",
             artist: "Aniket Rautri",
             src: "Dev Nagri (PenduJatt.Com.Se).mp3",
             cover: "dev nagri.jpeg",
    },
];
const audio = document.querySelector(".audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
let songIndex = 0;
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
}
function playSong() {
    audio.play();
    playBtn.innerHTML = "⏸️";
    cover.classList.add("play");
}
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = "▶️";
    cover.classList.remove("play");
}
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);
    if (durationMinutes && durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`; }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
}
);
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
);
audio.addEventListener("ended", nextSong);
loadSong(songs[songIndex]);