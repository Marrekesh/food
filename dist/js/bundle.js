/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    const element = document.querySelector('.calculating__result span');
    
    // let sex = 'famale', 
    //     height, weight, age, 
    //     ratio = 1.375;

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    };

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'famale'
        localStorage.setItem('sex', 'famale');
    }



    function calculateTo() {

        if (!sex || !height || !weight || !age || !ratio) {
            element.textContent = '____';
            return
        }

        if (sex === 'famale') {
            element.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)* ratio) 
        } else {
            element.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)* ratio)
        }
    }

    calculateTo();

    function setLocalStorageClass(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);

            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            };

            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        })
    }

    setLocalStorageClass('#gender div', 'calculating__choose-item_active');
    setLocalStorageClass('.calculating__choose_big div', 'calculating__choose-item_active');

    function getStatic(selector, activeClass) {
       const elements = document.querySelectorAll(selector);

       elements.forEach(elem => {
           elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id') )
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calculateTo();
           });
       });
    }


    getStatic('#gender div', 'calculating__choose-item_active');
    getStatic('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamic(selector) {

        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calculateTo();
        })

    }

    getDynamic('#height');
    getDynamic('#weight');
    getDynamic('#age');

}

module.exports = calc;

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((module) => {

function card() {
    class AddCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector)
            this.price = price;
            this.classes = classes;
        }
 
        render() {
            
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                this.classes = 'menu__item'
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className))
            };

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;

            this.parent.append(element);
        }
    };
 
    async function getCard(url) {

        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
    return await res.json();
}
 
    getCard('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new AddCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });

}

module.exports = card;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll('form');
    
    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
                
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(desc =>  {
                console.log('Все збс');
                console.log(desc);
            }).catch(() => {
                console.log('Что-то пошло не так');     
            }).finally(() => {
                form.reset();
                modalClose()
            });
        });
    });
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const btn = document.querySelectorAll('[data-modal]');
        modal = document.querySelector('.modal');
        modalCloseBtn = document.querySelector('.modal__close');
        body = document.body;


    function modalOpen() {
        modal.style.display = 'block';
        body.style.overflow = 'hidden';
    }

    function modalClose() {
        modal.style.display = 'none';
        body.style.overflow = '';
    }

    btn.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOpen();
        })
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalCloseBtn ) {
            modalClose()
        }
    });
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next');
    let count = 1;
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    showSlide(count)

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`
    } else {
        total.textContent = slides.length;
    };

    function showSlide(n) {
        if(n > slides.length) {
            count = 1
        };

        if(n < 1) {
            count = slides.length
        };

        slides.forEach(slide => {
            slide.style.display = 'none'
        });

        slides[count - 1].style.display = 'block';


        if(slides.length < 10) {
            current.textContent = `0${count}`
        } else {
            current.textContent = count;
        };

    };

    function plusSlide(n) {
        showSlide(count += n)
    }

    prev.addEventListener('click', () => {
        plusSlide(-1)
    });

    next.addEventListener('click', () => {
        plusSlide(1)
    })

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {

    const tabContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items'),
          tab = document.querySelectorAll('.tabheader__item');
    
    function hideTab() {
        tabContent.forEach(item => {
            item.style.display = 'none';  
        });
        tab.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    };

    
    function showTab(i = 0) {
        tabContent[i].style.display = 'block';
        tab[i].classList.add('tabheader__item_active');
    };


    hideTab();
    showTab();

    tabParent.addEventListener('click', (e) => {
        const target = e.target;
        tab.forEach((item, i) => {
            if (target == item) {
                hideTab()
                showTab(i)
            }
        });
    });
}

module.exports = tabs;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
document.addEventListener('DOMContentLoaded', () => {

    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
    const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
    const card = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js");
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");

    tabs();
    slider();
    modal();
    forms();
    card();
    calc();



})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map