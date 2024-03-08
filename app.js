"use strict";
// ===DOM elements===
// buttons
const mainPrevButton = document.querySelector(".prev-button");
const mainNextButton = document.querySelector(".next-button");
const overlayCloseButton = document.querySelector(".overlay__close-button");
const overlayPrevButton = document.querySelector(".overlay__prev-button");
const overlayNextButton = document.querySelector(".overlay__next-button");
const qtyButtonPlus = document.querySelector(".qty-button--plus");
const qtyButtonMinus = document.querySelector(".qty-button--minus");
const menuButton = document.querySelector(".header__menu-icon");
const itemsQtyLabel = document.querySelector(".purchase__qty");
const addToCartButton = document.querySelector(".add-to-cart-button");
const cartButton = document.querySelector(".purchase__cart-button");
const cartDeleteButton = document.querySelector(".cart-order__delete-button");
const checkoutButton = document.querySelector(".cart-order__checkout-btn");

// display elements
const inputQtyNumberContainer = document.querySelector(".qty-number");
const headerNavigation = document.querySelector(".header__nav");
const headerLinks = headerNavigation.querySelectorAll(".nav__link");
const thumbnailsContainer = document.querySelector(
  ".product__thumbnail-images-container"
);
const cartOrderContainer = document.querySelector(".cart-order__container");
const emptyCartContainer = document.querySelector(".card-order__details-empty");
const filledCartContainer = document.querySelector(".card-order__details-full");
const cartPricePerItemContainer = document.querySelector(".cart-order__price");
const cartTotalPriceContainer = document.querySelector(
  ".cart-order__total-sum"
);
const cartQtyContainer = document.querySelector(".cart-order__qty");

// overlay
const overlay = document.querySelector(".overlay");
const overlayPicsContainer = document.querySelector(".overlay__pics-container");
const overlayMainPicContainer = document.querySelector(
  ".overlay__main-pic-container"
);

// images
const mainImage = document.querySelector(".product__image--main");
const thumbnailImagesMain = document.querySelectorAll(
  ".product__image--thumbnail"
);
const thumbnailImagesOverlay = document.querySelectorAll(".overlay__thumbnail");

// ===CONSTANTS===
const MAX_IMG_NUM = 4;
const PRICE = 125;
const STORAGE_KEY = "itemsInCart";

// ===VARIABLES===
let currentImage = 1;
let productsInCartNumber = JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0;
let inputQty = 0;

// ===FUNCTIONS===
function saveItemsinLocalStorage() {
  localStorage.setItem(STORAGE_KEY, productsInCartNumber);
}

function showCurrentImage() {
  mainImage.setAttribute("src", `./images/image-product-${currentImage}.jpg`);
  overlayMainPicContainer.style.backgroundImage = `url(
        "./images/image-product-${currentImage}.jpg"
      )`;
}

function showLargeImg() {
  if (!matchMedia("(max-width: 500px)").matches) {
    overlay.style.display = "block";
    overlayPicsContainer.style.display = "grid";
  }
}

function showNextImage() {
  unstyleAllThumbnails();
  if (currentImage === MAX_IMG_NUM) {
    currentImage = 1;
  } else {
    currentImage++;
  }
  showCurrentImage();
  styleSelectedThumbnail();
}

function showPreviousImage() {
  unstyleAllThumbnails();
  if (currentImage === 1) {
    currentImage = MAX_IMG_NUM;
  } else {
    currentImage--;
  }
  showCurrentImage();
  styleSelectedThumbnail();
}

function showInputQtyNumber() {
  inputQtyNumberContainer.textContent = inputQty;
}

function increaseInputQty() {
  inputQty++;
  showInputQtyNumber();
}

function decreaseQty() {
  if (inputQty === 0) {
    return;
  } else {
    inputQty--;
  }
  showInputQtyNumber();
}

// Thumbnail functions
function unstyleAllThumbnails() {
  thumbnailImagesMain.forEach((img) =>
    img.classList.remove("product__image--thumbnail-selected")
  );
  thumbnailImagesOverlay.forEach((img) =>
    img.classList.remove("product__image--thumbnail-selected")
  );
}

function styleSelectedThumbnail() {
  thumbnailImagesMain.forEach((image) => {
    if (+image.dataset.number === currentImage) {
      image.classList.add("product__image--thumbnail-selected");
    }
  });

  thumbnailImagesOverlay.forEach((image) => {
    if (+image.dataset.number === currentImage) {
      image.classList.add("product__image--thumbnail-selected");
    }
  });
}

function handleSelectedThumbnail(thumbnail) {
  currentImage = +thumbnail.dataset.number;
  showCurrentImage();
  styleSelectedThumbnail();
}

// Menu functions
function openMenu() {
  menuButton.setAttribute("src", "./images/icon-close.svg");
  overlay.style.display = "block";
  overlayPicsContainer.style.display = "none";
  headerLinks.forEach((link) => {
    link.classList.add("nav__link--mobile");
  });
}

function closeMenu() {
  menuButton.setAttribute("src", "./images/icon-menu.svg");
  overlay.style.display = "none";
  headerLinks.forEach((link) => {
    link.classList.remove("nav__link--mobile");
  });
}

function handleMenu() {
  menuButton.classList.toggle("change");
  headerNavigation.classList.toggle("header__nav-mobile--open");
  headerNavigation.classList.contains("header__nav-mobile--open")
    ? openMenu()
    : closeMenu();
}

// cart functions
function showItemsQtyLabel() {
  if (productsInCartNumber === 0) {
    itemsQtyLabel.style.display = "none";
  } else {
    itemsQtyLabel.style.display = "flex";
    itemsQtyLabel.textContent = productsInCartNumber;
  }
}

function showCartContent() {
  if (productsInCartNumber !== 0) {
    emptyCartContainer.style.display = "none";
    filledCartContainer.style.display = "block";
    cartTotalPriceContainer.textContent = `${PRICE * productsInCartNumber},00`;
    cartPricePerItemContainer.textContent = `${PRICE},00`;
    cartQtyContainer.textContent = productsInCartNumber;
  } else {
    emptyCartContainer.style.display = "flex";
    filledCartContainer.style.display = "none";
    emptyCartContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
}

function clearCart() {
  productsInCartNumber = 0;
  inputQty = 0;
  saveItemsinLocalStorage();
  showCartContent();
  showItemsQtyLabel();
  showInputQtyNumber();
}

function addItemsToCart() {
  productsInCartNumber = productsInCartNumber + inputQty;
  inputQty = 0;
  saveItemsinLocalStorage();
  showItemsQtyLabel();
  showInputQtyNumber();
  showCartContent();
}

function handleCartButtonClick() {
  cartOrderContainer.classList.toggle("display-none");
  showCartContent();
}

function handleCheckout() {
  clearCart();
  emptyCartContainer.innerHTML =
    "<p>Thank you for your order. Our manager will contact you as soon as possible!</p>";
}

// EVENT LISTENERS
// buttons
menuButton.addEventListener("click", handleMenu);

mainNextButton.addEventListener("click", showNextImage);
mainPrevButton.addEventListener("click", showPreviousImage);

overlayCloseButton.addEventListener("click", () => {
  overlay.style.display = "none";
});
overlayNextButton.addEventListener("click", showNextImage);
overlayPrevButton.addEventListener("click", showPreviousImage);

qtyButtonPlus.addEventListener("click", increaseInputQty);
qtyButtonMinus.addEventListener("click", decreaseQty);

addToCartButton.addEventListener("click", addItemsToCart);
cartButton.addEventListener("click", handleCartButtonClick);
cartDeleteButton.addEventListener("click", clearCart);
checkoutButton.addEventListener("click", handleCheckout);

// images
mainImage.addEventListener("click", showLargeImg);

thumbnailImagesMain.forEach((img) => {
  img.addEventListener("click", () => {
    unstyleAllThumbnails();
    handleSelectedThumbnail(img);
  });
});

thumbnailImagesOverlay.forEach((img) => {
  img.addEventListener("click", () => {
    unstyleAllThumbnails();
    handleSelectedThumbnail(img);
  });
});

// overlay
overlay.addEventListener("click", (event) => {
  if (event.target.className === "overlay__pics-container") {
    overlay.style.display = "none";
  } else if (event.target.className === "overlay") {
    handleMenu();
  }
});

// INIT
function init() {
  showItemsQtyLabel();
}

init();
