/* Intro slider
---------------------------------------------------------------*/
const introSwiper = document.querySelector('.slider-intro');

new Swiper(introSwiper, {
    slidesPerView: 1,
    spaceBetween: 0,
    wrapperClass: 'slider-intro__list',
    slideClass: 'slider-intro__item',
    loop: true,
    autoplay: {
        delay: 8000,

    },
    speed: 1000,
    effect: 'fade',
   });