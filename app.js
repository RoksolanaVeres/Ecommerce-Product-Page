// DOM elements
// buttons
const mainPrevButton = document.querySelector(".prev-button");
const mainNextButton = document.querySelector(".next-button");
const overlayPrevButton = document.querySelector(".overlay__prev-button");
const overlayNextButton = document.querySelector(".overlay__next-button");
const qtyButtonPlus = document.querySelector(".qty-button--plus");
const qtyButtonMinus = document.querySelector(".qty-button--minus");
const menuButton = document.querySelector(".header__menu-icon");

// display elements
const qtyNumber = document.querySelector(".qty-number");
const headerNavigation = document.querySelector(".header__nav");
const headerLinks = headerNavigation.querySelectorAll(".nav__link");
const thumbnailsContainer = document.querySelector(
  ".product__thumbnail-images-container"
);

// images
const mainImage = document.querySelector(".product__image--main");
const thumbnailImagesMain = document.querySelectorAll(
  ".product__image--thumbnail"
);
const thumbnailImagesOverlay = document.querySelectorAll(".overlay__thumbnail");

// overlay
const overlay = document.querySelector(".overlay");
const overlayPicsContainer = document.querySelector(".overlay__pics-container");
const overlayMainPicContainer = document.querySelector(
  ".overlay__main-pic-container"
);

// CONSTANTS
const MAX_IMG_NUM = 4;

// VARIABLES
let currentImage = 1;
let currentQty = 0;

// FUNCTIONS
function showCurrentImage() {
  mainImage.setAttribute("src", `./images/image-product-${currentImage}.jpg`);
  overlayMainPicContainer.style.backgroundImage = `url(
        "./images/image-product-${currentImage}.jpg"
      )`;
}

function showLargeImg() {
  overlay.style.display = "block";
  overlayPicsContainer.style.display = "grid";
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

function increaseQty() {
  currentQty++;
  qtyNumber.textContent = currentQty;
}

function decreaseQty() {
  if (currentQty === 0) {
    return;
  } else {
    currentQty--;
  }
  qtyNumber.textContent = currentQty;
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
  headerNavigation.classList.toggle("header__nav-mobile--open");
  headerNavigation.classList.contains("header__nav-mobile--open")
    ? openMenu()
    : closeMenu();
}

// EVENT LISTENERS
mainImage.addEventListener("click", showLargeImg);

mainNextButton.addEventListener("click", showNextImage);
mainPrevButton.addEventListener("click", showPreviousImage);

overlayNextButton.addEventListener("click", showNextImage);
overlayPrevButton.addEventListener("click", showPreviousImage);

qtyButtonPlus.addEventListener("click", increaseQty);
qtyButtonMinus.addEventListener("click", decreaseQty);

menuButton.addEventListener("click", handleMenu);
overlay.addEventListener("click", (event) => {
  if (event.target.className === "overlay__pics-container") {
    overlay.style.display = "none";
  } else if (event.target.className === "overlay") {
    handleMenu();
  }
});

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
