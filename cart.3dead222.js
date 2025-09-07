
const $8a282ee307615b5e$var$cartList = document.querySelector(".cart-sec__cart-list");
const $8a282ee307615b5e$var$headerCartCounter = document.querySelector(".header__cart-span");
const $8a282ee307615b5e$var$cartSecCounter = document.querySelector(".cart-sec__cart-span");
const $8a282ee307615b5e$var$cartSumSpan = document.querySelector(".cart-sec__sum-span");
const $8a282ee307615b5e$var$deleteAllButton = document.querySelector(".cart-sec__delete-all-button");
let $8a282ee307615b5e$var$cart = JSON.parse(localStorage.getItem("cart")) || [];
function $8a282ee307615b5e$var$updateCartCounter() {
    const totalItems = $8a282ee307615b5e$var$cart.reduce((sum, p)=>sum + (p.quantity || 1), 0);
    $8a282ee307615b5e$var$headerCartCounter.textContent = totalItems;
    $8a282ee307615b5e$var$cartSecCounter.textContent = totalItems;
    const totalSum = $8a282ee307615b5e$var$cart.reduce((sum, product)=>sum + product.price * (product.quantity || 1), 0);
    $8a282ee307615b5e$var$cartSumSpan.textContent = `$${totalSum.toFixed(2)}`;
}
function $8a282ee307615b5e$var$renderCart() {
    $8a282ee307615b5e$var$cartList.innerHTML = "";
    $8a282ee307615b5e$var$cart.forEach((product, index)=>{
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
<div class="my-cart__item">
  <img src="${product.img}" alt="${product.name}" class="my-cart__item__image"/>
  <div class="my-cart__item__info">
    <div class="my-cart__item__info-name">${product.name}</div>
    <div class="my-cart__item__info-div">
      <div class="my-cart__item__info-category">
        Category: <span class="my-cart__item__info-category-span">${product.category}</span>
      </div>
      <div class="my-cart__item__info-size">
        Size: <span class="my-cart__item__info-size-span">${product.size}</span>
      </div>
    </div>
    <div class="my-cart__item__quantity" data-index="${index}">
      <button class="qty-btn decrease">\u{2212}</button>
      <input type="number" class="qty-input" value="${product.quantity || 1}" min="1">
      <button class="qty-btn increase">+</button>
    </div>
    <div class="my-cart__item__price">$${(product.price * (product.quantity || 1)).toFixed(2)}</div>
  </div>
  <button class="my-cart__item__remove-button" data-index="${index}">
    \u{2715}
  </button>
</div>
    `;
        $8a282ee307615b5e$var$cartList.appendChild(item);
    });
}
document.addEventListener("click", (e)=>{
    const addBtn = e.target.closest(".cart-button");
    if (addBtn) {
        const productCard = addBtn.closest(".product-card");
        if (!productCard) return;
        const product = {
            img: productCard.querySelector(".product-card__image").src,
            name: productCard.querySelector(".product-card__info-name").textContent,
            category: productCard.querySelector(".product-card__info-details-row-item-value").textContent,
            size: productCard.querySelector(".product-card__info-details-row:nth-child(1) .product-card__info-details-row-item-value:last-child").textContent,
            price: parseFloat(productCard.querySelector(".product-card__footer-price").textContent.replace("$", "")) || 0,
            quantity: 1
        };
        const existing = $8a282ee307615b5e$var$cart.find((p)=>p.name === product.name && p.size === product.size);
        if (existing) existing.quantity++;
        else $8a282ee307615b5e$var$cart.push(product);
        localStorage.setItem("cart", JSON.stringify($8a282ee307615b5e$var$cart));
        $8a282ee307615b5e$var$updateCartCounter();
        $8a282ee307615b5e$var$renderCart();
        return;
    }
    const deleteBtn = e.target.closest(".my-cart__item__remove-button");
    if (deleteBtn) {
        const index = deleteBtn.dataset.index;
        $8a282ee307615b5e$var$cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify($8a282ee307615b5e$var$cart));
        $8a282ee307615b5e$var$updateCartCounter();
        $8a282ee307615b5e$var$renderCart();
        return;
    }
    const deleteAllBtn = e.target.closest(".cart-sec__delete-all-button");
    if (deleteAllBtn) {
        $8a282ee307615b5e$var$cart = [];
        localStorage.setItem("cart", JSON.stringify($8a282ee307615b5e$var$cart));
        $8a282ee307615b5e$var$updateCartCounter();
        $8a282ee307615b5e$var$renderCart();
        return;
    }
    const increaseBtn = e.target.closest(".qty-btn.increase");
    const decreaseBtn = e.target.closest(".qty-btn.decrease");
    if (increaseBtn) {
        const index = increaseBtn.parentElement.dataset.index;
        $8a282ee307615b5e$var$cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify($8a282ee307615b5e$var$cart));
        $8a282ee307615b5e$var$updateCartCounter();
        $8a282ee307615b5e$var$renderCart();
        return;
    }
    if (decreaseBtn) {
        const index = decreaseBtn.parentElement.dataset.index;
        if ($8a282ee307615b5e$var$cart[index].quantity > 1) $8a282ee307615b5e$var$cart[index].quantity--;
        else $8a282ee307615b5e$var$cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify($8a282ee307615b5e$var$cart));
        $8a282ee307615b5e$var$updateCartCounter();
        $8a282ee307615b5e$var$renderCart();
        return;
    }
});
document.addEventListener("input", (e)=>{
    if (e.target.classList.contains("qty-input")) {
        const index = e.target.parentElement.dataset.index;
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        $8a282ee307615b5e$var$cart[index].quantity = val;
        localStorage.setItem("cart", JSON.stringify($8a282ee307615b5e$var$cart));
        $8a282ee307615b5e$var$updateCartCounter();
        $8a282ee307615b5e$var$renderCart();
    }
});
$8a282ee307615b5e$var$updateCartCounter();
$8a282ee307615b5e$var$renderCart();


//# sourceMappingURL=cart.3dead222.js.map
