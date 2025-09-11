const progress=document.getElementById('progress');
const volumeSlider=document.getElementById('volume-slider');
const volumeProgress=document.getElementById('volume-progress');
const favBtn=document.getElementById('favorite-btn');
const wave=document.getElementById('wave');
const songTitle=document.getElementById('song-title');
const songArtist=document.getElementById('song-artist');
const albumCover= document.getElementById('album-cover');
const currentTimeSong=document.getElementById('current-time');
const durationSong=document.getElementById('duration');
const playlistTabs=document.querySelectorAll('.playlist-tab');
const mainPlaylistSection=document.getElementById('main-play-section');
const tabContentOverlay=document.getElementById('tab-content-overlay');
const tabOverlayTitle=document.getElementById('tab-overlay-title');
const tabOverlayBody=document.getElementById('tab-overlay-body');
const closeOverlayBtn=document.getElementById('close-overlay-btn');
const confirmationModal=document.getElementById('confirmation-modal');
const modalMessage=document.getElementById('modal-message');
const modalCancelBtn=document.getElementById('modal-cancel-btn');
const modalConfirmBtn=document.getElementById('modal-confirm-btn');

let playlistCreateForm, playlistNameEntry, createCancelBtn,playlistSaveBtn;
let playlistEditForm, editPlaylistNameEntry,editCancelBtn,editSaveBtn, songEditList;


const songs=[
    {
        title:"Blinding Lights",
        artist:"The Weeknd",
        cover:"https://unsplash.com/photos/turned-on-electronic-keyboard-c-NBiJrhwdM",
        audio:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "3:20",
        favorite:"false"
    },
] 