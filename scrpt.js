let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price}€`;
        cartList.appendChild(listItem);
    });

    document.getElementById('totalPrice').textContent = `${total}€`;
}

function checkout() {
    // Aquí iría la integración con una pasarela de pago
    alert("Redirigiendo al pago...");
}
