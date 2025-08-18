let productsData = [];

const categoriesBox = document.querySelector('.product__categories-box');
const categoriesMenu = document.querySelector('.product__categories-menu');
const categoriesText = document.querySelector('.product__categories-text');

const atozBox = document.querySelector('.product__atoz-box');
const atozMenu = document.querySelector('.product__atoz-menu');
const atozText = document.querySelector('.product__atoz-text');

function toggleMenu(menu) {
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

categoriesBox.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(categoriesMenu);
});

atozBox.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu(atozMenu);
});

function selectItem(menu, textElement, selected) {
  menu.querySelectorAll('.product__dropdown-item').forEach(item => {
    item.classList.remove('active');
    item.style.color = 'rgba(1,1,1,0.5)';
  });
  selected.classList.add('active');
  selected.style.color = '#010101';
  textElement.textContent = selected.textContent;
  menu.style.display = 'none';

  if (menu === categoriesMenu) {
    filterProducts();
  }
  if (menu === atozMenu) {
    sortProducts();
  }
}

categoriesMenu.querySelectorAll('.product__dropdown-item').forEach(item => {
  item.addEventListener('click', (e) => selectItem(categoriesMenu, categoriesText, e.target));
});

atozMenu.querySelectorAll('.product__dropdown-item').forEach(item => {
  item.addEventListener('click', (e) => selectItem(atozMenu, atozText, e.target));
});

document.addEventListener('click', () => {
  categoriesMenu.style.display = 'none';
  atozMenu.style.display = 'none';
});

const container = document.getElementById('products-container');

async function fetchProducts() {
  try {
    const res = await fetch('https://food-boutique.b.goit.study/api/products');
    const data = await res.json();
    productsData = data.results;
    categoriesText.textContent = 'Show all';
    renderProducts(productsData);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

function renderProducts(products) {
  container.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <div class="product-card__bg"></div>
      <div class="product-card__image-bg"></div>
      <img class="product-card__image" src="${product.img}" alt="${product.name}" />
      <div class="product-card__info">
        <div class="product-card__info-name">${product.name}</div>
        <div class="product-card__info-details">
          <div class="product-card__info-details-row">
            <div class="product-card__info-details-row-item">
              <div class="product-card__info-details-row-item-label">Category:</div>
              <div class="product-card__info-details-row-item-value">${product.category.replace(/_/g,' ')}</div>
            </div>
            <div class="product-card__info-details-row-item">
              <div class="product-card__info-details-row-item-label">Size:</div>
              <div class="product-card__info-details-row-item-value">${product.size}</div>
            </div>
          </div>
          <div class="product-card__info-details-row">
            <div class="product-card__info-details-row-item">
              <div class="product-card__info-details-row-item-label">Popularity:</div>
              <div class="product-card__info-details-row-item-value">${product.popularity}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="product-card__footer">
        <div class="product-card__footer-price">$${product.price}</div>
        <div class="product-card__footer-button">
          <div class="product-card__footer-button-icon">
            <div class="product-card__footer-button-icon-inner"></div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function filterProducts() {
  const selectedCategory = categoriesText.textContent;
  if (selectedCategory === 'Show all') {
    renderProducts(productsData);
  } else {
    const filtered = productsData.filter(p => p.category.replace(/_/g,' ') === selectedCategory);
    renderProducts(filtered);
  }
}

function sortProducts() {
  const selectedSort = atozText.textContent;
  let sorted = [...productsData];

  if (selectedSort === 'A to Z') sorted.sort((a,b) => a.name.localeCompare(b.name));
  else if (selectedSort === 'Z to A') sorted.sort((a,b) => b.name.localeCompare(a.name));
  else if (selectedSort === 'Cheap') sorted.sort((a,b) => a.price - b.price);
  else if (selectedSort === 'Expensive') sorted.sort((a,b) => b.price - a.price);
  else if (selectedSort === 'Popular') sorted.sort((a,b) => b.popularity - a.popularity);
  else if (selectedSort === 'Not popular') sorted.sort((a,b) => a.popularity - b.popularity);

  const filteredCategory = categoriesText.textContent;
  if (filteredCategory !== 'Show all') {
    sorted = sorted.filter(p => p.category.replace(/_/g,' ') === filteredCategory);
  }

  renderProducts(sorted);
}

fetchProducts();
