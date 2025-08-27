
const $8a282ee307615b5e$var$cartList = document.querySelector(".cart-sec__cart-list");
const $8a282ee307615b5e$var$headerCartCounter = document.querySelector(".header__cart-span");
const $8a282ee307615b5e$var$cartSecCounter = document.querySelector(".cart-sec__cart-span");
const $8a282ee307615b5e$var$cartSumSpan = document.querySelector(".cart-sec__sum-span");
const $8a282ee307615b5e$var$deleteAllButton = document.querySelector(".cart-sec__delete-all-button");
let $8a282ee307615b5e$var$cart = JSON.parse(localStorage.getItem("cart")) || [];
function $8a282ee307615b5e$var$updateCartCounter() {
    $8a282ee307615b5e$var$headerCartCounter.textContent = $8a282ee307615b5e$var$cart.length;
    $8a282ee307615b5e$var$cartSecCounter.textContent = $8a282ee307615b5e$var$cart.length;
    const totalSum = $8a282ee307615b5e$var$cart.reduce((sum, product)=>sum + parseFloat(product.price || 0), 0);
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
    <div class="my-cart__item__price">$${product.price}</div>
  </div>
  <button class="my-cart__item__remove-button" data-index="${index}">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M15.625 5.6832L14.3168 4.375L10 8.6918L5.6832 4.375L4.375 5.6832L8.6918 10L4.375 14.3168L5.6832 15.625L10 11.3082L14.3168 15.625L15.625 14.3168L11.3082 10L15.625 5.6832Z" fill="#010101"/>
    </svg>
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
            price: parseFloat(productCard.querySelector(".product-card__footer-price").textContent.replace("$", "")) || 0
        };
        $8a282ee307615b5e$var$cart.push(product);
        localStorage.setItem("cart", JSON.stringify($8a282ee307615b5e$var$cart));
        $8a282ee307615b5e$var$updateCartCounter();
        $8a282ee307615b5e$var$renderCart();
        return;
    }
    // змінено селектор на новий клас
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
});
$8a282ee307615b5e$var$updateCartCounter();
$8a282ee307615b5e$var$renderCart();


//# sourceMappingURL=cart.e2c4b170.js.map
