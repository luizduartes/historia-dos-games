const main = document.querySelector('main');

// document.documentElement.addEventListener('wheel', (event) => {
//   if (event.deltaY !== 0) {
//     event.preventDefault()
//     // Movemos um valor maior para garantir que o "snap" entenda a intenção de trocar de seção
//     document.documentElement.scrollLeft += event.deltaY
//   }
// }, { passive: false })

let targetScroll = 0
let currentScroll = 0
const scrollEase = 0.1
const maxScroll = document.documentElement.scrollWidth - document.documentElement.clientWidth;

document.documentElement.addEventListener('wheel', (event) => {
    event.preventDefault()
    targetScroll += event.deltaY
    if (targetScroll < 0) targetScroll = 0
    if (targetScroll > maxScroll) targetScroll = maxScroll
}, { passive: false })

function update() {
    currentScroll += (targetScroll - currentScroll) * scrollEase
    document.documentElement.scrollLeft = currentScroll
    requestAnimationFrame(update)
}

update()