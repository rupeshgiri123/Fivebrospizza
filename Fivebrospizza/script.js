// Pizza menu data
const pizzas = [
  {
    name: 'Margherita',
    description: 'Classic delight with fresh tomatoes, mozzarella, and basil.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Pepperoni',
    description: 'Loaded with pepperoni and cheese.',
    price: 14.49,
    image: 'https://images.unsplash.com/photo-1548365328-8b849c0b6e56?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Veggie Lovers',
    description: 'Mushrooms, peppers, onions, olives, and tomatoes.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc660be?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'BBQ Chicken',
    description: 'Grilled chicken, BBQ sauce, onions, and cheese.',
    price: 15.49,
    image: 'https://images.unsplash.com/photo-1601924582975-7d4b6b2b1e90?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Hawaiian',
    description: 'Ham, pineapple, and mozzarella cheese.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
  }
];

let order = [];

function renderMenu() {
  const menu = document.getElementById('pizza-menu');
  menu.innerHTML = '';
  pizzas.forEach((pizza, idx) => {
    const item = document.createElement('div');
    item.className = 'menu-item';
    item.innerHTML = `
      <img src="${pizza.image}" alt="${pizza.name}">
      <h3>${pizza.name}</h3>
      <p>${pizza.description}</p>
      <div class="price">$${pizza.price.toFixed(2)}</div>
      <button class="btn" data-idx="${idx}">Add to Order</button>
    `;
    menu.appendChild(item);
  });
  // Add event listeners
  menu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-idx');
      addToOrder(idx);
    });
  });
}

function addToOrder(idx) {
  order.push(pizzas[idx]);
  updateOrderSummary();
}

function updateOrderSummary() {
  const summary = document.getElementById('order-summary');
  if (order.length === 0) {
    summary.value = '';
    return;
  }
  let text = '';
  let total = 0;
  order.forEach((pizza, i) => {
    text += `${i+1}. ${pizza.name} - $${pizza.price.toFixed(2)}\n`;
    total += pizza.price;
  });
  text += `---\nTotal: $${total.toFixed(2)}`;
  summary.value = text;
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  // Form submit
  const form = document.getElementById('order-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (order.length === 0) {
      alert('Please add at least one pizza to your order!');
      return;
    }
    form.classList.add('hidden');
    document.getElementById('order-success').classList.remove('hidden');
    order = [];
    updateOrderSummary();
    setTimeout(() => {
      form.reset();
      form.classList.remove('hidden');
      document.getElementById('order-success').classList.add('hidden');
    }, 4000);
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}); 