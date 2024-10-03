const list = document.getElementById('toggleList');
const items = list.getElementsByClassName('toggle-list__item'); // или используйте querySelectorAll

Array.from(items).forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('toggle-list__item-open');
    });
});