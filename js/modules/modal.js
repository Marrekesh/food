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