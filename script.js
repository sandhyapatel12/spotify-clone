//initilize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let masterSongName = document.getElementById('masterSongName');



//array of object(store value in key-value pair)
let songs = [
    {songName: "Warriyo", filePath: "songs/1.mp3", coverPath: "covers/c1.jpeg"},
    {songName: "Cielo ", filePath: "songs/2.mp3", coverPath: "covers/c2.jpeg"},
    {songName: "DEAF KEV ", filePath: "songs/3.mp3", coverPath: "covers/c3.jpeg"},
    {songName: "Different ", filePath: "songs/4.mp3", coverPath: "covers/c4.jpeg"},
    {songName: "Janji-H", filePath: "songs/5.mp3", coverPath: "covers/c5.jpeg"},
    {songName: "Different song", filePath: "songs/6.mp3", coverPath: "covers/c6.jpeg"},
    {songName: "Uniq ", filePath: "songs/7.mp3", coverPath: "covers/c7.jpeg"},
    {songName: "Trending", filePath: "songs/8.mp3", coverPath: "covers/c8.jpeg"},

]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})


// Handle play/pause click
masterPlay.addEventListener('click', () =>
{
    if(audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})


audioElement.addEventListener('timeupdate', () =>
{
    console.log('timeupdate');

    //update progressbar
    //parseInt for get value in integer form
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);    //convert into percentage
    console.log(progress);
    myProgressBar.value = progress;
});


myProgressBar.addEventListener('change', () =>
{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;     //convert into duration
})

//arrow function
const makeAllPlays = () =>
{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>
    {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

//for play all song
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>
{
    element.addEventListener('click', (e) =>
    {
        //play/pause buttons
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        //play different song
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })

})

//play next song
next.addEventListener('click', () =>
{
    if(songIndex >= 7)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

//for previous song
previous.addEventListener('click', () =>
{
    if(songIndex <= 0)
    {
        songIndex = 0
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;       //show play song 
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})