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

console.log(`Ув. проверяющий, напоминаю, что проверяем строго согласно тз: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30-1.md Из доп функционала реализовано: кнопка плей становится в исходное состояние после конца "трека", если это можно назвать треком. Честно, я себе звуки на мелодии менял, чтобы это тестить, ну а вам вернул обратно птиц, радуйтесь =) В общем, все сделано на чистом js =) (из-за этого, иногда, бывают тормоза с прогрузкой, лично у меня) В консоли для удобства пишется общее время трека и время, на котором сделана пауза в данный момент. Можете побаловаться, правда, данным заданием не предусмотрена перемотка на конец "трека" =))))))) По умолчанию стоит картинка леса и играет (если не выбрать ни 1 звук или щелкнуть по птице) дефолтный звук леса, ну а если названия потыкать, то там много выбора. Собственно, как и хотели в задании. Форма для проверки в помощь: https://eco-sounds-cross-check.netlify.app/ Убедительная просьба, дождитесь загрузки страницы, прежде чем тестировать, ровно как просьба дожидаться загрузки изображений! Если мой код нормально не работает на странице гита, то напишите мне, прежде чем ставить оценку. На домашнем компьютере проблем никаких не было и я без проблем могу это продемонстрировать! Код рабочий более чем! Если что, пишите в дискорде, вы меня сможете найти на сервере по нику:  anthony-th. Я много сообщений в канале дискорда оставлял, так что без труда найдете мой профиль, либо же в канале cross-check просто напишите @anthony-th и мне придет оповещение.`);
console.log(`Моя скромная оценка своей работы: верстка: не менее 5 элементов (разные виды птиц) +5, в футере ссылки на rs и автора + год созданий +5; при кликах по интерактивным элементам меняется изображение +10; при кликах по интерактивным элементам меняется звук +10; активный в данный момент интерактивный элемент выделяется стилем +10; кнопка Play/Pause +20(меняется, ставит на паузу); дополнительный не предусмотренный в задании функционал - по истечении времени трека кнопка play возвращается в исходное состояние +10 = 70 при максимуме в 60 =) Судить вам! На всякий случай зеркало: https://eco-sounds-anthony-th.netlify.app/`);