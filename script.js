// script.js
// Hero Slider
var heroSwiper = new Swiper(".heroSwiper", {
  loop: true,
  autoplay: false,  // Completely disabling autoplay
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
});




// Products Slider
var productSwiper = new Swiper(".productSwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: false,  // Completely disabling autoplay
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }
});



// Testimonials Slider
var testimonialSwiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: false,  // Completely disabling autoplay
  pagination: { el: ".swiper-pagination", clickable: true },
});




// Sticky Navbar
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

// Newsletter
const form = document.getElementById("newsletter-form");
const emailInput = document.getElementById("newsletter-email");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  // Save email to localStorage
  let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

  if (subscribers.includes(email)) {
    alert("⚠️ You are already subscribed!");
  } else {
    subscribers.push(email);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
    alert("✅ Thank you for subscribing!");
  }

  form.reset();
});

// --------


// Search Products in Index
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const resultsContainer = document.getElementById("resultsContainer");

function showSearchResults(query) {
  query = query.toLowerCase();
  resultsContainer.innerHTML = "";

  const results = window.allProducts.filter(p =>
    p.name.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = `<p>No products found for "<b>${query}</b>"</p>`;
  } else {
    results.forEach(product => {
      resultsContainer.innerHTML += `
        <a href="${product.page}" class="product-card">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
        </a>
      `;
    });
  }

  searchResults.style.display = "block"; // show results section
  document.getElementById("products").style.display = "none"; // hide featured
}

// Handle button click
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    showSearchResults(query);
  }
});

// Handle Enter key
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchBtn.click();
  }
});

// Category Filter
document.querySelectorAll('.category-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    filterProducts(category);
  });
});

function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  
  products.forEach((product) => {
    if (category === 'all') {
      product.style.display = 'block'; // Show all products
    } else if (product.classList.contains(category)) {
      product.style.display = 'block'; // Show products of selected category
    } else {
      product.style.display = 'none'; // Hide other products
    }
  });
}

// 


document.addEventListener("DOMContentLoaded", () => {
  // Add Event Listener to all "Buy Now" buttons
  const buyNowBtns = document.querySelectorAll(".buy-now");

  buyNowBtns.forEach(button => {
    button.addEventListener("click", function() {
      // Get product data from button attributes
      const productId = this.getAttribute("data-id");
      const productName = this.getAttribute("data-name");
      const productPrice = parseFloat(this.getAttribute("data-price"));
      const productImage = this.getAttribute("data-image");

      // Create product object
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        qty: 1
      };

      // Get existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        // If product is already in cart, increase quantity
        existingProduct.qty += 1;
      } else {
        // If product is not in cart, add it
        cart.push(product);
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Redirect to checkout.html page
      alert(`⚡ ${productName} has been added to your cart! Redirecting to checkout...`);
      window.location.href = "checkout.html"; // Redirect to checkout page
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtns = document.querySelectorAll(".add-cart");

  // Loop through all "Add to Cart" buttons and add event listeners
  addToCartBtns.forEach(button => {
    button.addEventListener("click", function() {
      // Get product data from button attributes
      const productId = this.getAttribute("data-id");
      const productName = this.getAttribute("data-name");
      const productPrice = parseFloat(this.getAttribute("data-price"));
      const productImage = this.getAttribute("data-image");

      // Create product object
      const product = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        qty: 1
      };

      // Get existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        // If product is already in cart, increase quantity
        existingProduct.qty += 1;
      } else {
        // If product is not in cart, add it
        cart.push(product);
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Alert the user and update cart count
      alert(`✅ ${productName} has been added to your cart!`);
      updateCartCount();
    });
  });

  // Update cart item count in navbar
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById("cartCount").textContent = cartCount;
  }

  // Call updateCartCount on page load to reflect the current cart count
  updateCartCount();
});

// ----

