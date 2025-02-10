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
        <img src="images/${item.name.toLowerCase().replace(/ /g, '-')}.jpg" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 8px;">
        <div>
          <p>${item.name} (${item.quantity})</p>
          <p>$${item.price * item.quantity}</p>
        </div>
        <div class="quantity-controls">
          <button onclick="changeQuantity('${item.name}', -1)">-</button>
          <input type="text" value="${item.quantity}" readonly>
          <button onclick="changeQuantity('${item.name}', 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">×</button>
      `;

      itemsDiv.appendChild(div);
      total += item.price * item.quantity;
    });
  }

  totalDiv.textContent = `الإجمالي: $${total}`;
  document.getElementById('cart-count').textContent = cartCount;
}

// Change Quantity
function changeQuantity(name, change) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(name);
    } else {
      updateCart();
    }
  }
}

// Remove from Cart
function removeFromCart(name) {
  const index = cart.findIndex(i => i.name === name);
  if (index !== -1) {
    cartCount -= cart[index].quantity;
    cart.splice(index, 1);
    updateCart();
  }
}

// Continue Shopping
function continueShopping() {
  closeCart();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert('السلة فارغة! لا يمكن إتمام عملية الدفع.');
    return;
  }
  alert('شكراً لك على الشراء! سيتم توجيهك إلى صفحة الدفع.');
  cart.length = 0;
  cartCount = 0;
  updateCart();
}
