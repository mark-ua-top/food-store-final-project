
let $3da87ddc4a220fcd$var$productsData = [];
let $3da87ddc4a220fcd$var$allProducts = [];
let $3da87ddc4a220fcd$var$currentPage = 1;
const $3da87ddc4a220fcd$var$limit = 9;
let $3da87ddc4a220fcd$var$totalPages = 1;
const $3da87ddc4a220fcd$var$categoriesBox = document.querySelector(".product__categories-box");
const $3da87ddc4a220fcd$var$categoriesMenu = document.querySelector(".product__categories-menu");
const $3da87ddc4a220fcd$var$categoriesText = document.querySelector(".product__categories-text");
const $3da87ddc4a220fcd$var$atozBox = document.querySelector(".product__atoz-box");
const $3da87ddc4a220fcd$var$atozMenu = document.querySelector(".product__atoz-menu");
const $3da87ddc4a220fcd$var$atozText = document.querySelector(".product__atoz-text");
const $3da87ddc4a220fcd$var$searchInput = document.querySelector(".product__search-input");
const $3da87ddc4a220fcd$var$container = document.getElementById("products-container");
const $3da87ddc4a220fcd$var$paginationRoot = document.querySelector(".pagination");
const $3da87ddc4a220fcd$var$firstBtnEl = $3da87ddc4a220fcd$var$paginationRoot.querySelector(".first-page");
const $3da87ddc4a220fcd$var$prevBtnEl = $3da87ddc4a220fcd$var$paginationRoot.querySelector(".prev-page");
const $3da87ddc4a220fcd$var$numsWrapEl = $3da87ddc4a220fcd$var$paginationRoot.querySelector(".page-numbers");
const $3da87ddc4a220fcd$var$nextBtnEl = $3da87ddc4a220fcd$var$paginationRoot.querySelector(".next-page");
const $3da87ddc4a220fcd$var$lastBtnEl = $3da87ddc4a220fcd$var$paginationRoot.querySelector(".last-page");
const $3da87ddc4a220fcd$var$headerCartCounter = document.querySelector(".header__cart-span");
function $3da87ddc4a220fcd$var$toggleMenu(menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
$3da87ddc4a220fcd$var$categoriesBox.addEventListener("click", (e)=>{
    e.stopPropagation();
    $3da87ddc4a220fcd$var$toggleMenu($3da87ddc4a220fcd$var$categoriesMenu);
    $3da87ddc4a220fcd$var$atozMenu.style.display = "none";
});
$3da87ddc4a220fcd$var$atozBox.addEventListener("click", (e)=>{
    e.stopPropagation();
    $3da87ddc4a220fcd$var$toggleMenu($3da87ddc4a220fcd$var$atozMenu);
    $3da87ddc4a220fcd$var$categoriesMenu.style.display = "none";
});
function $3da87ddc4a220fcd$var$selectItem(menu, textElement, selected) {
    menu.querySelectorAll(".product__dropdown-item").forEach((item)=>{
        item.classList.remove("active");
        item.style.color = "rgba(1,1,1,0.5)";
    });
    selected.classList.add("active");
    selected.style.color = "#010101";
    textElement.textContent = selected.textContent;
    menu.style.display = "none";
    $3da87ddc4a220fcd$var$currentPage = 1;
    $3da87ddc4a220fcd$var$applyView();
}
$3da87ddc4a220fcd$var$categoriesMenu.querySelectorAll(".product__dropdown-item").forEach((item)=>{
    item.addEventListener("click", (e)=>$3da87ddc4a220fcd$var$selectItem($3da87ddc4a220fcd$var$categoriesMenu, $3da87ddc4a220fcd$var$categoriesText, e.target));
});
$3da87ddc4a220fcd$var$atozMenu.querySelectorAll(".product__dropdown-item").forEach((item)=>{
    item.addEventListener("click", (e)=>$3da87ddc4a220fcd$var$selectItem($3da87ddc4a220fcd$var$atozMenu, $3da87ddc4a220fcd$var$atozText, e.target));
});
document.addEventListener("click", ()=>{
    $3da87ddc4a220fcd$var$categoriesMenu.style.display = "none";
    $3da87ddc4a220fcd$var$atozMenu.style.display = "none";
});
if ($3da87ddc4a220fcd$var$searchInput) $3da87ddc4a220fcd$var$searchInput.addEventListener("input", ()=>{
    $3da87ddc4a220fcd$var$currentPage = 1;
    $3da87ddc4a220fcd$var$applyView();
});
async function $3da87ddc4a220fcd$var$fetchProducts(page = 1) {
    try {
        const res = await fetch(`https://food-boutique.b.goit.study/api/products?page=${page}&limit=1000`);
        const data = await res.json();
        $3da87ddc4a220fcd$var$allProducts = data.results || [];
        $3da87ddc4a220fcd$var$totalPages = Math.ceil($3da87ddc4a220fcd$var$allProducts.length / $3da87ddc4a220fcd$var$limit);
        if (!$3da87ddc4a220fcd$var$categoriesText.textContent || $3da87ddc4a220fcd$var$categoriesText.textContent === "Categories") $3da87ddc4a220fcd$var$categoriesText.textContent = "Show all";
        $3da87ddc4a220fcd$var$applyView();
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}
function $3da87ddc4a220fcd$var$applyView() {
    let view = [
        ...$3da87ddc4a220fcd$var$allProducts
    ];
    const query = ($3da87ddc4a220fcd$var$searchInput?.value || "").trim().toLowerCase();
    if (query) view = view.filter((p)=>(p.name || "").toLowerCase().includes(query));
    const selectedCategory = ($3da87ddc4a220fcd$var$categoriesText.textContent || "").trim();
    if (selectedCategory && selectedCategory !== "Show all") view = view.filter((p)=>p.category && p.category.replace(/_/g, " ") === selectedCategory);
    const selectedSort = ($3da87ddc4a220fcd$var$atozText.textContent || "").trim();
    if (selectedSort === "A to Z") view.sort((a, b)=>a.name.localeCompare(b.name));
    else if (selectedSort === "Z to A") view.sort((a, b)=>b.name.localeCompare(a.name));
    else if (selectedSort === "Cheap") view.sort((a, b)=>a.price - b.price);
    else if (selectedSort === "Expensive") view.sort((a, b)=>b.price - a.price);
    else if (selectedSort === "Popular") view.sort((a, b)=>b.popularity - a.popularity);
    else if (selectedSort === "Not popular") view.sort((a, b)=>a.popularity - b.popularity);
    $3da87ddc4a220fcd$var$totalPages = Math.ceil(view.length / $3da87ddc4a220fcd$var$limit);
    const startIndex = ($3da87ddc4a220fcd$var$currentPage - 1) * $3da87ddc4a220fcd$var$limit;
    const pageItems = view.slice(startIndex, startIndex + $3da87ddc4a220fcd$var$limit);
    $3da87ddc4a220fcd$var$renderProducts(pageItems);
    $3da87ddc4a220fcd$var$renderPagination();
}
function $3da87ddc4a220fcd$var$renderProducts(products) {
    const pagination = document.querySelector(".pagination");
    $3da87ddc4a220fcd$var$container.classList.add("fade-out");
    setTimeout(()=>{
        $3da87ddc4a220fcd$var$container.innerHTML = "";
        if (!products || products.length === 0) {
            $3da87ddc4a220fcd$var$container.innerHTML = `
<div class="product__nothing-list">
  <h2 class="product__nothing-found">
    Nothing was found for the selected
    <span class="product__nothing-found-span">filters...</span>
  </h2>
  <p class="product__nothing-found-dex">
    Try adjusting your search parameters or browse our range by other criteria
    to find the perfect product for you.
  </p>
</div>
      `;
            pagination.classList.add("pagination__hidden");
            $3da87ddc4a220fcd$var$container.classList.remove("fade-out");
            $3da87ddc4a220fcd$var$container.classList.add("fade-in");
            return;
        }
        products.forEach((product)=>{
            const card = document.createElement("div");
            card.classList.add("product-card");
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
                <div class="product-card__info-details-row-item-value">${(product.category || "").replace(/_/g, " ")}</div>
              </div>
              <div class="product-card__info-details-row-item">
                <div class="product-card__info-details-row-item-label">Size:</div>
                <div class="product-card__info-details-row-item-value">${product.size ?? ""}</div>
              </div>
            </div>
            <div class="product-card__info-details-row">
              <div class="product-card__info-details-row-item">
                <div class="product-card__info-details-row-item-label">Popularity:</div>
                <div class="product-card__info-details-row-item-value">${product.popularity ?? ""}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-card__footer">
          <div class="product-card__footer-price">$${product.price}</div>
          <div class="product-card__footer-button">
 <button class="product-card__footer-button-icon cart-button">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M2.69999 0.900024C2.46129 0.900024 2.23237 0.994846 2.06359 1.16363C1.89481 1.33241 1.79999 1.56133 1.79999 1.80002C1.79999 2.03872 1.89481 2.26764 2.06359 2.43642C2.23237 2.6052 2.46129 2.70002 2.69999 2.70002H3.79799L4.07249 3.79982C4.07521 3.81249 4.07822 3.82509 4.08149 3.83762L5.30369 8.72462L4.49999 9.52742C3.36599 10.6614 4.16879 12.6 5.77259 12.6H13.5C13.7387 12.6 13.9676 12.5052 14.1364 12.3364C14.3052 12.1676 14.4 11.9387 14.4 11.7C14.4 11.4613 14.3052 11.2324 14.1364 11.0636C13.9676 10.8948 13.7387 10.8 13.5 10.8H5.77259L6.67259 9.90002H12.6C12.7671 9.89993 12.9309 9.85333 13.073 9.76543C13.2151 9.67752 13.3299 9.5518 13.4046 9.40232L16.1046 4.00232C16.1731 3.86515 16.2055 3.71273 16.1986 3.55953C16.1917 3.40633 16.1458 3.25744 16.0652 3.12698C15.9846 2.99652 15.872 2.88882 15.738 2.81409C15.6041 2.73937 15.4533 2.70011 15.3 2.70002H5.65199L5.37299 1.58132C5.32423 1.3867 5.21184 1.21395 5.05367 1.09051C4.8955 0.967076 4.70062 0.90003 4.49999 0.900024H2.69999ZM14.4 14.85C14.4 15.2081 14.2578 15.5514 14.0046 15.8046C13.7514 16.0578 13.408 16.2 13.05 16.2C12.6919 16.2 12.3486 16.0578 12.0954 15.8046C11.8422 15.5514 11.7 15.2081 11.7 14.85C11.7 14.492 11.8422 14.1486 12.0954 13.8954C12.3486 13.6423 12.6919 13.5 13.05 13.5C13.408 13.5 13.7514 13.6423 14.0046 13.8954C14.2578 14.1486 14.4 14.492 14.4 14.85ZM5.84999 16.2C6.20803 16.2 6.55141 16.0578 6.80458 15.8046C7.05776 15.5514 7.19999 15.2081 7.19999 14.85C7.19999 14.492 7.05776 14.1486 6.80458 13.8954C6.55141 13.6423 6.20803 13.5 5.84999 13.5C5.49195 13.5 5.14857 13.6423 4.89539 13.8954C4.64222 14.1486 4.49999 14.492 4.49999 14.85C4.49999 15.2081 4.64222 15.5514 4.89539 15.8046C5.14857 16.0578 5.49195 16.2 5.84999 16.2Z"
      fill="#E8E8E2"
    />
  </svg>
</button>

          </div>
        </div>
      `;
            $3da87ddc4a220fcd$var$container.appendChild(card);
        });
        pagination.style.display = "";
        $3da87ddc4a220fcd$var$container.classList.remove("fade-out");
        $3da87ddc4a220fcd$var$container.classList.add("fade-in");
        pagination.classList.remove("pagination__hidden");
    }, 250);
}
function $3da87ddc4a220fcd$var$setupPaginationNav() {
    [
        $3da87ddc4a220fcd$var$firstBtnEl,
        $3da87ddc4a220fcd$var$prevBtnEl,
        $3da87ddc4a220fcd$var$nextBtnEl,
        $3da87ddc4a220fcd$var$lastBtnEl
    ].forEach((btn)=>{
        btn.classList.add("pagination__btn");
    });
    $3da87ddc4a220fcd$var$firstBtnEl.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M17 16L13 12L17 8" stroke="#A3A3A3" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 16L9 12L13 8" stroke="#A3A3A3" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    $3da87ddc4a220fcd$var$prevBtnEl.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M14.5 16L10.5 12L14.5 8" stroke="#A3A3A3" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    $3da87ddc4a220fcd$var$nextBtnEl.innerHTML = `
 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M10.5 16L14.5 12L10.5 8" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    $3da87ddc4a220fcd$var$lastBtnEl.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path d="M8.5 16L12.5 12L8.5 8" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.5 16L16.5 12L12.5 8" stroke="#A3A3A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    $3da87ddc4a220fcd$var$firstBtnEl.onclick = ()=>$3da87ddc4a220fcd$var$changePage(1);
    $3da87ddc4a220fcd$var$prevBtnEl.onclick = ()=>$3da87ddc4a220fcd$var$changePage(Math.max(1, $3da87ddc4a220fcd$var$currentPage - 1));
    $3da87ddc4a220fcd$var$nextBtnEl.onclick = ()=>$3da87ddc4a220fcd$var$changePage(Math.min($3da87ddc4a220fcd$var$totalPages, $3da87ddc4a220fcd$var$currentPage + 1));
    $3da87ddc4a220fcd$var$lastBtnEl.onclick = ()=>$3da87ddc4a220fcd$var$changePage($3da87ddc4a220fcd$var$totalPages);
}
function $3da87ddc4a220fcd$var$renderPagination() {
    $3da87ddc4a220fcd$var$numsWrapEl.innerHTML = "";
    let start = Math.max(1, $3da87ddc4a220fcd$var$currentPage - 1);
    let end = Math.min($3da87ddc4a220fcd$var$totalPages, start + 3);
    if (end - start < 3) start = Math.max(1, end - 3);
    for(let i = start; i <= end; i++){
        const pageBtn = document.createElement("button");
        pageBtn.classList.add("pagination__page-btn");
        pageBtn.textContent = i;
        if (i === $3da87ddc4a220fcd$var$currentPage) pageBtn.classList.add("pagination__page-btn--active");
        pageBtn.onclick = ()=>$3da87ddc4a220fcd$var$changePage(i);
        $3da87ddc4a220fcd$var$numsWrapEl.appendChild(pageBtn);
    }
}
function $3da87ddc4a220fcd$var$changePage(page) {
    if (page < 1 || page > $3da87ddc4a220fcd$var$totalPages || page === $3da87ddc4a220fcd$var$currentPage) return;
    $3da87ddc4a220fcd$var$currentPage = page;
    $3da87ddc4a220fcd$var$applyView();
}
$3da87ddc4a220fcd$var$setupPaginationNav();
$3da87ddc4a220fcd$var$fetchProducts($3da87ddc4a220fcd$var$currentPage);
const $3da87ddc4a220fcd$var$popularList = document.querySelector(".popular__list");
fetch("https://food-boutique.b.goit.study/api/products/popular").then((res)=>res.json()).then((data)=>{
    data.forEach((item)=>{
        const product = document.createElement("div");
        product.classList.add("popular__item");
        product.innerHTML = `
        <div class="popular__item-background"></div>
        <div class="popular__item-content">
          <div class="popular__image-wrapper"></div>
          <img class="popular__image" src="${item.img}" alt="${item.name}" />
          <div class="popular__info">
            <div class="popular__name">${item.name}</div>
            <div class="popular__details">
              <div class="popular__detail"><div class="popular__label">Category:</div><div class="popular__value">${item.category}</div></div>
              <div class="popular__detail"><div class="popular__label">Size:</div><div class="popular__value">${item.size}</div></div>
              <div class="popular__detail"><div class="popular__label">Popularity:</div><div class="popular__value">${item.popularity}</div></div>
            </div>
          </div>
          <button class="popular__popularity cart-button">
  <svg
    class="popular__popularity-indicator"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M1.79995 0.600006C1.64082 0.600006 1.48821 0.66322 1.37569 0.775742C1.26317 0.888264 1.19995 1.04088 1.19995 1.20001C1.19995 1.35914 1.26317 1.51175 1.37569 1.62427C1.48821 1.73679 1.64082 1.80001 1.79995 1.80001H2.53195L2.71495 2.53321C2.71677 2.54165 2.71877 2.55005 2.72095 2.55841L3.53575 5.81641L2.99995 6.35161C2.24395 7.10761 2.77915 8.4 3.84835 8.4H8.99995C9.15908 8.4 9.31169 8.33679 9.42421 8.22427C9.53674 8.11175 9.59995 7.95914 9.59995 7.8C9.59995 7.64087 9.53674 7.48826 9.42421 7.37574C9.31169 7.26322 9.15908 7.20001 8.99995 7.20001H3.84835L4.44835 6.60001H8.39995C8.51135 6.59995 8.62053 6.56888 8.71527 6.51027C8.81 6.45167 8.88656 6.36785 8.93635 6.26821L10.7363 2.66821C10.782 2.57675 10.8036 2.47514 10.799 2.37301C10.7944 2.27088 10.7638 2.17162 10.7101 2.08464C10.6563 1.99767 10.5813 1.92587 10.492 1.87605C10.4027 1.82624 10.3022 1.80006 10.1999 1.80001H3.76795L3.58195 1.05421C3.54945 0.924458 3.47452 0.809291 3.36908 0.726999C3.26363 0.644707 3.13371 0.60001 2.99995 0.600006H1.79995ZM9.59995 9.9C9.59995 10.1387 9.50513 10.3676 9.33635 10.5364C9.16756 10.7052 8.93864 10.8 8.69995 10.8C8.46126 10.8 8.23234 10.7052 8.06355 10.5364C7.89477 10.3676 7.79995 10.1387 7.79995 9.9C7.79995 9.66131 7.89477 9.43239 8.06355 9.26361C8.23234 9.09483 8.46126 9 8.69995 9C8.93864 9 9.16756 9.09483 9.33635 9.26361C9.50513 9.43239 9.59995 9.66131 9.59995 9.9ZM3.89995 10.8C4.13865 10.8 4.36756 10.7052 4.53635 10.5364C4.70513 10.3676 4.79995 10.1387 4.79995 9.9C4.79995 9.66131 4.70513 9.43239 4.53635 9.26361C4.36756 9.09483 4.13865 9 3.89995 9C3.66126 9 3.43234 9.09483 3.26355 9.26361C3.09477 9.43239 2.99995 9.66131 2.99995 9.9C2.99995 10.1387 3.09477 10.3676 3.26355 10.5364C3.43234 10.7052 3.66126 10.8 3.89995 10.8Z"
      fill="#6D8434"
    />
  </svg>
</button>
        </div>
      `;
        $3da87ddc4a220fcd$var$popularList.appendChild(product);
    });
});
const $3da87ddc4a220fcd$var$discountList = document.querySelector(".discount__list");
fetch("https://food-boutique.b.goit.study/api/products/discount").then((res)=>res.json()).then((data)=>{
    let remaining = JSON.parse(localStorage.getItem("discountRemaining")) || [
        ...data
    ];
    if (remaining.length < 2) remaining = [
        ...data
    ];
    remaining.sort(()=>0.5 - Math.random());
    const selected = remaining.slice(0, 2);
    remaining = remaining.slice(2);
    localStorage.setItem("discountRemaining", JSON.stringify(remaining));
    $3da87ddc4a220fcd$var$discountList.innerHTML = "";
    selected.forEach((item)=>{
        const product = document.createElement("div");
        product.classList.add("discount__item");
        product.innerHTML = `
        <div class="discount__background"></div>
        <div class="discount__image-bg"></div>
        <img class="discount__image" src="${item.img}" alt="${item.name}" />
        <div class="discount__name">${item.name}</div>
        <div class="discount__price">$${item.price}</div>
        <div class="discount__button">
<button class="discount__icon cart-button">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M2.70005 0.899994C2.46135 0.899994 2.23244 0.994815 2.06365 1.1636C1.89487 1.33238 1.80005 1.5613 1.80005 1.79999C1.80005 2.03869 1.89487 2.26761 2.06365 2.43639C2.23244 2.60517 2.46135 2.69999 2.70005 2.69999H3.79805L4.07255 3.79979C4.07528 3.81246 4.07828 3.82506 4.08155 3.83759L5.30375 8.72459L4.50005 9.52739C3.36605 10.6614 4.16885 12.6 5.77265 12.6H13.5C13.7387 12.6 13.9677 12.5052 14.1364 12.3364C14.3052 12.1676 14.4 11.9387 14.4 11.7C14.4 11.4613 14.3052 11.2324 14.1364 11.0636C13.9677 10.8948 13.7387 10.8 13.5 10.8H5.77265L6.67265 9.89999H12.6C12.7671 9.8999 12.9309 9.8533 13.073 9.7654C13.2151 9.67749 13.33 9.55177 13.4046 9.40229L16.1046 4.00229C16.1732 3.86512 16.2056 3.7127 16.1987 3.5595C16.1918 3.4063 16.1458 3.25741 16.0652 3.12695C15.9846 2.99649 15.872 2.88879 15.7381 2.81406C15.6042 2.73934 15.4534 2.70008 15.3 2.69999H5.65205L5.37305 1.58129C5.32429 1.38667 5.21191 1.21392 5.05374 1.09048C4.89557 0.967046 4.70068 0.899999 4.50005 0.899994H2.70005ZM14.4 14.85C14.4 15.208 14.2578 15.5514 14.0046 15.8046C13.7515 16.0578 13.4081 16.2 13.05 16.2C12.692 16.2 12.3486 16.0578 12.0955 15.8046C11.8423 15.5514 11.7 15.208 11.7 14.85C11.7 14.492 11.8423 14.1486 12.0955 13.8954C12.3486 13.6422 12.692 13.5 13.05 13.5C13.4081 13.5 13.7515 13.6422 14.0046 13.8954C14.2578 14.1486 14.4 14.492 14.4 14.85ZM5.85005 16.2C6.20809 16.2 6.55147 16.0578 6.80464 15.8046C7.05782 15.5514 7.20005 15.208 7.20005 14.85C7.20005 14.492 7.05782 14.1486 6.80464 13.8954C6.55147 13.6422 6.20809 13.5 5.85005 13.5C5.49201 13.5 5.14863 13.6422 4.89545 13.8954C4.64228 14.1486 4.50005 14.492 4.50005 14.85C4.50005 15.208 4.64228 15.5514 4.89545 15.8046C5.14863 16.0578 5.49201 16.2 5.85005 16.2Z"
      fill="#E8E8E2"
    />
  </svg>
</button>
        </div>
      `;
        $3da87ddc4a220fcd$var$discountList.appendChild(product);
    });
}).catch((err)=>console.error("Error fetching discount products:", err));
let $3da87ddc4a220fcd$var$cart = JSON.parse(localStorage.getItem("cart")) || [];
function $3da87ddc4a220fcd$var$updateCartCounter() {
    if ($3da87ddc4a220fcd$var$headerCartCounter) $3da87ddc4a220fcd$var$headerCartCounter.textContent = $3da87ddc4a220fcd$var$cart.length;
}
// при завантаженні сторінки
document.addEventListener("DOMContentLoaded", ()=>{
    $3da87ddc4a220fcd$var$updateCartCounter();
});
document.addEventListener("click", (e)=>{
    const addBtn = e.target.closest(".cart-button");
    if (!addBtn) return;
    const productBlock = addBtn.closest(".product-card") || addBtn.closest(".popular__item") || addBtn.closest(".discount__item");
    if (!productBlock) return;
    const img = productBlock.querySelector("img")?.src || "";
    const name = productBlock.querySelector(".product-card__info-name, .popular__name, .discount__name")?.textContent || "";
    const category = productBlock.querySelector(".product-card__info-details-row-item-value, .popular__value")?.textContent || "";
    const size = productBlock.querySelector(".product-card__info-details-row:nth-child(1) .product-card__info-details-row-item-value:last-child")?.textContent || "";
    const priceText = productBlock.querySelector(".product-card__footer-price, .discount__price")?.textContent || "$0";
    const price = parseFloat(priceText.replace("$", "")) || 0;
    const product = {
        img: img,
        name: name,
        category: category,
        size: size,
        price: price
    };
    $3da87ddc4a220fcd$var$cart.push(product);
    localStorage.setItem("cart", JSON.stringify($3da87ddc4a220fcd$var$cart));
    $3da87ddc4a220fcd$var$updateCartCounter();
});


//# sourceMappingURL=food-store-final-project.298f6351.js.map
