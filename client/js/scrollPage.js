const main = document.querySelector('main')
const progressFill = document.querySelector('.timeline-fill-progress')
const sections = document.querySelectorAll('section')
const timelineProgressMarker = document.querySelectorAll('.timeline-progress-marker')

let targetScroll = 0
let currentScroll = 0
const scrollEase = 0.1
const getMaxScroll = () => main.scrollWidth - main.clientWidth
const scrollSnapValue = 90

window.addEventListener('wheel', (event) => {
    event.preventDefault()
    targetScroll += event.deltaY
    const maxScroll = getMaxScroll()
    
    if (targetScroll < 0) targetScroll = 0
    if (targetScroll > maxScroll) targetScroll = maxScroll

}, { passive: false })

function updateScroll() {
    const maxScroll = getMaxScroll()
    
    currentScroll += (targetScroll - currentScroll) * scrollEase
    main.scrollLeft = currentScroll
    if (maxScroll > 0) {
        progressFill.style.width = `${(targetScroll * 100) / maxScroll}%`
    }

    Array.from(sections).forEach((sec, index) => {
        if (targetScroll >= sec.offsetLeft - scrollSnapValue && targetScroll <= sec.offsetLeft + scrollSnapValue) {
            targetScroll = sec.offsetLeft
        }

        if (targetScroll >= sec.offsetLeft && targetScroll < sec.offsetLeft + sec.offsetWidth) {
            timelineProgressMarker[index].classList.add('timeline-progress-marker-active')
        }
        else {
            timelineProgressMarker[index].classList.remove('timeline-progress-marker-active')
        }
    })

    requestAnimationFrame(updateScroll)
}

// updateScroll()

window.addEventListener('resize', () => {
    targetScroll = main.scrollLeft
})

function scrollToSection(_sectionIndex) {
    targetScroll = sections[_sectionIndex].offsetLeft
}

Array.from(timelineProgressMarker).forEach((element, index) => {
    element.addEventListener('click', () => {
        scrollToSection(index)
    })
})

export { updateScroll }
