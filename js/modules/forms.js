import {modalOpen, modalClose} from './modal';
import {postData} from '../services/services';

function forms(modalSelector) {
    const forms = document.querySelectorAll('form');
    
    // const postData = async (url, data) => {
    //     let res = await fetch(url, {
    //         method: 'POST',
                
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: data
    //     });

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // }

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(desc =>  {
                console.log('Все збс');
                console.log(desc);
            }).catch(() => {
                console.log('Что-то пошло не так');     
            }).finally(() => {
                form.reset();
                modalClose(modalSelector);
            });
        });
    });
}

export default forms;