// Variables
const cart = [];
let cartCount = 0;

// Toggle Cart Modal
function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.classList.toggle('open');
}

// Close Cart Modal
function closeCart() {
  document.getElementById('cart-modal').classList.remove('open');
}

// Add to Cart
function addToCart(button) {
  const card = button.parentElement;
  const name = card.dataset.name;
  const price = +card.dataset.price;

  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  cartCount++;
  updateCart();
}

// Update Cart UI
function updateCart() {
  const itemsDiv = document.getElementById('cart-items');
  const totalDiv = document.getElementById('cart-total');
  const emptyMessage = document.getElementById('empty-cart-message');

  itemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <p>${item.name} (${item.quantity})</p>
        <p>$${item.price * item.quantity}</p>
      `;
      itemsDiv.appendChild(div);
      total += item.price * item.quantity;
    });
  }

  totalDiv.textContent = `الإجمالي: $${total}`;
  document.getElementById('cart-count').textContent = cartCount;
}

// Continue Shopping
function continueShopping() {
  closeCart();
}

// Checkout
function checkout() {
  alert('شكراً لك على الشراء! سيتم توجيهك إلى صفحة الدفع.');
  cart.length = 0;
  cartCount = 0;
  updateCart();
}