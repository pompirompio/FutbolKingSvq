let cart = [];
let total = 0;

function selectProduct(name, price) {
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
    const instagram = document.getElementById('instagram').value;
    const direccion = document.getElementById('direccion').value;
    const mensaje = document.getElementById('mensaje').value;

    saveOrderToFirebase(cart, total, instagram, direccion, mensaje);

    alert("¡Gracias por tu compra! Te contactaremos a través de Instagram.");
    cart = [];
    total = 0;
    updateCart();
}

function saveOrderToFirebase(cart, total, instagram, direccion, mensaje) {
    const db = firebase.firestore();

    db.collection("orders").add({
        items: cart,
        total: total,
        instagram: instagram,
        direccion: direccion,
        mensaje: mensaje,
        date: new Date(),
    })
    .then((docRef) => {
        console.log("Pedido guardado con ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error añadiendo documento: ", error);
    });
}
