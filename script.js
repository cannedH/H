const songs = [
    { title: "Daily Routine 247", src: "music/coffee/Daily Routine 247.flac" },
    { title: "卡班诺的兔子主题曲3", src: "music/coffee/卡班诺的兔子主题曲3.flac" },
    { title: "我们的任务", src: "music/coffee/我们的任务.flac" },
    { title: "Blooming Moon", src: "music/coffee/Blooming Moon.flac" },
    { title: "Constant Moderato Piano Ver.", src: "music/coffee/Constant Moderato Piano Ver.flac" },
    { title: "Constant Moderato", src: "music/coffee/Constant Moderato.flac" },
    { title: "Hello to Halo", src: "music/coffee/Hello to Halo.mp3" },
    { title: "Koi is Love", src: "music/coffee/Koi is Love.mp3" },
    { title: "Luminous Memory", src: "music/coffee/Luminous Memory.mp3" },
    { title: "Midsummer cat", src: "music/coffee/Midsummer cat.flac" },
    { title: "Pixel Time", src: "music/coffee/Pixel Time.mp3" },
    { title: "Sugar story", src: "music/coffee/Sugar story.flac" },
    { title: "Usagi Flap", src: "music/coffee/Usagi Flap.flac" },
    { title: "After School Dessert", src: "music/coffee/After School Dessert.flac" },
    { title: "Connected Sky", src: "music/coffee/Connected Sky.flac" }
];
const index_song = { title: "夜の向日葵", src: "music/index/02. szak - 夜の向日葵.flac" };


const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playlistToggleBtn = document.getElementById('playlistToggleBtn');
const songTitle = document.getElementById('songTitle');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const playlistContainer = document.getElementById('playlist-container');
const playlist = document.getElementById('playlist');
const backgroundImages = document.querySelectorAll('.background-images img');
const avatar = document.getElementById('avatar');
const musicPlayer = document.querySelector('.music-player');
const backgroundMusic = document.getElementById('background-music');
const backgroundbtn = document.getElementById('background-index-btn');
const avatarIndex = document.getElementById('.avatar-index');
const randomImg = document.getElementById("randomImg");
const nextImg = document.getElementById("nextImg");

let imageIndex = Math.floor(Math.random() * 207) + 1; // 生成1到207的随机数
let currentSongIndex = 0;
let currentImageIndex = 0;
let imageInterval;
let isMouseOverBackground = false;


if (document.querySelector('.body-index')) {
    // 只在index.html执行的代码
    backgroundMusic.src = index_song.src;
    backgroundbtn.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });
}

if (document.querySelector('.body-coffee')) {
    // 只在coffee.html执行的代码
    // 加载第一首歌和背景图片
    loadSong(songs[currentSongIndex]);
    nextBackgroundImage();
}

function getRandomImage() {
    let imagePath;
    imageIndex = Math.floor(Math.random() * 207) + 1;
    if (imageIndex <= 67) {
        imagePath = `images/students/image${imageIndex}.png`;
    } else {
        imagePath = `images/students/image${imageIndex}.jpg`;
    }
    return imagePath;
}

// 加载歌曲
function loadSong(song) {
    songTitle.textContent = song.title;
    audioPlayer.src = song.src;
    updatePlaylistHighlight();
}

// 播放/暂停功能
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '暂停';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '播放';
    }
});

// 上一首
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audioPlayer.play();
    playPauseBtn.textContent = '暂停';
});

// 下一首
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audioPlayer.play();
    playPauseBtn.textContent = '暂停';
});

// 播放结束后自动播放下一首
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audioPlayer.play();
});

// 更新进度条
audioPlayer.addEventListener('timeupdate', () => {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

// 拖动进度条
document.querySelector('.progress-container').addEventListener('click', (e) => {
    const progressContainerWidth = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / progressContainerWidth) * duration;
});

// 播放列表点击选择歌曲
playlist.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        currentSongIndex = parseInt(e.target.getAttribute('data-index'));
        loadSong(songs[currentSongIndex]);
        audioPlayer.play();
        playPauseBtn.textContent = '暂停';
    }
});

// 更新播放列表高亮
function updatePlaylistHighlight() {
    const items = playlist.querySelectorAll('li');
    items.forEach(item => item.classList.remove('active'));
    items[currentSongIndex].classList.add('active');
}
// 切换播放列表显示/隐藏
playlistToggleBtn.addEventListener('click', (event) => {
    const playlistContainer = document.getElementById('playlist-container');
    event.stopPropagation(); // 阻止事件冒泡
    if (playlistContainer.style.display === 'none' || playlistContainer.style.display === '') {
        playlistContainer.style.display = 'block'; // 显示播放列表
    } else {
        playlistContainer.style.display = 'none'; // 隐藏播放列表
    }
});


// 格式化时间
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 显示总时长
audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
});

// 背景图片切换
function changeBackgroundImage() {
    //pastImg.src = randomImg.src;
    randomImg.classList.remove('active');
    setTimeout(() => {
        randomImg.src = nextImg.src;
        randomImg.classList.add('active');
    }, 900);

}

// 切换到下一张背景图片
function nextBackgroundImage() {
    nextImg.src = getRandomImage();
    changeBackgroundImage();

}

// 自动切换背景图片
function startBackgroundRotation() {
    imageInterval = setInterval(nextBackgroundImage, 5000); // 每5秒切换一次()
}

startBackgroundRotation();

// 鼠标悬停在背景图片上
document.querySelector('.background-images').addEventListener('mouseover', () => {
    isMouseOverBackground = true;
});

document.querySelector('.background-images').addEventListener('mouseout', () => {
    isMouseOverBackground = false;
});

// 滚轮切换图片
document.addEventListener('wheel', (e) => {
    if (isMouseOverBackground) {
        nextBackgroundImage();
    }
});

// 点击切换图片
document.addEventListener('click', (e) => {
    if (isMouseOverBackground && !e.target.closest('#playlist-container')) {
        nextBackgroundImage();
    }
});



avatar.addEventListener('click', () => {
    if (musicPlayer.style.display === 'none' || musicPlayer.style.display === '') {
        musicPlayer.style.display = 'block'; // 显示音乐控件
    } else {
        musicPlayer.style.display = 'none'; // 隐藏音乐控件
    }
});


