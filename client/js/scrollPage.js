const main = document.querySelector('main')
const progressFill = document.querySelector('.timeline-fill-progress')
const sections = Array.from(document.querySelectorAll('section'))
const timelineProgressMarker = document.querySelectorAll('.timeline-progress-marker')

const ageNames = [
    "BOOT",
    "FÓSFORO",
    "COMPUTADORES",
    "ARCADES",
    "PONG",
    "CONSOLES",
    "MODERNO",
    "LEGADO",
]

const welcomeBottomBarContent = document.getElementById("welcome-bottom-bar-content")
const navigationBottomBarContent = document.getElementById("navigation-bottom-bar-content")

const previousSectionButton = document.getElementById("previous-section-button")
const nextSectionButton = document.getElementById("next-section-button")
const bottomBarAgeIndicatorText = document.getElementById("bottom-bar-age-indicator-text")
const bottomBarAgeIndicatorProgress = document.getElementById("bottom-bar-age-indicator-progress")
const bottomBarAgeIndicatorProgressCells = Array.from(bottomBarAgeIndicatorProgress.children)
const bottomBarPreviousPageIndicator = document.getElementById("bottom-bar-previous-page-indicator")
const bottomBarNextPageIndicator = document.getElementById("bottom-bar-next-page-indicator")

let currentSection = 0

let targetScroll = 0
let currentScroll = 0
const scrollEase = 0.1
const getMaxScroll = () => main.scrollWidth - main.clientWidth
const scrollSnapValue = 90

window.addEventListener('wheel', (event) => {
    event.preventDefault()
    let wheelScroll = event.deltaX || event.deltaY
    targetScroll += wheelScroll
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

    sections.forEach((sec, index) => {
        if (targetScroll >= sec.offsetLeft - scrollSnapValue && targetScroll <= sec.offsetLeft + scrollSnapValue) {
            targetScroll = sec.offsetLeft
        }

        if (targetScroll >= sec.offsetLeft && targetScroll < sec.offsetLeft + sec.offsetWidth) {
            timelineProgressMarker[index].classList.add('timeline-progress-marker-active')

            if (currentSection != index) {
                currentSection = index
                updateBottomBar()
            }
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

function previousSection() {
    if (currentSection > 0) {
        currentSection -= 1
        scrollToSection(currentSection)
        updateBottomBar()
    }
}

function nextSection() {
    if (currentSection < sections.length - 1) {
        currentSection += 1
        scrollToSection(currentSection)
        updateBottomBar()
    }
}

function updateBottomBar() {
    const previousAgeName = ageNames[currentSection - 1]
    const nextAgeName = ageNames[currentSection + 1]

    if (previousAgeName) {
        bottomBarPreviousPageIndicator.innerText = ageNames[currentSection - 1]
        bottomBarPreviousPageIndicator.style.opacity = 1
        previousSectionButton.style.opacity = 1
    } else {
        bottomBarPreviousPageIndicator.style.opacity = 0
        previousSectionButton.style.opacity = 0
    }

    if (nextAgeName) {
        bottomBarNextPageIndicator.innerText = ageNames[currentSection + 1]
        bottomBarNextPageIndicator.style.opacity = 1
        nextSectionButton.style.opacity = 1
    } else {
        bottomBarNextPageIndicator.style.opacity = 0
        nextSectionButton.style.opacity = 0
    }

    bottomBarAgeIndicatorText.innerText = `0${currentSection + 1} / 0${sections.length}`

    bottomBarAgeIndicatorProgressCells.forEach((cell, index) => {
        if (index <= currentSection) {
            cell.classList.add("age-indicator-progress-cell-fill")
        }
        else {
            cell.classList.remove("age-indicator-progress-cell-fill")
        }
    })

    if (currentSection <= 0) {
        welcomeBottomBarContent.style.display = "flex"
        navigationBottomBarContent.style.display = "none"
    } else {
        welcomeBottomBarContent.style.display = "none"
        navigationBottomBarContent.style.display = "flex"
    }
}

export { updateScroll, previousSection, nextSection, updateBottomBar }
