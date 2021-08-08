import tabs from './modules/tabs';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import card from './modules/card';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {

    tabs();
    modal('[data-modal]', '.modal', '.modal__close');
    forms();
    card();
    calc();
    slider();



})