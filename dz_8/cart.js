'use strict';

const cartEl = document.querySelector('.cart');
const featuredItemsEl = document.querySelector('.featuredItems');
const cartCounterEl = document.querySelector('.cartIconWrap span');
const cartTotalValueEl = document.querySelector('.cartTotalValue');
const cartHeader = document.querySelector('.cartHeader');

const cart = {};

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  cartEl.classList.toggle('hidden');
});

featuredItemsEl.addEventListener('click', event => {
  if (!event.target.closest('.addToCart')) {
    return;
  }

  const featuredItemEl = event.target.closest('.featuredItem');
  const id = +featuredItemEl.dataset.id;
  const name = featuredItemEl.dataset.name;
  const price = +featuredItemEl.dataset.price;

  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in cart)) {
    cart[id] = { name, price, count: 0 };
  }

  cart[id].count++;
  cart[id].total = cart[id].price * cart[id].count;

  cartCounterEl.textContent = getCartTotalCount().toString();
  cartTotalValueEl.textContent = getCartTotalValue().toFixed(2);

  renderCartList(id);
}

function getCartTotalCount() {
  return Object.values(cart).reduce((acc, prod) => acc + prod.count, 0);
}

function getCartTotalValue() {
  return Object.values(cart).reduce((acc, prod) => acc + prod.total, 0);
}

function renderCartList(id) {
  const cartRowEl = cartEl.querySelector(`.cartRow[data-productID="${id}"]`);

  if (!cartRowEl) {
    renderMarkup(id);
    return;
  }

  cartRowEl.querySelector('.productCount').textContent = cart[id].count;
  cartRowEl.querySelector('.productTotalRow').textContent = cart[id].total;
}

function renderMarkup(productID) {
  const productRow = `
    <div class="cartRow" data-productID="${productID}">
      <div>${cart[productID].name}</div>
      <div>
        <span class="productCount">${cart[productID].count}</span> шт.
      </div>
      <div>$${cart[productID].price}</div>
      <div>
        $<span class="productTotalRow">${cart[productID].total}</span>
      </div>
    </div>
  `;

  cartHeader.insertAdjacentHTML('afterend', productRow);
}