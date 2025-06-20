document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const ticketForm = document.getElementById("ticketForm");
  const buyButton = document.getElementById("buyButton");

  increaseBtn.addEventListener("click", function () {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  decreaseBtn.addEventListener("click", function () {
    if (parseInt(quantityInput.value) > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });

  ticketForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const quantity = document.getElementById("quantity").value;

    window.location.href = `confirmation.html?email=${encodeURIComponent(
      email
    )}&quantity=${quantity}`;
  });

  buyButton.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)";
  });

  buyButton.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});
