document.addEventListener('DOMContentLoaded', () => {

    //modal
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

    //forms


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

   //card

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
    
    //slider

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

    //tabs

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

    //calc

    const


})