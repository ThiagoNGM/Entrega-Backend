const socket = io();

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;

    if (productName.trim()) {
        socket.emit('newProduct', { name: productName });
        productName.value = '';
    }
});

socket.on('productList', (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.name;
        productList.appendChild(li);
    });
});
