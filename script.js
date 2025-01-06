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
    // Enviar pedido a Firebase
    saveOrderToFirebase(cart, total);

    alert("¡Gracias por tu compra! Te contactaremos para más detalles.");
    cart = [];
    total = 0;
    updateCart();
}

function saveOrderToFirebase(cart, total) {
    const db = firebase.firestore();

    db.collection("orders").add({
        items: cart,
        total: total,
        date: new Date(),
    })
    .then((docRef) => {
        console.log("Pedido guardado con ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error añadiendo documento: ", error);
    });
}
