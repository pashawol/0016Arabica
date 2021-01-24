"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					document.querySelector('html').classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
			document.querySelector('html').classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".tabs__btn")),
			BtnParent: [].slice.call(document.querySelectorAll(".tabs__caption")),
			Content: [].slice.call(document.querySelectorAll(".tabs__content"))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".tabs__btn.active");
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".tabs__content.active");
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName;
	screenName = '03-2.png';

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	} // 	var original = document.querySelector('.headerBlock');
	// 	if (original) {
	// 	var clone = original.cloneNode(true); // "deep" clone
	// 	for (let index = 0; index < 39; index++) {
	// 		document.querySelector('.wrap').insertBefore(clone);
	// 		console.log(index);
	// 	}
	// } 


	$(".sticky-block__close").click(function () {
		$(".sticky-block--js").addClass('d-none');
	});

	function whenResize() {
		var $win = $(window);
		var $marker = $('.sAbout');

		if ($marker[0]) {
			//отслеживаем событие прокрутки страницы
			$win.scroll(function () {
				if ($win.scrollTop() + $win.height() >= $marker.offset().top) {
					// $('#message').html('виден'); //выполняем действия если элемент виден
					$(".sticky-block--js").addClass('active');
				} else {
					$(".sticky-block--js").removeClass('active');
				}
			});
		}
	}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize(); // we'd only like to use iScroll for mobile...

	var controller = new ScrollMagic.Controller(); // define movement of panels

	var wipeAnimation = new TimelineMax().to(".headerBlock", .1, {
		className: "+=start"
	}) // .to(".headerBlock", 1,{ transform: "rotateY(90deg)"} )
	.to(".headerBlock", .6, {
		transform: "rotateY(90deg)"
	}).to(".headerBlock", .6, {
		opacity: 0,
		delay: -.5
	}).to(".sBanner__container", .9, {
		y: "0%",
		opacity: 1,
		delay: -.5
	}).to(".sBanner__text", .9, {
		y: "0%",
		opacity: 1,
		delay: -.5
	}); // create scene to pin and link animation

	new ScrollMagic.Scene({
		triggerElement: ".header--js",
		triggerHook: "onLeave",
		duration: "120%"
	}).setPin(".header--js").setTween(wipeAnimation) // .addIndicators() // add indicators (requires plugin)
	.addTo(controller);
	var tween = new TimelineMax().add([TweenMax.fromTo(".cap-1", 1, {
		y: 150
	}, {
		y: -50
	}), TweenMax.fromTo(".cap-2", 1, {
		y: 50
	}, {
		y: -100
	}), TweenMax.fromTo(".cap-3", 1, {
		y: 100
	}, {
		y: -50
	})]); // build scene

	var scene = new ScrollMagic.Scene({
		triggerElement: ".sMaterials__caps-wrap",
		duration: '80%',
		offset: 0
	}).setTween(tween) // .setPin(".sMaterials")
	// .addIndicators() // add indicators (requires plugin)
	.addTo(controller);
	var tween = new TimelineMax().add([TweenMax.fromTo(".man", 1, {
		y: 100
	}, {
		y: -50
	})]); // build scene

	var scene = new ScrollMagic.Scene({
		triggerElement: ".s-form",
		duration: '80%',
		offset: 0
	}).setTween(tween) // .setPin(".sMaterials")
	// .addIndicators() // add indicators (requires plugin)
	.addTo(controller);
	var defaultSl = {
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true,
		loop: true // pagination: {
		// 	el: ' .swiper-pagination',
		// 	type: 'bullets',
		// 	clickable: true,
		// 	// renderBullet: function (index, className) {
		// 	// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// 	// }
		// },

	};
	var swiper4 = new Swiper('.sAbout__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		spaceBetween: 0,
		navigation: {
			nextEl: '.sAbout .swiper-button-next',
			prevEl: '.sAbout .swiper-button-prev'
		}
	}));
	var gal = new Swiper('.sGal__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 10,
		freeMode: true,
		navigation: {
			nextEl: '.sGal .swiper-button-next' // prevEl: '.sAbout .swiper-button-prev',

		},
		breakpoints: {
			768: {
				spaceBetween: 25
			},
			992: {
				spaceBetween: 50
			}
		},
		lazy: {
			loadPrevNextAmount: 5
		}
	}));
	var swiper5 = new Swiper('.sSert__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: '.sSert .swiper-button-next',
			prevEl: '.sSert .swiper-button-prev'
		},
		breakpoints: {
			480: {
				slidesPerView: 2
			}
		}
	}));
	var swiper6 = new Swiper('.sCatalog__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		spaceBetween: 30,
		navigation: {
			nextEl: '.sCatalog .swiper-button-next',
			prevEl: '.sCatalog .swiper-button-prev'
		},
		breakpoints: {
			576: {
				slidesPerView: 2
			},
			992: {
				slidesPerView: 3
			}
		}
	}));
	var delivery = new Swiper('.sDelivery__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		loop: false,
		spaceBetween: 10,
		navigation: {
			nextEl: '.sDelivery .swiper-button-next',
			prevEl: '.sDelivery .swiper-button-prev'
		},
		breakpoints: {
			768: {
				spaceBetween: 20
			},
			992: {
				spaceBetween: 30
			}
		},
		lazy: {
			loadPrevNextAmount: 5
		}
	}));
	var sert = new Swiper('.sSert2__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 1,
		spaceBetween: 46,
		// loopedSlides: 5,
		navigation: {
			nextEl: '.sSert2 .swiper-button-next',
			prevEl: '.sSert2 .swiper-button-prev'
		},
		breakpoints: {
			992: {
				slidesPerView: 'auto'
			},
			576: {
				slidesPerView: 2
			}
		}
	}));
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
} // window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }