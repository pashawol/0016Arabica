
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(document).on('click', '.link-modal', function(e){
			e.preventDefault();
			var href = $(this).attr('href');
			$.fancybox.open({
				src: href,
				arrows: false,
				infobar: false,
				touch: false,
				type: 'inline',
				autoFocus: false,
				i18n: {
					en: {
						CLOSE: "Закрыть",
						NEXT: "Вперед",
						PREV: "Назад",
						// PLAY_START: "Start slideshow",
						// PLAY_STOP: "Pause slideshow",
						// FULL_SCREEN: "Full screen",
						// THUMBS: "Thumbnails",
						// DOWNLOAD: "Download",
						// SHARE: "Share",
						// ZOOM: "Zoom"
					},
				},
				beforeLoad: function () {
					// document.querySelector("html").classList.add("fixed")
				},
				afterClose: function () {
					// document.querySelector("html").classList.remove("fixed")
				},
			});
		})
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.tabs__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.tabs__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.tabs__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					let siblings = element.parentNode.querySelector(`.tabs__btn.active`);
					let siblingsContent = tabs.Content[index].parentNode.querySelector(`.tabs__content.active`);
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active')
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {

		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask(); 
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = '03-2.png';
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	 
			// 	var original = document.querySelector('.headerBlock');
			// 	if (original) {

			// 	var clone = original.cloneNode(true); // "deep" clone
			// 	for (let index = 0; index < 39; index++) {
			// 		document.querySelector('.wrap').insertBefore(clone);
			// 		console.log(index);
			// 	}
			// } 
			$(".sticky-block__close").click(function(){
				$(".sticky-block--js").addClass('d-none');
			})
			function whenResize() { 
				var $win = $(window);
				var $marker = $('.sAbout');
				if($marker[0]) {

					//отслеживаем событие прокрутки страницы
					$win.scroll(function() { 
					if($win.scrollTop() + $win.height() >= $marker.offset().top) {
						// $('#message').html('виден'); //выполняем действия если элемент виден
						$(".sticky-block--js").addClass('active');
					}else{
						$(".sticky-block--js").removeClass('active'); 
					}
				});
			}
			}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();
 
		// we'd only like to use iScroll for mobile...
		var controller = new ScrollMagic.Controller(); 


		// define movement of panels
		var wipeAnimation = new TimelineMax()  
			.to(".headerBlock", .1,{className:"+=start"})
			// .to(".headerBlock", 1,{ transform: "rotateY(90deg)"} )
			.to(".headerBlock", 1,{ transform: "rotateY(90deg)"} )
			.to(".headerBlock", .4,{opacity: 0, delay: -.2} )
			.to(".headerBlock", .1,{className:"+=end"})
			.to(".sBanner__container", .9, {y: "0%", opacity: 1, delay: -.5}, )
			// .to(".sBanner__text", .9, {y: "0%", opacity: 1, delay: -.5}, ) 
			
		// create scene to pin and link animation
		new ScrollMagic.Scene({
			triggerElement: ".header--js",
			triggerHook: "onLeave",
			duration: "100%"
		})
			.setPin(".header--js")
			.setTween(wipeAnimation)
			// .addIndicators() // add indicators (requires plugin)
			.addTo(controller);


			var tween = new TimelineMax ()
					.add([
						TweenMax.fromTo(".cap-1", 1, {y: 150}, {y: -50}),
						TweenMax.fromTo(".cap-2", 1, {y: 50}, {y: -100}),
						TweenMax.fromTo(".cap-3", 1, {y: 100}, {y: -50})
					]);

				// build scene
				var scene = new ScrollMagic.Scene({triggerElement: ".sMaterials__caps-wrap", duration: '80%', offset: 0})
								.setTween(tween)
								// .setPin(".sMaterials")
								// .addIndicators() // add indicators (requires plugin)
								.addTo(controller);
 
			var tween = new TimelineMax ()
					.add([
						TweenMax.fromTo(".man", 1, {y: 100}, {y: -50})
					]);

				// build scene
				var scene = new ScrollMagic.Scene({triggerElement: ".s-form", duration: '80%', offset: 0})
								.setTween(tween)
								// .setPin(".sMaterials")
								// .addIndicators() // add indicators (requires plugin)
								.addTo(controller);
 

	

	let defaultSl = { 
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		
		// pagination: {
		// 	el: ' .swiper-pagination',
		// 	type: 'bullets',
		// 	clickable: true,
		// 	// renderBullet: function (index, className) {
		// 	// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	// }
		// },
	}

	const swiper4 = new Swiper('.sAbout__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		spaceBetween: 0,
		navigation: {
			nextEl: '.sAbout .swiper-button-next',
			prevEl: '.sAbout .swiper-button-prev',
		},
		
	});

	const gal = new Swiper('.sGal__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		// centeredSlides: true,
		spaceBetween: 10,
		freeMode: true,
		navigation: {
			nextEl: '.sGal .swiper-button-next'
			// prevEl: '.sAbout .swiper-button-prev',
		},

		breakpoints: {
			768: { 
				spaceBetween: 25,
			},
			
			992: { 
				spaceBetween: 50
			},
		},

		lazy: {
			loadPrevNextAmount: 5,
		},
	});
	
	const swiper5 = new Swiper('.sSert__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: '.sSert .swiper-button-next',
			prevEl: '.sSert .swiper-button-prev',
		},
		breakpoints: {
		
			480: {
				slidesPerView: 2
			},
		
		}
	});
	const swiper6 = new Swiper('.sCatalog__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: '.sCatalog .swiper-button-next',
			prevEl: '.sCatalog .swiper-button-prev',
		},
		breakpoints: {
		
			768: {
				slidesPerView: 2
			},
		
			992: {
				slidesPerView: 3
			},
		
		}
	});

	
	const delivery = new Swiper('.sDelivery__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 10,
		navigation: {
			nextEl: '.sDelivery .swiper-button-next',
			prevEl: '.sDelivery .swiper-button-prev',
		},

		breakpoints: {
			768: { 
				spaceBetween: 20,
			},
			992: { 
				spaceBetween: 30
			},
		},

		lazy: {
			loadPrevNextAmount: 5,
		},
	});

	const sert = new Swiper('.sSert2__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		spaceBetween: 46,
		// loopedSlides: 5,
		navigation: {
			nextEl: '.sSert2 .swiper-button-next',
			prevEl: '.sSert2 .swiper-button-prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 'auto'
			},

			576: {
				slidesPerView: 2,
			}
		
		}
	});


function myFunction() {
  // Get the checkbox
	var checkBox = document.querySelector(".time-block input");
	if (checkBox ){

		// Get the output text
		var text = document.querySelector(".input-time");
		
		// If the checkbox is checked, display the output text
		if (checkBox.checked == true){
			text.classList.remove('d-none')
		} else {
			text.classList.add('d-none')
		}
	}
	}
	$(".time-block").click(function(){
		myFunction()
	})
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }