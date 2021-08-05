document.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs');
    const slider = require('./modules/slider');
    const modal = require('./modules/modal');
    const forms = require('./modules/forms');
    const card = require('./modules/card');
    const calc = require('./modules/calc');

    tabs();
    slider();
    modal();
    forms();
    card();
    calc();



})