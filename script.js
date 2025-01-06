document.getElementById("pedido").addEventListener("submit", function(event) {
    event.preventDefault();

    const shirtType = document.getElementById("shirtType").value;
    const size = document.getElementById("size").value;

    let price = 25;  // Default price for "actual"
    if (shirtType === "retro") {
        price = 30;
    }

    alert(`Pedido realizado:\nCamiseta: ${shirtType}\nTamaño: ${size}\nPrecio: ${price}€`);
});
