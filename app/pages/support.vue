<script setup lang="ts">
import { playlist } from "@@/server/utils/audio";
import { ref, onMounted } from "vue";

const snowCount = 50;

const musicPromptVisible = ref(true);

const currentIndex = ref(0);
const isPlaying = ref(false);
const audioPlayer = ref<HTMLAudioElement | null>(null);
const musicVisible = ref(false);
const musicVolume = 0.15;
const musicCanPlay = ref(true);

// --- Snowflakes ---
function snowFlakes() {
    const snowContainer = document.getElementById("snow-container");
    if (!snowContainer) return;
    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.textContent = "❄";
        const depth = Math.floor(Math.random() * 3) + 1;
        snowflake.dataset.depth = depth.toString();
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.fontSize = `${Math.random() * 12 + 10}px`;
        const duration = (depth === 1 ? 10 : depth === 2 ? 18 : 25) + Math.random() * 3;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        snowContainer.appendChild(snowflake);
    }
}

// --- Audio player controls ---
function loadCurrentSong(showController = true) {
    if (!audioPlayer.value) return;
    const currentSong = playlist[currentIndex.value];
    if (!currentSong) return;
    audioPlayer.value.src = "/audio/" + currentSong.fileName;
    audioPlayer.value.volume = musicVolume;
    audioPlayer.value.load();

    const currentSongText = document.getElementById("current-song");
    if (currentSongText) {
        currentSongText.textContent = `${currentSong.author} - ${currentSong.title}`;
    }

    if (showController) {
        musicVisible.value = true;
    }
}

function fadeVolume(targetVolume: number, duration = 200, onComplete?: () => void) {
    if (!audioPlayer.value) return;
    const audio = audioPlayer.value;
    const steps = 10;
    const stepTime = duration / steps;
    let step = 0;
    const startVolume = audio.volume;

    const fadeInterval = setInterval(() => {
        step++;
        const newVolume = startVolume + (targetVolume - startVolume) * (step / steps);
        audio.volume = Math.min(Math.max(newVolume, 0), musicVolume);
        if (step >= steps) {
            clearInterval(fadeInterval);
            if (onComplete) onComplete();
        }
    }, stepTime);
}

function play() {
    if (!audioPlayer.value) return;
    const audio = audioPlayer.value;
    audio.volume = 0;
    audio.play();
    isPlaying.value = true;
    musicVisible.value = true;

    fadeVolume(musicVolume, 200, () => {
        setTimeout(() => {
            musicVisible.value = false;
        }, 3000);
    });
}

function pause() {
    if (!audioPlayer.value) return;
    fadeVolume(0, 200, () => {
        audioPlayer.value?.pause();
        isPlaying.value = false;
        musicVisible.value = false;
    });
}

function pauseStop() {
    if (isPlaying.value) {
        pause();
    } else {
        if (!audioPlayer.value?.src) {
            loadCurrentSong();
        }
        play();
    }
}

function next() {
    currentIndex.value = (currentIndex.value + 1) % playlist.length;
    loadCurrentSong();
    play();
}

function prev() {
    currentIndex.value = (currentIndex.value - 1 + playlist.length) % playlist.length;
    loadCurrentSong();
    play();
}

function onSongEnded() {
    next();
}

// --- Autoplay test and control ---
async function testAutoplay() {
    if (!audioPlayer.value) return;
    const audio = audioPlayer.value;
    audio.muted = true;
    audio.volume = 0;
    loadCurrentSong(false);

    try {
        await audio.play();
        musicCanPlay.value = true;

        audio.muted = false;
        fadeVolume(musicVolume, 200, () => {
            setTimeout(() => {
                musicVisible.value = false;
            }, 3000);
        });
        isPlaying.value = true;
        musicVisible.value = true;
    } catch {
        musicCanPlay.value = false;
        audio.muted = false;
        audio.pause();
    }
}

async function startMusic() {
    currentIndex.value = Math.floor(Math.random() * playlist.length);
    loadCurrentSong();
    try {
        await audioPlayer.value?.play();
        isPlaying.value = true;
        musicCanPlay.value = true;
        musicVisible.value = true;

        setTimeout(() => {
            if (isPlaying.value) {
                musicVisible.value = false;
            }
        }, 3000);

    } catch {
        musicCanPlay.value = false;
    }
}

function rejectMusic() {
    localStorage.setItem("musicRejected", "true");
    musicPromptVisible.value = false;
}

// --- Initialization ---
onMounted(() => {
    snowFlakes();
    testAutoplay();

    const rejected = localStorage.getItem("musicRejected");
    if (rejected === "true") {
        musicPromptVisible.value = false;
    }
});
</script>

<template>
    <div>
        <div id="snow-container"></div>
        <div v-if="musicPromptVisible && !musicCanPlay" class="overlay"></div>
        <div v-if="musicPromptVisible && !musicCanPlay" class="music-prompt">
            <h2>Enjoy the Full Experience</h2>
            <p>
                This website feels way better with music on.<br>
                Want to start it now? (You can turn it off anytime)<br><br>
                If you prefer not to see this popup every time, you can enable autoplay permissions for this site in
                your
                browser settings.
            </p>
            <div class="buttons">
                <button @click="startMusic">Yes, play music</button>
                <button @click="rejectMusic">Leave me alone</button>
            </div>
        </div>

        <main>
            <section class="music-wrapper" role="region" aria-label="Music player controls">
                <div class="music-handle" aria-hidden="true"></div>
                <audio ref="audioPlayer" @ended="onSongEnded" aria-live="polite"></audio>
                <section class="music" :class="{ visible: musicVisible }">
                    <span class="now-playing">
                        Now Playing:
                        <span id="current-song" class="current-song" aria-live="polite"></span>
                    </span>
                    <ul class="controlller" role="list">
                        <li role="button" tabindex="0" @click="prev" @keydown.enter="prev" aria-label="Previous">
                            <span class="fa fa-backward" aria-hidden="true"></span>
                        </li>
                        <li v-if="isPlaying" role="button" tabindex="0" @click="pauseStop" @keydown.enter="pauseStop"
                            aria-label="Pause">
                            <span class="fa fa-pause" aria-hidden="true"></span>
                        </li>
                        <li v-if="!isPlaying" role="button" tabindex="0" @click="pauseStop" @keydown.enter="pauseStop"
                            aria-label="Play">
                            <span class="fa fa-play" aria-hidden="true"></span>
                        </li>
                        <li role="button" tabindex="0" @click="next" @keydown.enter="next" aria-label="Next">
                            <span class="fa fa-forward" aria-hidden="true"></span>
                        </li>
                    </ul>
                </section>
            </section>

            <section class="navigation">
                <NuxtLink to="/" class="nav-link">← Back to Home</NuxtLink>
            </section>

            <section class="info-card">
                <div class="top">
                    <img src="/images/pfp.png" class="pfp" />
                    <div class="info">
                        <p class="name">Support yorunoken</p>
                        <p class="role">Buy Me a Coffee ☕</p>
                    </div>
                </div>
                <div class="bottom">
                    <p class="desc">Hey there! If you enjoy my work, content, or projects, consider supporting me.
                        Your support helps me continue creating and improving the things I'm passionate about!</p>
                    <p class="desc">Every coffee counts and is greatly appreciated! 🦆</p>
                </div>
            </section>

            <section class="support-section">
                <h2>Support My Work</h2>
                <p>
                    If you'd like to support my programming projects, content creation, or just help me buy some coffee
                    to fuel my coding sessions, you can do so through Buy Me a Coffee!
                </p>

                <div class="support-card main-support">
                    <h3>Buy Me a Coffee</h3>
                    <p>Support me directly and help fuel my projects!</p>
                    <a href="https://buymeacoffee.com/yorunoken" target="_blank" rel="noopener noreferrer"
                        class="support-button">
                        Support on Buy Me a Coffee
                    </a>
                </div>


                <div class="thank-you">
                    <h3>Thank You!</h3>
                    <p>
                        Whether you choose to support financially or just by using and sharing my projects,
                        I'm grateful for your interest in my work. Every bit of support, feedback, and
                        encouragement means the world to me!
                    </p>
                </div>
            </section>

            <p class="footer">Made with <span>LOVE</span> and attention by yorunoken</p>
        </main>
    </div>
</template>

<style lang="css">
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: "Segoe UI", sans-serif;
    background: linear-gradient(135deg, #2f2f2f, #eee);
    background-size: 400% 400%;
    animation: gradientShift 30s ease infinite;
    color: #222;
    position: relative;
    overflow-y: auto;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.footer {
    color: #f0f0f5;
    margin-top: 3rem;
}

.footer span {
    color: #d43f3f;
    font-weight: bold;
}

main {
    margin-top: 5rem;
    margin-bottom: 4rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
}

.snowflake {
    position: fixed;
    top: -30px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    user-select: none;
    pointer-events: none;
    animation-name: snowFall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    will-change: transform;
}

.snowflake[data-depth="1"] {
    opacity: 0.9;
    z-index: 0;
}

.snowflake[data-depth="2"] {
    opacity: 0.6;
    z-index: -1;
    filter: blur(0.5px);
}

.snowflake[data-depth="3"] {
    opacity: 0.4;
    z-index: -2;
    filter: blur(1px);
}

@keyframes snowFall {
    0% {
        transform: translateX(0) translateY(-30px);
        opacity: 1;
    }

    50% {
        transform: translateX(15px) translateY(50vh);
    }

    100% {
        transform: translateX(0) translateY(100vh);
        opacity: 0.6;
    }
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9998;
}

.music-prompt {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fafafa;
    padding: 2.5rem 3rem;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
    z-index: 9999;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 550px;
    width: 90%;
    color: #333;
    animation: fadeIn 0.35s ease forwards;
}

.music-prompt h2 {
    margin-bottom: 1.2rem;
    font-weight: 700;
    font-size: 1.5rem;
}

.music-prompt p {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    color: #444;
    white-space: pre-line;
}

.buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.buttons button {
    flex: none;
    width: 120px;
    padding: 0.3rem 0.5rem;
    font-size: 1.05rem;
    border-radius: 12px;
    cursor: pointer;
    border: none;
    background-color: #d43f3f;
    color: white;
    transition: background 0.3s ease;
}

.buttons button:hover {
    background-color: #b23434;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -55%);
    }

    to {
        opacity: 1;
        transform: translate(-50%, -50%);
    }
}

.music-wrapper {
    position: fixed;
    top: 0;
    width: 400px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
    z-index: 1000;
    background: transparent;
    cursor: default;
    transition: border-color 0.3s ease;
}

.music-wrapper:hover .music {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.music-handle {
    position: fixed;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    z-index: 1001;
    pointer-events: auto;
}

.music-handle:hover {
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
}

.music {
    width: 95%;
    background: rgba(207, 207, 207, 0.7);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);

    border-radius: 8px;
    padding: 1.2rem 1.8rem;
    color: #222;
    font-family: "Segoe UI", sans-serif;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    z-index: 1;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.music {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-100%);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.music.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.music .now-playing {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.6rem;
    text-align: center;
    color: #333;
}

.music .current-song {
    font-weight: bold;
    color: #333;
    margin-left: 0.3rem;
}

.music .controlller {
    display: flex;
    gap: 2.5rem;
    list-style: none;
    padding: 0;
    margin: 0;
}

.music .controlller li {
    cursor: pointer;
    font-size: 2.4rem;
    color: #666;
    transition: color 0.3s ease;
    outline-offset: 3px;
}

.music .controlller li:hover {
    color: #d43f3f;
    border-radius: 4px;
}

.navigation {
    width: 90%;
    max-width: 800px;
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
}

.nav-link {
    color: #f0f0f5;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    transition: color 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.nav-link:hover {
    color: #d43f3f;
}

.info-card,
.support-section {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);

    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    font-family: "Segoe UI", sans-serif;

    position: relative;
    z-index: 1;
}

.info-card {
    border-radius: 10px;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    color: #111;
}

.top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.pfp {
    width: 80px;
    height: 80px;
    border-radius: 1rem;
    object-fit: cover;
    border: 2px solid #111;
}

.info .name {
    color: #111;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
}

.info .role {
    color: #444;
    font-size: 1rem;
    margin: 0;
}

.bottom .desc {
    font-size: 1rem;
    margin: 1rem 0;
    line-height: 1.4;
    color: #222;
}

.support-section {
    border-radius: 12px;
    padding: 1.8rem 2.4rem;
    width: 90%;
    max-width: 800px;
    margin-top: 2.5rem;
    color: #111;
    font-family: "Segoe UI", sans-serif;
}

.support-section h2 {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
    font-weight: 700;
    color: #d43f3f;
}

.support-section>p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
}

.support-card {
    margin-bottom: 1.5rem;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.support-card.main-support {
    text-align: center;
}

.support-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.support-card h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
    font-size: 1.2rem;
}

.support-card p {
    margin: 0 0 1rem 0;
    color: #555;
    line-height: 1.4;
}

.support-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #d43f3f;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.support-button:hover {
    background-color: #b23434;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.thank-you {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    border-left: 4px solid #d43f3f;
}

.thank-you h3 {
    margin: 0 0 0.5rem 0;
    color: #d43f3f;
}

.thank-you p {
    margin: 0;
    color: #555;
    line-height: 1.4;
}

@media (max-width: 768px) {

    html,
    body {
        font-size: 14px;
        background-size: 300% 300%;
    }

    main {
        margin-top: 3rem;
        margin-bottom: 2rem;
        padding: 0 1rem;
    }

    .info-card,
    .support-section {
        width: 100%;
        max-width: 100%;
        padding: 1.5rem 1rem;
        margin: 1rem 0;
        box-sizing: border-box;
    }

    .music-wrapper {
        height: 0px;
    }

    .music-handle {
        display: none;
    }

    .music {
        position: fixed;
        bottom: 0px;
        left: 0;
        width: 100vw;
        max-width: 100%;
        border-radius: 0;
        padding: 1rem 1.5rem;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
        background: rgba(250, 250, 250, 0.95);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
    }

    .music .now-playing {
        font-size: 1rem;
        margin-bottom: 0;
        color: #d43f3f;
        font-weight: 700;
        flex: 1;
        text-align: left;
        padding-left: 0.5rem;
    }

    .music .controlller {
        gap: 1.5rem;
    }

    .music .controlller li {
        font-size: 1.8rem;
    }

    .footer {
        margin-top: 0rem;
        font-size: 0.9rem;
    }
}
</style>
