let cart = [];
let total = 0;

function selectProduct(name, price) {
    // Añadimos el producto al carrito
    cart.push({ name, price });

    // Actualizamos el precio total
    total += price;

    // Actualizamos la lista del carrito en la interfaz
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';  // Limpiamos la lista antes de agregar los elementos

    cart.forEach(item => {
        // Creamos un elemento de lista para cada producto
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price}€`;
        cartList.appendChild(listItem);
    });

    // Actualizamos el precio total en la interfaz
    document.getElementById('totalPrice').textContent = `${total}€`;
}

function checkout() {
    // Obtenemos los datos del formulario
    const instagram = document.getElementById('instagram').value;
    const direccion = document.getElementById('direccion').value;
    const mensaje = document.getElementById('mensaje').value;

    // Llamamos a la función para guardar la orden en Firebase
    saveOrderToFirebase(cart, total, instagram, direccion, mensaje);

    // Mostramos un mensaje de agradecimiento
    alert("¡Gracias por tu compra! Te contactaremos a través de Instagram.");

    // Limpiamos el carrito y el precio total
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

