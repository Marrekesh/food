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