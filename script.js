((function() {

            function preloadImg(containerId, imgUrl) {

                var cont = $('#' + containerId);
                var i = new Image();
                i.onload = function () {
                    cont.append(this);
                    cont.fadeIn('slow');
                };
                i.src = imgUrl;
            }

            function preloadAudio(containerId, audioUrl) {

                var cont = $('#' + containerId);
                var i = new Audio();
                i.onload = function () {
                    cont.append(this);
                    cont.fadeIn('slow');
                };
                i.src = audioUrl;
            }

            var images = {
                'crimson': './assets/img/crimson.jpg',
                'forest': './assets/img/forest.jpg',
                'lark': './assets/img/lark.jpg',
                'nightingale': './assets/img/nightingale.jpg',
                'slavka': './assets/img/slavka.jpg',
                'thrush': './assets/img/thrush.jpg',
            };

            $.each(images, function (key, val) {
                preloadImg(key, val);
            })

            var audios = {
                'crimson': './assets/img/crimson.mp3',
                'forest': './assets/img/forest.mp3',
                'lark': './assets/img/lark.mp3',
                'nightingale': './assets/img/nightingale.mp3',
                'slavka': './assets/img/slavka.mp3',
                'thrush': './assets/img/thrush.mp3',
            };

            $.each(audios, function (key, val) {
                preloadAudio(key, val);
            })
}));

const navList = document.querySelector('.nav-list');
const backgroundImg = document.querySelectorAll('main');
const navItem = document.querySelectorAll('.nav-item'); 
// const btnPlay = document.querySelectorAll('.center-play-btn');
const btnCheck = document.querySelector('.center-play-btn');
const logoCheck = document.querySelector('.logo');
const songs = ['nightingale', 'thrush', 'crimson', 'lark', 'slavka'];
let audioPlay = document.createElement('audio');
let timerTimes;
let timerTimeMill;
let timeoutID;
audioPlay.src = `./assets/audio/forest.mp3`;


audioPlay.onloadeddata = () => {
  // console.log(audioPlay.duration)
}

navList.addEventListener('click', changeImage);

function changeImage (event) {
    if (audioPlay.paused == false) {
        audioPlay.pause();
        audioPlay.currentTime = 0;
        backgroundImg.forEach((img, index) => {
            img.setAttribute('style', `background-image: url(./assets/img/${event.target.dataset.song}.jpg)`);
            audioPlay.src = `./assets/audio/${event.target.dataset.song}.mp3`;
            audioPlay.currentTime = 0;
            audioPlay.play();
            navItem.forEach(element => element.classList.remove('active'));
            event.target.classList.add('active');
            // btnPlay.forEach(element => element.classList.add('btn-active'));
            btnCheck.classList.add('btn-active');
            audioPlay.onloadeddata =  setTimeout(function(){
                timerTimes = audioPlay.duration - audioPlay.currentTime;
                // alert(audioPlay.duration);
                timerTimeMill = timerTimes * 1000;
                timeoutID = window.setTimeout(notActiveNav, timerTimeMill);
            }, 1000);
        })
    }

    else if (event.target.classList.contains('nav-item')) {
        backgroundImg.forEach((img, index) => {
            img.setAttribute('style', `background-image: url(./assets/img/${event.target.dataset.song}.jpg)`);
            audioPlay.src = `./assets/audio/${event.target.dataset.song}.mp3`;
            audioPlay.currentTime = 0;
            audioPlay.play();
            navItem.forEach(element => element.classList.remove('active'));
            event.target.classList.add('active');
            // btnPlay.forEach(element => element.classList.add('btn-active'));
            btnCheck.classList.add('btn-active');
            audioPlay.onloadeddata =  setTimeout(function(){
                // btnCheck.classList.add('btn-active');
                timerTimes = audioPlay.duration - audioPlay.currentTime;
                // alert(audioPlay.duration);
                timerTimeMill = timerTimes * 1000;
                timeoutID = window.setTimeout(notActiveNav, timerTimeMill);
            }, 1000);
        })
    }
}

btnCheck.addEventListener('click', changePlaySvg);

function changePlaySvg () {
  if (btnCheck.classList.contains('btn-active')) {
    btnCheck.classList.remove('btn-active');
    audioPlay.pause();
    console.log(`общее время: ${audioPlay.duration} секунд`);
    console.log(`время текущее (пауза): ${audioPlay.currentTime} секунд`);
  }
  else {
    audioPlay.play();
    btnCheck.classList.add('btn-active');
    delayedAlert();
  }
}


logoCheck.addEventListener('click', changePlayLogo);

function changePlayLogo() {
    if (logoCheck) {
        btnCheck.classList.remove('btn-active');
        backgroundImg.forEach((img, index) => {
            img.setAttribute('style', `background-image: url(./assets/img/forest.jpg)`);
            audioPlay.src = `./assets/audio/forest.mp3`;
            audioPlay.currentTime = 0;
            audioPlay.play();
            btnCheck.classList.add('btn-active');
            // btnPlay.forEach(element => element.classList.add('btn-active'));
            audioPlay.onloadeddata =  setTimeout(function(){
                timerTimes = audioPlay.duration - audioPlay.currentTime;
                // alert(audioPlay.duration);
                timerTimeMill = timerTimes * 1000;
                timeoutID = window.setTimeout(notActiveNav, timerTimeMill);
            }, 1000);
        })
    }
}


function delayedAlert() {
    timerTimes = audioPlay.duration - audioPlay.currentTime;
    timerTimeMill = timerTimes * 1000;
    timeoutID = window.setTimeout(notActive, timerTimeMill);
}

function notActive() {
  btnCheck.classList.remove('btn-active');
  clearAlert();
}

function notActiveNav() {
  // btnPlay.forEach(element => element.classList.remove('btn-active'));
  btnCheck.classList.remove('btn-active');
  clearAlert();
}

function clearAlert() {
  window.clearTimeout(timeoutID);
}