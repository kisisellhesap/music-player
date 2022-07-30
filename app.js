const container = document.querySelector(".container");
const player = new MusicPlayer(musicList);

window.addEventListener("load",() => {
displayMusic(player.getMusic());
displayMusicList(player.musicList);
});



// displayMusic controll

let displayMusic = (music) => {

    
container.innerHTML="";
let musicCard = `
<div class="music-card">
<img src="img/${music.img}" class="img">
<audio id="audio" src="mp3/${music.file}" onloadedmetadata="getTimeSong(this)" ontimeupdate="passTime(this)"> </audio>
<p class="title">${music.getName()}</p>
<input type="range"id="music-time" value="0" oninput="getTimeNow(this)">
<div class="times">
    <span class="start">0 : 00</span>
    <span class="end"></span>
</div>
<div class="controls">
    <i class="fa-solid fa-backward-step" onclick ="previousSong()"></i>
    <i class="fa-solid fa-play" id="playPause" onclick="playPause(this)"></i>
    <!-- <i class="fa-solid fa-pause"></i> -->
    <i class="fa-solid fa-forward-step" onclick=nextSong()></i>
</div>
<div class="other-controls">
<i id="music-bar" class="fa-solid fa-bars"></i>
    <div class="voice-volume">
                    <i id="volume-icon"  class="fa-solid fa-volume-high" onclick="voiceOpenClose(this)"></i>
                  
                    <input id="volume-bar" oninput="checkvoice(this)" type="range" max="100" value="100">
    </div>

</div>

</div>
<div class="music-list"></div>
`;


container.insertAdjacentHTML("beforeend",musicCard);

    
}


let displayMusicList = (list) => {


for(let i=0; i<list.length; i++ ){
    let music = `

    <div class="music" data-index='${i}' onclick="selectedMusic(this)">
        <span class="list-name">${list[i].getName()}</span>
        <span class="list-minute"></span>
        <audio id="audio" src="mp3/${list[i].file}" onloadedmetadata="listGetTimeSong(this)"> </audio>
    </div>
    
    `;

    
document.querySelector(".music-list").insertAdjacentHTML("beforeend",music);


    
}


}

let listGetTimeSong = (audio) => {
    audio.previousElementSibling.textContent = calculateTime(audio.duration);
}



let selectedMusic = (selectMusic) => {

    player.index=selectMusic.getAttribute("data-index");
    displayMusic(player.getMusic());
    displayMusicList(player.musicList);
    document.querySelector("#audio").play();
    isMusicPlaying();
    // selectedPlaying();
    }

// let selectedPlaying = ()=> {
//     for(let music of document.querySelector(".music-list").children){
     
//     if(music.classList.contains("playing")){
//         music.classList.remove("playing");
//         console.log(music);
//     }
//     if(music.getAttribute("data-index"== player.index)){
    
//         music.classList.add("playing");
//     }
//     }
// }
    

// Play pause song

const playPause = (playBtn) => {
    if(playBtn.classList=="fa-solid fa-play"){
        document.querySelector("#audio").play();
        playBtn.classList="fa-solid fa-pause";
    }
    else {
        document.querySelector("#audio").pause();
        playBtn.classList="fa-solid fa-play";
    }
}


// Next song

const nextSong = () => {
player.next();
displayMusic(player.getMusic());
document.querySelector("#audio").play();
isMusicPlaying();
displayMusicList(player.musicList);
}

// Previous song

const previousSong = () => {
player.previous();
displayMusic(player.getMusic());
document.querySelector("#audio").play();
isMusicPlaying();
displayMusicList(player.musicList);
}


// Is music playing ?

let isMusicPlaying = () => {

    if(document.querySelector("#audio").play()){
        document.querySelector("#playPause").classList="fa-solid fa-pause";
    }
    else {
        document.querySelector("#playPause").classList="fa-solid fa-play";
    }
}

// Audio time calculator

let calculateTime = (songDuration) => {
let  minute = Math.floor(songDuration / 60);
let second = Math.floor(songDuration % 60);
let updateSecond = second <10 ? `0${second}`: `${second}`
let result = `${minute} : ${updateSecond}`;
return result;

}

// Audio getting time

let getTimeSong = (audio) => {
    document.querySelector(".end").textContent=calculateTime(audio.duration);
    document.querySelector("#music-time").max = Math.floor(audio.duration);
}



// Audio passed time

let passTime = () => {
document.querySelector("#music-time").value= Math.floor(document.querySelector("#audio").currentTime);
document.querySelector(".start").textContent= calculateTime(document.querySelector("#music-time").value);
}


// Progressbar mouse control

let getTimeNow = (input) => {
console.log(input.value);
document.querySelector(".start").textContent= calculateTime(input.value);
document.querySelector("#audio").currentTime=input.value;
}




// Voice Open Close


let voiceOpenClose = (voiceIcon) => {
    
if(voiceIcon.classList=="fa-solid fa-volume-high") {

    voiceIcon.classList="fa-solid fa-volume-xmark";
    document.querySelector("#audio").muted=true;
    document.querySelector("#volume-bar").value=0;
}
else {
    voiceIcon.classList="fa-solid fa-volume-high";
    document.querySelector("#audio").muted=false;
    document.querySelector("#volume-bar").value=100;
  
}
}

// İnput check voice 

let checkvoice = (checkVoice) => {

document.querySelector("#audio").volume=checkVoice.value / 100;

if(document.querySelector("#audio").volume==0) {
document.querySelector("#volume-icon").classList="fa-solid fa-volume-xmark";
}

else {
    document.querySelector("#volume-icon").classList="fa-solid fa-volume-high"; 
}

}



// Musiclist open close

let musicListToggle = () => {

    

// if(document.querySelector(".music-list").classList=="music-list hidden") {
//     document.querySelector(".music-list").classList="music-list show";    
// }
// else {
//     document.querySelector(".music-list").classList="music-list hidden";

// }
}
