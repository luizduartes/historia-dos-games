const main = document.querySelector('main')
const progressFill = document.querySelector('.progress-fill')
const header = document.querySelector('header')
const sections = document.querySelectorAll('section')

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

    Array.from(sections).forEach((sec, index) => {
        if (targetScroll >= sec.offsetLeft - scrollSnapValue && targetScroll <= sec.offsetLeft + scrollSnapValue) {
            targetScroll = sec.offsetLeft
        }
    })

    updateHeaderStyle()

}, { passive: false })

function update() {
    const maxScroll = getMaxScroll()
    
    currentScroll += (targetScroll - currentScroll) * scrollEase
    main.scrollLeft = currentScroll
    if (maxScroll > 0) {
        progressFill.style.width = `${(targetScroll * 100) / maxScroll}%`
    }

    requestAnimationFrame(update)
}

update()

window.addEventListener('resize', () => {
    targetScroll = main.scrollLeft
})

function scrollToSection(_sectionIndex) {
    targetScroll = sections[_sectionIndex].offsetLeft
    updateHeaderStyle()
}

function updateHeaderStyle() {
    if (targetScroll >= sections[1].offsetLeft) {
        header.style.opacity = 1
    } else {
        header.style.opacity = 0
    }
}