console.log("JS Loaded");



const audioPlayer = document.querySelector(".player")
const audioSource = document.querySelector(".player source");
const unList = document.querySelector(".unlist");
let right = document.querySelector(".right");
const trackName = document.querySelector(".music-info h1");
const trackArtist = document.querySelector(".music-info h2");
const trackPic = document.querySelector(".music-img");
const play = document.querySelector(".play");
const forward = document.querySelector(".next");
const backward = document.querySelector(".prev");
const volMin = document.querySelector(".volm");
const volPlus = document.querySelector(".volp");
const volVal = document.querySelector(".volume-control h1");
const mute = document.querySelector(".volmute");

const duration = document.querySelector(".pduration");


play.addEventListener("click",()=>{
    if(audioPlayer.paused){
        audioPlayer.play();
        play.innerHTML = `<i class="fas fa-pause"></i>`;
    } else{
        audioPlayer.pause();
        play.innerHTML = `<i class="fas fa-play"></i>`;
    }
})

forward.addEventListener("click", ()=>{
   audioPlayer.currentTime+=10;
})

backward.addEventListener("click", ()=>{
    audioPlayer.currentTime-=10;
 })

audioPlayer.volume = 0.1;

volMin.addEventListener("click",()=>{
    audioPlayer.volume= audioPlayer.volume-0.1;
    volVal.innerHTML = `Volume: ${Math.floor(audioPlayer.volume*100)}%`

})

volPlus.addEventListener("click",()=>{
    audioPlayer.volume+=0.1;
    volVal.innerHTML = `Volume: ${Math.floor(audioPlayer.volume*100)}%`
})

mute.addEventListener("click",()=>{
    audioPlayer.volume = 0.0
    volVal.innerHTML = `Volume: 0%`
})

audioPlayer.addEventListener("timeupdate",()=>{
    let currentDuration = audioPlayer.currentTime/audioPlayer.duration * 100;
    duration.style.width = `${currentDuration}%`;

});




const URL = "https://5dd1894f15bbc2001448d28e.mockapi.io/playlist";



fetch(URL).then(res => res.json())
    .then(data => {

        for (let index of data.keys()) {
            let songItem = document.createElement("li");
            songItem.classList.add("song-list");
            
            songItem.setAttribute("id",index);
            songItem.innerHTML = `
            <img src="${data[index].albumCover}" alt="">
            <h1>${(data[index].track).slice(0,22)}</h1>
        `
            unList.append(songItem);

            songItem.addEventListener("click", (e)=>{
                play.innerHTML = `<i class="fas fa-pause"></i>`;
                let id = e.currentTarget.id;
                let aSource = data[id].file;
                trackName.innerHTML = data[id].track;
                trackArtist.innerHTML = data[id].artist;
                trackPic.setAttribute("src",data[id].albumCover);
                audioPlayer.innerHTML = `<source src="${aSource}" type="audio/mp3">`;
                audioPlayer.load();

            });

            
        }
    })

    