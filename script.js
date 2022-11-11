const container = document.querySelector('.container');
const main = document.querySelector('.main');
const next = document.querySelector('#next');
const prec = document.querySelector('#prev');
const interval = 3500;
let slideID;

let slide = document.querySelectorAll('.slide');
let index = 1;

const firstClone = slide[0].cloneNode(true);
const lastClone = slide[slide.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

main.append(firstClone);
main.prepend(lastClone);

const slideWidth = slide[index].clientWidth

main.style.transform = `translateX(${-slideWidth * index}px)`;


const getSlide = () => document.querySelectorAll('.slide');

main.addEventListener('transitionend', () => {
    slide = getSlide();  /* This is used because, Cloning happens after loading of DOM. Thus,Clones are not included due to which loop of images will not take place*/
    if (slide[index].id === firstClone.id) {
        main.style.transition = 'none';
        index = 1;
        main.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    if (slide[index].id === lastClone.id) {
        main.style.transition = 'none';
        index = slide.length - 2;
        main.style.transform = `translateX(${-slideWidth * index}px)`;
    }

})

const startSlide = () => {
    slide = getSlide();
    slideBegin = setInterval(() => {
        nextSlide();
    }, interval);
}


main.addEventListener('mouseenter', () => {
    clearInterval(slideBegin);
})

main.addEventListener('mouseleave', startSlide);

const nextSlide = () => {
    if (index >= slide.length - 1) return
    index++
    main.style.transform = `translateX(${-slideWidth * index}px)`;
    main.style.transition = '0.5s ease';
}

const prevSlide = () => {
    if (index <= 0 ) return;
    index--
    main.style.transform = `translateX(${-slideWidth * index}px)`;
    main.style.transition = '0.5s ease'
}


next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)


startSlide()