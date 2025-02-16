// carrito de compras

document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart');
    const itemCount = document.getElementById('item-count');
    const totalPriceElement = document.getElementById('total-price');



    const cartItemsContainer = document.getElementById('carrito-vista');



    const checkoutButton = document.getElementById('checkout-button');

    //let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar el carrito desde localStorage
    let totalPrice = 0;

    // Mostrar/Ocultar el carrito
    cartButton.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });
        
});