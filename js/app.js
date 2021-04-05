
const body = document.querySelector('body'),
	  wrapper = body.querySelector('.wrapper'),
	  overlay = document.querySelector('.overlay'),
      mainHeader = document.querySelector('.main-header'),
      burger = document.querySelector('.burger'),
      navigation = document.querySelector('.main-header__nav'),
      navLinks = navigation.querySelectorAll("[href]"),
	  seach = body.querySelector('.search'),
	  seachInput = seach.querySelector('.search__input'),
	  intro = document.querySelector('.intro'),
	  introSwiper = document.querySelector('.slider-intro'),
	  about = document.querySelector('.about');



/* Intro slider
---------------------------------------------------------------*/
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


/* Burger active
-----------------------------------------------------------------------------*/
burger.addEventListener('click', function () {
   if (burger) {
      burger.classList.toggle('active');
   }
   if ( burger.classList.contains('active') ) {
      showNav ();
   } else {
      closeNav ();
   }
});


/* Close menu when links is active
-----------------------------------------------------------------------------*/
navLinks.forEach(el => {
    el.addEventListener('click', () => {
        if (navigation.classList.contains('active') 
			&& !el.classList.contains('spoller')) {
            closeNav();
        }
    })
});


/* Functions of burger nav
-----------------------------------------------------------------------------*/
function showNav () {
    navigation.classList.add('active');
    mainHeader.classList.add('active');
}
 
function closeNav () {
    burger.classList.remove('active');
    navigation.classList.remove('active');
    mainHeader.classList.remove('active');
}


/* Show Seach
---------------------------------------------------------------*/
seachInput.addEventListener('mousedown', (e) => {
	 seachInput.classList.add('active');
	 seach.classList.add('active');
});

seach.addEventListener('submit', (e) => {
	hideSeach();
});

document.addEventListener('click', (e) => {
	if (e.target && !e.target.classList.contains('search__input')) {
		hideSeach();
	}
});

document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		hideSeach();
	}
});

function hideSeach () {
	seachInput.classList.remove('active');
	seach.classList.remove('active');
}


/* Modal windows
---------------------------------------------------------------*/
let modalLinks = document.querySelectorAll('.modal-link');

if (modalLinks.length > 0) {
	modalLinks.forEach(link => {
		link.addEventListener('click', () => {
			let linkTarget = link.dataset.modal;
            let modalWindow = document.querySelector(`${linkTarget}`);

            modalActive(modalWindow);
		});
	});
}

function modalActive (target) {
    if (target) {
        modalShow (target);

        let closeBtn = target.querySelector('.modal__close');

        closeBtn.addEventListener('click', () => {
            modalClose (target);
        });

        overlay.addEventListener('click', () => {
            modalClose (target);
        });

        document.addEventListener('keydown', function (e) {
            if (e.code === 'Escape') {
                modalClose (target);
            }
        });
    }
}

function modalShow (target) {
    target.classList.add('modal-show');
    overlay.classList.add('modal-show');
	body_lock(0);
}

function modalClose (target) {
    target.classList.remove('modal-show');
    overlay.classList.remove('modal-show');
    body_lock(0);
}

/* About animation
---------------------------------------------------------------*/
document.addEventListener('scroll', () => {
	if (pageYOffset > 100) {
		about.classList.remove('hide');
	} else {
		about.classList.add('hide');
	}
});


/* Promise video
---------------------------------------------------------------*/
const promisePromo = document.querySelector('.promise__promo'),
	  videoBtn = promisePromo.querySelector('.promise__btn'),
	  promiseVideo = document.querySelector('.promise__video');

videoBtn.addEventListener('click', () => {
	promiseVideo.play();
	promiseVideo.controls = 'true';
	promisePromo.classList.add('active');
});

promiseVideo.addEventListener('ended', () => {
	promisePromo.classList.remove('active');
	promiseVideo.controls = '';
});



/* Service slider
---------------------------------------------------------------*/
const serviceSlider = document.querySelector('.service__slider');
let mySwiper;

function mobileSlider() {
	if (window.innerWidth < 767 && serviceSlider.dataset.mobile == 'false') {
		mySwiper = new Swiper(serviceSlider, {
			wrapperClass: 'service__list',
			slideClass: 'service__column',
			slidesPerView: 1.2,
			spaceBetween: 5,
			freeMode: true,
			breakpoints: {
				// when window width is >= 320px
				320: {
				  slidesPerView: 1.2,
				  spaceBetween: 5
				},
				// when window width is >= 480px
				480: {
				  slidesPerView: 1.5,
				  spaceBetween: 10
				},
				// when window width is >= 640px
				640: {
				  slidesPerView: 1.7,
				  spaceBetween: 20
				}
			  }
		});

		serviceSlider.dataset.mobile = 'true';
	}

	if (window.innerWidth > 767) {
		serviceSlider.dataset.mobile = 'false';
		if (serviceSlider.classList.contains('swiper-container-initialized')) {
			mySwiper.destroy();
		}
	}
}

mobileSlider()

window.addEventListener('resize', () => {
	mobileSlider();
});


/* Broadcast Tabs
---------------------------------------------------------------*/
const tabsNavigation = document.querySelector('.broadcast__nav'),
	  navButtons = tabsNavigation.querySelectorAll('.broadcast__btn'),
	  tabsItems = document.querySelectorAll('.broadcast__item');


tabsNavigation.addEventListener('click', (el) => {
	let target = el.target;

	if (target && target.classList.contains('broadcast__btn')) {
		navButtons.forEach((btn, i) => {
			if (target == btn) {
				showTabContent (i);
			}
		});
	}
});

function hideTabContent() {
	tabsItems.forEach(el => {
		el.classList.add('hide');
		el.classList.remove('show');
	});

	navButtons.forEach(btn => {
		btn.classList.remove('active');
	});
}

function showTabContent (i = 0) {
	hideTabContent();

	navButtons[i].classList.add('active');
	tabsItems[i].classList.remove('hide');
	tabsItems[i].classList.add('show');
}

showTabContent ()


/* Gallery
---------------------------------------------------------------*/
let gallery = document.querySelector('.gallery');

let gallerySlider = new Swiper(gallery, {
	wrapperClass: 'gallery__images',
	slideClass: 'gallery__item',
	slidesPerView: 1,
	spaceBetween: 5,
	navigation: {
        nextEl: '.gallery__next',
        prevEl: '.gallery__prev',
    },
	pagination: {
        el: '.gallery__pagination',
        type: 'progressbar',
    },
});


/* BodyLock
-----------------------------------------------------------------------------*/
let unlock = true;
function body_lock(delay) {
	let body = document.querySelector("body");
	
    if (body.classList.contains("lock")) {
      body_lock_remove(delay);
    } else {
      body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
	let body = document.querySelector("body");

	if (unlock) {
		let lock_padding = document.querySelectorAll(".lp");

		setTimeout(() => {
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = "0px";
		}
		body.style.paddingRight = "0px";
		body.classList.remove("lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
		unlock = true;
		}, delay);
	}
}

function body_lock_add(delay) {
	let body = document.querySelector("body");

	if (unlock) {
	let lock_padding = document.querySelectorAll(".lp");

	for (let index = 0; index < lock_padding.length; index++) {
		const el = lock_padding[index];
		el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	}
	body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	body.classList.add("lock");

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, delay);
	}
}


/* Spollers 
---------------------------------------------------------------*/
let spollers = document.querySelectorAll(".spoller");
let spollersGo = true;

function spollersInit () {
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			spoller.addEventListener("click", function (e) {
				if (spollersGo) {
					spollersGo = false;
					if (spoller.classList.contains('spoller-767') && window.innerWidth > 767) {
						return false;
					}
					
					spoller.classList.toggle('active');
					_slideToggle(spoller.nextElementSibling);
	
					setTimeout(function () {
						spollersGo = true;
					}, 500);
				}
			});
			if (spoller.classList.contains('active')) {
				_slideToggle(spoller.nextElementSibling);
			}
		}
	}
}

spollersInit();

window.addEventListener('resize', () => {
	if (window.innerWidth > 767) {
		spollers.forEach(spoller => {
			spoller.classList.remove('active');
			spoller.nextElementSibling.style.display = '';
		});
	} else {
		spollersGo = true;
		spollersInit();
	}
});


/* Smoth scroll
-----------------------------------------------------------------------------*/
const linkNav = document.querySelectorAll('.smooth'),
      V = .1; 

let isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

if (linkNav.length > 0) {
    for (let link of linkNav) {
        link.addEventListener('click', function (e) {
			if (isTouch && link.classList.contains('spoller')) {
				e.preventDefault();
				return false
			}
            let w = window.pageYOffset,  
                hash = this.href.replace(/[^#]*(.*)/, '$1'),
                start = null,
                block = document.querySelector(hash),
                marginTop = parseInt(getComputedStyle(block).marginTop),
                t = block.getBoundingClientRect().top - marginTop;
                 
            requestAnimationFrame(step); 
            
            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
                window.scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step)
                }
            }
        });
    }
}


/* Up button
---------------------------------------------------------------*/
let upBtn = document.querySelector('.btn--up');

window.addEventListener('scroll', trackScroll);
upBtn.addEventListener('click', backToTop);

function trackScroll() {
	let scrolled = window.pageYOffset;
	let coords = document.documentElement.clientHeight;

	if (scrolled > coords) {
		upBtn.classList.add('active');
	}
	if (scrolled < coords) {
		upBtn.classList.remove('active');
	}
}

function backToTop() {
	if (window.pageYOffset > 0) {
		window.scrollBy(0, -500);
		setTimeout(backToTop, 0);
	}
}


/* SlideToggle
---------------------------------------------------------------*/
function _slideUp(target, duration = 500) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('slide');
	}, duration);
}

function _slideDown(target, duration = 500) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('slide');
	}, duration);
}

let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('slide')) {
		target.classList.add('slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}