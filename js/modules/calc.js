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

export default calc;