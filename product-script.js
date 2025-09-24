// --- Product Rating ---
const stars = document.querySelectorAll(".rating span");
let currentRating = 0;
const savedRating = localStorage.getItem(`${window.productData.id}-rating`);
if (savedRating) currentRating = parseInt(savedRating);

function updateStars(rating) {
  stars.forEach((s, i) => {
    s.textContent = i < rating ? "★" : "☆";
    s.classList.toggle("filled", i < rating);
  });
}

stars.forEach((s, i) => {
  s.addEventListener("mouseover", () => updateStars(i + 1));
  s.addEventListener("mouseout", () => updateStars(currentRating));
  s.addEventListener("click", () => {
    currentRating = i + 1;
    updateStars(currentRating);
    localStorage.setItem(`${window.productData.id}-rating`, currentRating);
  });
});

updateStars(currentRating);

// --- Cart and Buy Now ---
const buyNowBtn = document.querySelector(".buy-now");
const addCartBtn = document.querySelector(".add-cart");

buyNowBtn.addEventListener("click", () => {
  const product = { ...window.productData, qty: 1 };
  localStorage.setItem("cart", JSON.stringify([product]));
  alert("⚡ Redirecting to checkout...");
  window.location.href = "./checkout.html";
});

addCartBtn.addEventListener("click", () => {
  const product = window.productData;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p.id === product.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`✅ ${product.name} has been added to your cart!`);
});

// --- Review System ---
const reviewForm = document.getElementById("reviewForm");
const reviewText = document.getElementById("reviewText");
const reviewsList = document.getElementById("reviewsList");
const reviewStars = document.querySelectorAll(".review-rating span");
let reviewRating = 0;

function fillStars(rating) {
  reviewStars.forEach((s, i) => {
    s.textContent = i < rating ? "★" : "☆";
    s.classList.toggle("filled", i < rating);
  });
}

reviewStars.forEach((s, i) => {
  s.addEventListener("mouseover", () => fillStars(i + 1));
  s.addEventListener("mouseout", () => fillStars(reviewRating));
  s.addEventListener("click", () => { reviewRating = i + 1; fillStars(reviewRating); });
});

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem(`${window.productData.id}-reviews`)) || [];
  reviewsList.innerHTML = "";
  reviews.forEach(r => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `<div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
                     <p>${r.text}</p>`;
    reviewsList.appendChild(div);
  });
}

reviewForm.addEventListener("submit", e => {
  e.preventDefault();
  if (reviewRating === 0) { alert("⭐ Please select a star rating!"); return; }
  const reviews = JSON.parse(localStorage.getItem(`${window.productData.id}-reviews`)) || [];
  reviews.push({ rating: reviewRating, text: reviewText.value });
  localStorage.setItem(`${window.productData.id}-reviews`, JSON.stringify(reviews));
  reviewText.value = "";
  reviewRating = 0;
  fillStars(reviewRating);
  loadReviews();
  alert("✅ Your review has been added!");
});

loadReviews();
