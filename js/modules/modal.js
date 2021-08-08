function modalOpen(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}


function modal(dataModalSelector, modalSelector, modalCloseSelector) {
    const btn = document.querySelectorAll(dataModalSelector);
    const modal = document.querySelector(modalSelector);
    const modalCloseBtn = document.querySelector(modalCloseSelector);

    btn.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOpen(modalSelector);
        })
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalCloseBtn ) {
            modalClose(modalSelector)
        }
    });
}

export default modal;
export {modalOpen};
export {modalClose};