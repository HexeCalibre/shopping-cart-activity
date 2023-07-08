// EVENT LISTENER DELETE ITEM
let removeCartItemButtons = document.querySelectorAll(".btn-danger");
for (let i = 0; i < removeCartItemButtons.length; i++) {
  let button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}

// EVENT LISTENER QUANTITY COUNT
let quantityInputs = document.querySelectorAll(".cart-quantity-input");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

// EVENT LISTENER ADD TO CART BUTTON
let addToCartButtons = document.querySelectorAll(".shop-item-button");
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}


// EVENT LISTENER PURCHASE BUTTON
document
  .querySelectorAll(".btn-purchase")[0]
  .addEventListener("click", purchaseClicked);

// FUNCTION RESET
function purchaseClicked() {
  alert("Thank you for your purchase");
  let cartItems = document.querySelectorAll(".cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}
// FUNCTION DELETE ITEM
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// FUNCTION QUANTITY DEFAULT METHODOLOGY
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// EVENT LISTENER ADD TO CARD BUTTON
function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.querySelectorAll(".shop-item-title")[0].innerText;
  let price = shopItem.querySelectorAll(".shop-item-price")[0].innerText;
  let imageSrc = shopItem.querySelectorAll(".shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}
// FUNCTION ADD TO CART BUTTON
function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.querySelectorAll(".cart-items")[0];
  let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }

// ADD TO CART ROW ITEM RENDER
  let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .querySelectorAll(".btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .querySelectorAll(".cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// DISPLAY
function updateCartTotal() {
  // PARENT OR WRAPPER CONTAINER
  let cartItemContainer = document.querySelector(".cart-items");
  // ROW ITEM
  let cartRows = cartItemContainer.querySelectorAll(".cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-prize")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + (price + quantity);
  }

  total = Math.round(total * 100) / 100;

  document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
}
