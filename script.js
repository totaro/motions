//preloader -------------------------------------------
		
const loaderContainer = document.querySelector('.loader-container')

window.addEventListener('load', () => {
    loaderContainer.classList.add('hidden')
})


// gsap scrolltrigger ------------------------------------

const entries = document.querySelectorAll('.entry')

entries.forEach(entry => {
    let entryMeta = entry.querySelector('.entry__meta')
    let entryMedia = entry.querySelector('.entry__media')
    
    
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: entry,
            start: 'top bottom',
            end: 'bottom 90%',
            markers: false,
            scrub: true
        }
    })

    tl.fromTo(entryMeta, {xPercent: -100, opacity: 0}, {xPercent:0, opacity:1})
    tl.fromTo(entryMedia, {xPercent: 100, opacity: 0}, {xPercent:0, opacity:1}, '<')

})


//lenis gsap scrolltrigger
/*
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
      lenis.raf(time * 6000)
})

gsap.ticker.lagSmoothing(0)
*/

//menu button toggle ---------------------------------------

const menuButton = document.querySelector('#menu-button')
const rootElement = document.documentElement
const menuLinks = document.querySelectorAll('#menu-link')

menuButton.addEventListener('click', () => {
    rootElement.toggleAttribute('menu-open')
})

var count = 0;
menuLinks.forEach(menulink => {
     menulink.addEventListener('click', () => {
    //console.log("Clicked! count:" + ++count);
    rootElement.toggleAttribute('menu-open')
})
})

// animated submit button --------------------------------------

const submitButton = document.querySelector('#btn-submit')
const submitButtonText = document.querySelector('#btn-submit .button--text')

    submitButton.addEventListener('click', (e) => {
    
        e.preventDefault()

        //add loading class
        submitButton.classList.add('loading')

        setTimeout(() => {
            //remove loading class
            submitButton.classList.remove('loading')
            submitButton.classList.add('success')

            //change button text
            submitButtonText.innerHTML = 'Login Successful'

    }, 3000)
})

// typewriter effect --------------------------------------------

const words = ['Style', 'Clarity', 'Passion', 'Precision']

//main timeline
let mainTimeline = gsap.timeline({
    repeat: -1

})

//for each word, create new timeline, use text plugin, append that timeline to the main one
words.forEach(word =>{
    let textTimeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 3
    })

    textTimeline.to('#typewriter', {
        text: word,
        duration: 1,
        onUpdate: () => {
            cursorTimeline.restart()
            cursorTimeline.pause()
        },
        onComplete: () => {
            cursorTimeline.play()
        }
    })

    mainTimeline.add(textTimeline)

})

//blinkin cursor 
let cursorTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: .8
})

cursorTimeline.to('#cursor', {
    opacity: 1,
    duration: 0
}).to('#cursor', {
    opacity: 0,
    duration: 0,
    delay: .8

})

// mouse follow ------------------------------------------

//get magnet
const magnet = document.querySelector('.magnet')
const magnetText = document.querySelector('.magnet .text')
const dngr = document.querySelector('#debugger')

//mouse move stuff
const activateMagnet = (event) => {
    let boundBox = magnet.getBoundingClientRect()
    const magnetStrength = 40
    const magnetTextStrength = 80
    const newX = ((event.clientX - boundBox.left)/magnet.offsetWidth - 0.5)
    const newY = ((event.clientY - boundBox.top)/magnet.offsetHeight - 0.5)

    //debugging purposes
    /*
    dngr.innerHTML = 'cursorX ' + event.clientX + '<br>boxleft: ' + Math.ceil(boundBox.left) + '<br>cursorInsideButton: ' + Math.ceil(event.clientX - boundBox.left) + '<br>relativeToTotalWidth: ' + ((event.clientX - boundBox.left)/magnet.offsetWidth).toFixed(2) + '<br>shifted: ' + ((event.clientX - boundBox.left)/magnet.offsetWidth - 0.5).toFixed(2)
    */

    //move button to its new position
    gsap.to(magnet, {
        duration: 1,
        x: newX * magnetStrength,
        y: newY * magnetStrength,
        ease: Power4.easeOut

    })

    //move button text to its new posistion
    gsap.to(magnetText, {
        duration: 1,
        x: newX * magnetTextStrength,
        y: newY * magnetTextStrength,
        ease: Power4.easeOut

    })
}

//mouse leave stuff
const resetMagnet = (event) => {
    //move button to its default position
    gsap.to(magnet, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut
    })

        //move button text to its default position
    gsap.to(magnetText, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut
    })

}

//add event listeners
magnet.addEventListener('mousemove', activateMagnet)
magnet.addEventListener('mouseleave', resetMagnet)

// change background color --------------------------------------

const btn = document.querySelector('.togglebutton')

document.querySelector('.togglebutton').addEventListener('click', () => {
    
    document.getElementById("change-bg").classList.toggle("change-figure-bg");
  
    const initialText = `Chance to light &nbsp; <i class="fa-solid fa-sun"></i>`;

    if (btn.innerHTML.toLowerCase().includes(initialText.toLowerCase())) {
        btn.innerHTML = `Chance to dark &nbsp; <i class="fa-solid fa-moon">`;
    } else {
        btn.innerHTML = initialText;
    }
})

