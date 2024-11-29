document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", () => {
          const product = JSON.parse(button.getAttribute("data-product"));
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`${product.name} added to cart!`);
      });
  });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('show');
});

let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function plusSlides(n) {
  slideIndex += n;
  if (slideIndex > document.getElementsByClassName("slide").length) { slideIndex = 1 }
  if (slideIndex < 1) { slideIndex = document.getElementsByClassName("slide").length }
  showSlides();
}

// Initialize slideshow
showSlides();
