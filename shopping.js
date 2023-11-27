let cartBtn = document.getElementById("cart");
let counter = document.querySelector("#counter");
const total = document.querySelector(".total");
let cartDiv = document.getElementById("cartConteiner");

cartBtn.addEventListener("click", function () {
	if (cartDiv.style.display === "none") {
		cartDiv.style.display = "block";
	} else {
		cartDiv.style.display = "none";
	}
});

let addBtn = document.querySelectorAll(".addBtn");

addBtn.forEach(function (button) {
	button.addEventListener("click", clicked);
});

function clicked(event) {
	let button = event.target;
	let item = button.parentElement;
	let name = item.querySelectorAll(".itemName")[0].innerText;
	let price = item.querySelectorAll(".price")[0].innerText;
	let size = item.querySelectorAll(".size-select")[0].value;
	let color = item.querySelectorAll(".color-select")[0].value;
	let quantity = item.querySelectorAll(".quantity-select")[0].value;
	let image = item.querySelectorAll(".image")[0].src;

	if (size === "" || color === "" || quantity === "") {
		alert("Please select size, color, and quantity before adding to cart!");
		return;
	}

	addItemToCart(name, price, size, color, quantity, image);
	updateCartTotal();
	quantityIncrease();
}

function addItemToCart(name, price, size, color, quantity, image) {
	let cartRow = document.createElement("div");
	cartRow.classList.add("cart-row");
	let cartItems = document.querySelectorAll(".cart-items")[0];
	let itemNames = document.querySelectorAll(".cart-item-title");

	for (let i = 0; i < itemNames.length; i++) {
		if (itemNames[i].innerText == name) {
			alert("This item is already added to the cart!");
			return;
		}
	}

	let cartContent = `<div class="cart-item cart-column">
		<img class="cart-item-image" src="${image}">
		<br>
		<span class="cart-item-title">${name}</span>
		</div>
		<span class="cart-price cart-column">${price}</span>
		<br>
		<span class="cart-size cart-column">Size: ${size}</span>
		<br>
		<span class="cart-color cart-column">Color: ${color}</span>
		<br>
		<span class="cart-quantity cart-item-column">Quantity:${quantity}</span>
		<br>
		<button class="removeBtn" type="button">REMOVE</button>
		</div>`;
	cartRow.innerHTML = cartContent;
	cartRow.addEventListener("click", removeItemFromCart);
	cartItems.append(cartRow);
}

function updateCartTotal() {
	let cartItems = document.querySelector(".cart-items")[0];
	let cartRows = document.querySelectorAll(".cart-row");
	let total = 0;
	for (let i = 0; i < cartRows.length; i++) {
		let cartRow = cartRows[i];
		let price = cartRow.querySelectorAll(".cart-price")[0];
		let priceNum = parseFloat(price.innerText.replace("$", ""));
		let quantity = cartRow.querySelectorAll(".cart-quantity")[0];
		let quantityNum = parseFloat(quantity.innerText.replace("Quantity:", ""));
		total = total + priceNum * quantityNum;
	}
	document.querySelectorAll(".cart-total-price")[0].innerText = "$" + total;
}

function removeItemFromCart(event) {
	let removeBtn = event.target;
	removeBtn.parentElement.remove();
	updateCartTotal();
	quantityIncrease();
}

let buyBtn = document.querySelector(".purchaseBtn");

buyBtn.addEventListener("click", function () {
	let cartItems = document.querySelectorAll(".cart-items")[0];
	let itemsBuyed = "Thank you for the purchase!";
	cartItems.innerHTML = itemsBuyed;
});

function quantityIncrease() {
	let quantitySpan = document.querySelector(".cart-quantity-span");
	let quantity = parseInt(quantitySpan.innerHTML);
	quantity += 1;
	console.log(quantitySpan);
	quantitySpan.innerHTML = quantity;
}

