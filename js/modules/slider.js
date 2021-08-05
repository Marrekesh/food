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