const SONGS = [
  { name: "ZEZE", url: "https://autism.lat/tnUKP.mp3" },
  { name: "Share My World", url: "https://autism.lat/VKyaE.mp3" },
  { name: "Text", url: "https://autism.lat/tTe9S.mp3" },
  { name: "my feelings", url:"https://autism.lat/A9I9Y.mp3"},
];

const BUTTONS = [
  {
    label: "OGU",
    sublabel: "@mq",
    url: "https://oguser.com/mq",
    iconColor: "#ffffff",
    icon: `https://i.imgur.gg/Qyz8ad3-ogu_favicon.png`
  },
  {
    label: "Roblox",
    sublabel: "@to8",
    url: "https://www.roblox.com/users/1508864/profile",
    iconColor: "#ffffff",
    icon: `https://i.imgur.gg/KcNGpYf-e854eb7b2951ac03edba9a2681032bba.png`
  },
];



const audio = document.getElementById('audio-player');
let songIndex = 0;
let playing = false;
function getRandomIndex(currentIndex) {
  if (SONGS.length <= 1) return 0;
  let next;
  do {
    next = Math.floor(Math.random() * SONGS.length);
  } while (next === currentIndex);
  return next;
}

const row = document.getElementById('buttons-row');
BUTTONS.forEach(btn => {
  const a = document.createElement('a');
  a.href = btn.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.className = 'link-btn';

  let iconHTML = '';

  if (btn.icon.trim().startsWith('<')) {
    iconHTML = `
      <div class="btn-icon" style="color:${btn.iconColor}">
        ${btn.icon}
      </div>
    `;
  } else {
    iconHTML = `
      <div class="btn-icon">
        <img src="${btn.icon}" alt="${btn.label}" />
      </div>
    `;
  }

  a.innerHTML = `
    ${iconHTML}
    <div class="btn-text">
      <span class="btn-label">${btn.label}</span>
      <span class="btn-sublabel">${btn.sublabel}</span>
    </div>
    <div class="btn-arrow">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="7" y1="17" x2="17" y2="7"/>
        <polyline points="7 7 17 7 17 17"/>
      </svg>
    </div>
  `;

  row.appendChild(a);
});

function enterSite() {
  const enter = document.getElementById('enter-screen');
  enter.classList.add('fade-out');
  setTimeout(() => enter.style.display = 'none', 800);
  document.getElementById('card-wrapper').classList.add('visible');
  startMusic();
}

function startMusic() {
  songIndex = Math.floor(Math.random() * SONGS.length);
  loadSong(songIndex);
  audio.play().catch(() => {});
  playing = true;
  updateBars();
}

function loadSong(i) {
  audio.src = SONGS[i].url;
  document.getElementById('song-name').textContent = SONGS[i].name;
}

audio.addEventListener('ended', () => {
  songIndex = getRandomIndex(songIndex);
  loadSong(songIndex);
  audio.play();
});

function toggleMusic() {
  if (playing) {
    audio.pause();
    playing = false;
  } else {
    songIndex = getRandomIndex(songIndex);
    loadSong(songIndex);
    audio.play().catch(() => {});
    playing = true;
  }
  updateBars();
}

function updateBars() {
  document.querySelectorAll('.bar').forEach(b => {
    b.classList.toggle('paused', !playing);
  });
}

const card = document.getElementById('card');
card.addEventListener('mousemove', e => {
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  card.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
});
card.addEventListener('mouseleave', () => {
  card.style.transform = '';
});
