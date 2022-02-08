const mainEl = document.querySelector('main')
initChannels(mainEl)
const channels = document.querySelectorAll('.channel-container');
const audios = document.querySelectorAll('audio');
const mutesButtons = document.querySelectorAll('.channel-container .switch input')
const playAll = document.getElementById('play');
const pauseAll = document.getElementById('stop')
const loop = document.getElementById('loop')
const timeCursor = document.querySelector('.cursor')
const animationDuration = 12.0582
function createChannel(name, audioSourcePath){
    const sectionEl = document.createElement("section")
    const divName = document.createElement("div")
    const labelEl = document.createElement("label")
    const labelElInput = document.createElement("input")
    const span =document.createElement("span")
    const audioDiv = document.createElement("div")
    const audioEl = document.createElement("audio")
    const audioSource = document.createElement("source")

    sectionEl.classList.add("channel-container")
    divName.classList.add("channel-name")
    divName.innerHTML = name
    labelEl.classList.add("switch")
    labelElInput.setAttribute("type", "checkbox")
    span.classList.add("slider", "round")
    audioDiv.classList.add("audio-container")
    audioSource.src = audioSourcePath
    audioSource.type = "audio/mpeg"
    audioEl.preload = "metadata"

    audioEl.appendChild(audioSource)
    audioDiv.appendChild(audioEl)
    labelEl.appendChild(labelElInput)
    labelEl.appendChild(span)
    sectionEl.appendChild(divName)
    sectionEl.appendChild(labelEl)
    sectionEl.appendChild(audioDiv)

    return sectionEl
}

function initChannels(){
    const channelDict = {
        Bass:"/audio/Bass.mp3",
        Kick: "/audio/Kick.mp3",
        Snare: "/audio/Snare.mp3",
        Piano: "/audio/Piano.mp3",
        Guitar: "/audio/Guitar.mp3",
        Lead: "/audio/Lead.mp3",
        Brass: "/audio/Brass.mp3",
        Synth: "/audio/Synth.mp3"
    }

    for(const[name,audioPath] of Object.entries(channelDict)){
        const currSection = createChannel(name, audioPath)
        mainEl.appendChild(currSection)
    }
}

function colorizeElements(elements) {
    let hue = 0
    elements.forEach((element)=>{
        element.style.backgroundColor = `hsl(${hue}, 70%, 60%)`
        hue = hue + 20})

}

function initComponents()
{
    loop.loopOn = false
    console.log(loop)
}

function playAllAudio(audios){
    timeCursor.classList.add("animationOn")

    audios.forEach((singleAudio)=>{
        if(!singleAudio.classList.contains('mute')){
        singleAudio.play()}})
}

function pauseAllAudio(audios){
    timeCursor.classList.remove("animationOn")
    audios.forEach((singleAudio)=>{
        singleAudio.pause()
        singleAudio.currentTime = 0
    })
}

function handleAnimation() {
    let timeLeft = animationDuration - audios[0].currentTime
    if (!loop.loopOn && timeLeft < 0.1) {
        timeCursor.style.animationIterationCount = '1';
    } else {
        timeCursor.style.animationIterationCount = 'infinite';
    }
}



function handleLoop() {
    loop.loopOn = !loop.loopOn;
    audios.forEach((audio) => {
        audio.loop = loop.loopOn;
    });
}
setInterval(() => {handleAnimation();}, 100);
colorizeElements(channels);
initComponents()
mutesButtons.forEach((singleMute,i)=>{singleMute.addEventListener('click',
    ()=>{audios[i].classList.toggle('mute')})})
playAll.addEventListener('click',()=>{playAllAudio(audios)})
pauseAll.addEventListener('click', ()=>{pauseAllAudio(audios)})
