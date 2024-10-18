// Получаем все продукты и корзину
const items = document.querySelectorAll('.item');
const cart = document.getElementById('cart');
const payButton = document.getElementById('pay-button');
let itemsInCart = 0;

// Функция перетаскивания с мыши
items.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragend', handleDragEnd);
});

// Добавление поддержки touch для смартфонов
items.forEach(item => {
    item.addEventListener('touchstart', handleTouchStart, false);
    item.addEventListener('touchmove', handleTouchMove, false);
    item.addEventListener('touchend', handleTouchEnd, false);
});

// Корзина
cart.addEventListener('dragover', handleDragOver);
cart.addEventListener('drop', handleDrop);

// Функции для мыши
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.src); // Передача ссылки на изображение
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault(); // Обязательное действие для события drop
}

function handleDrop(e) {
    e.preventDefault();
    addItemToCart(e.dataTransfer.getData('text/plain'));
}

// Функции для touch (мобильных)
function handleTouchStart(e) {
    this.style.opacity = '0.4'; // Визуальная индикация перетаскивания
}

function handleTouchMove(e) {
    const touch = e.targetTouches[0];
    e.target.style.left = touch.pageX + 'px';
    e.target.style.top = touch.pageY + 'px';
}

function handleTouchEnd(e) {
    this.style.opacity = '1';
    const touch = e.changedTouches[0];
    const dropTarget = document.elementFromPoint(touch.pageX, touch.pageY);

    if (dropTarget === cart) {
        addItemToCart(e.target.src);
    }
}

// Добавляем товар в корзину
function addItemToCart(itemSrc) {
    const img = document.createElement('img');
    img.src = itemSrc;
    img.classList.add('dropped-item');
    cart.appendChild(img);
    
    itemsInCart++;

    // Показываем кнопку "Оплатить корзину", если 3 предмета в корзине
    if (itemsInCart >= 3) {
        showPayButton();
    }
}

// Показать кнопку "Оплатить корзину"
function showPayButton() {
    payButton.classList.add('show');
    payButton.classList.add('blink');
}

// Переход на сайт Яндекс Лавки при клике на кнопку
payButton.addEventListener('click', () => {
  window.location.href = 'https://lavka.yandex';
});