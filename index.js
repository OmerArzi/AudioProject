const channels = document.querySelectorAll('.channel-container');
const audios = document.querySelectorAll('audio');
const mutesButtons = document.querySelectorAll('.channel-container .switch input')
const playAll = document.getElementById('play');
const pauseAll = document.getElementById('stop')
const loop = document.getElementById('loop')

function colorizeElements(elements) {
    let hue = 0
    elements.forEach((element)=>{
        element.style.backgroundColor = `hsl(${hue}, 70%, 60%)`
        hue = hue + 20})

}

function initLoopFlag(loopButton)
{
    loopButton.classList.toggle('myFlag')
    loopButton.myFlag = false
}

function playAllAudio(audios){
    audios.forEach((singleAudio)=>{
        if(!singleAudio.classList.contains('mute')){
        singleAudio.play()}})
}

function pauseAllAudio(audios){
    audios.forEach((singleAudio)=>{
        singleAudio.pause()
        singleAudio.currentTime = 0
    })
}

function handleLoop(){
    console.log('clicked');
    console.log(loop.myFlag)
    loop.myFlag = !loop.myFlag
    audios.forEach((audio)=>{
        audio.loop = loop.myFlag
    })
}


colorizeElements(channels);
initLoopFlag(loop)
mutesButtons.forEach((singleMute,i)=>{singleMute.addEventListener('click',
    ()=>{audios[i].classList.toggle('mute')})})
playAll.addEventListener('click',()=>{playAllAudio(audios)})
pauseAll.addEventListener('click', ()=>{pauseAllAudio(audios)})
