
// const musicCard=document.getElementById('music-card');
// const flipBtn=document.getElementById('flip-button');
// const showNowBtn=document.getElementById('show-now-button');
// const toggleTheme=document.getElementById('toggle-theme');
// // const playBtn=document.getElementById('play-button');
// const previousBtn=document.getElementById('prev-button');
// // const nextBtn=document.getElementById('next-button');
// const progressTracker=document.getElementById('progress-tracker');
// // const progress=document.getElementById('progress');
// const volumeSlider=document.getElementById('volume-slider');
// const volumeProgress=document.getElementById('volume-progress');
// const favBtn=document.getElementById('favorite-btn');
// const wave=document.getElementById('wave');
// const songTitle=document.getElementById('song-title');
// const songArtist=document.getElementById('song-artist');
// const albumCover= document.getElementById('album-cover');
// const currentTimeSong=document.getElementById('current-time');
// const durationSong=document.getElementById('duration');
// const playlistTabs=document.querySelectorAll('.playlist-tab');
// const mainPlaylistSection=document.getElementById('main-play-section');
// const tabContentOverlay=document.getElementById('tab-content-overlay');
// const tabOverlayTitle=document.getElementById('tab-overlay-title');
// const tabOverlayBody=document.getElementById('tab-overlay-body');
// const closeOverlayBtn=document.getElementById('close-overlay-btn');
// const confirmationModal=document.getElementById('confirmation-modal');
// const modalMessage=document.getElementById('modal-message');
// const modalCancelBtn=document.getElementById('modal-cancel-btn');
// const modalConfirmBtn=document.getElementById('modal-confirm-btn');

// let playlistCreateForm, playlistNameEntry, createCancelBtn,playlistSaveBtn;
// let playlistEditForm, editPlaylistNameEntry,editCancelBtn,editSaveBtn, songEditList;





// const songs=[
//     {
//         title:"Blinding Lights",
//         artist:"The Weeknd",
//         cover:"https://unsplash.com/photos/turned-on-electronic-keyboard-c-NBiJrhwdM",
//         audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//         duration: "3:20",
//         favorite:"false"
//     },
//     {title:"Save Your Tears",
//         artist:"The Weeknd",
//         cover:"https://unsplash.com/photos/turned-on-electronic-keyboard-c-NBiJrhwdM",
//         audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//         duration: "3:35",
//         favorite:"true"
//     }
// ] 

const client_id="361b4a02d8cc45c2b9ea89cc58b8ab49";
const secret="9e7398f09ed34aed9fdc77fa905fabe8";
const redirect_uri="http://127.0.0.1:5500/loggedIn.html";
const TOKEN_URL="https://accounts.spotify.com/api/token"
let auth_encrypted= 'Basic '+ btoa( `${client_id}:${secret}`);

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// songs titles
const songs=['hey','summer','ukulele'];

// keep track of songs
let songsIndex=2;

// Initial load sa=ong details into Dom

loadSongs(songs[songsIndex]);

// update songs info
function loadSongs(song){
    title.innerText=song;
    audio.src= `music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}
// play songs
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    
    audio.play();

}
// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songsIndex--;

  if (songsIndex < 0) {
    songsIndex = songs.length - 1;
  }

  loadSongs(songs[songsIndex]);

  playSong();
}

// Next song
function nextSong() {
  songsIndex++;

  if (songsIndex > songs.length - 1) {
    songsIndex = 0;
  }

  loadSongs(songs[songsIndex]);

  playSong();
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


function authorization(){

    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // goes to Spotify's authorization screen
    // let scopes="user-read-private user-read-email user-read-playback-state user-top-read"
    // let redirect_uri1=+encodeURI(redirect_uri);
    // window.location.href="https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri1}&scope=${scopes}"
}

 
function startLoadCode() {
    if ( window.location.search.length > 0 ){
        findCode();
    }
    getAccessToken();
    window.history.pushState("", "", redirect_uri);
}

function findCode(){
     let code=null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParameter = new URLSearchParams(queryString);
        code = urlParameter.get('code')
    }
    return code;
}

function getAccessToken( code ){
    let tokenBody = "grant_type=authorization_code";
    tokenBody += "&code=" + code; 
    tokenBody += "&redirect_uri=" + encodeURI(redirect_uri);
    tokenBody += "&client_id=" + client_id;
    tokenBody += "&client_secret=" + secret;
    callAuthorizationApi(tokenBody);
}
function callAuthorizationApi(tokenBody){
    
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", TOKEN_URL, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + secret));
    console.log(tokenBody);
    xhttp.send(tokenBody);
    xhttp.onload = handleAuthorizationResponse;
}
 
    
function handleAuthorizationResponse(){
    let access_token = null;
    let refresh_token = null;
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        getCode();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}