let itemList =  document.querySelector('.items');
let cart = document.querySelector('.cart');
let cartList = document.querySelector('.cart-list');
let total = document.querySelector('.total');
let tax = document.querySelector('.tax');
let subtotal = document.querySelector('.subtotal');


let items = [
    {
        id: 1,
        name: 'Mouse',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 50
    },
    {
        id: 2,
        name: 'Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D',
        price: 150
    },
    {
        id: 3,
        name: 'Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9uaXRvcnxlbnwwfHwwfHx8MA%3D%3D',
        price: 300
    },
    {
        id: 4,
        name: 'Mouse Pad',
        image: 'https://images.unsplash.com/photo-1631098983935-5363b8e50edb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 20
    },
    {
        id: 5,
        name: 'Printer',
        image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: 200
    },
    {
        id: 6,
        name: 'Laptop',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww',
        price: 1000
    }
]

function initItem() {
    items.forEach((value, key) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('style', 'width: 15rem;');
        card.innerHTML = `
            <img src="${value.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title text-center">${value.name}</h4>
                <p class="card-text text-center">Price: ${value.price}</p>
                <button class="add-to-cart btn btn-dark form-control" onclick="addToCart(${key})">Add to Cart</button>
            </div>`;
        itemList.appendChild(card);
    });
}

initItem();

let cartLists = [];

function addToCart(key) {
    if (cartLists[key] == null) {
        cartLists[key] = JSON.parse(JSON.stringify(items[key]));
        cartLists[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart() {
    cartList.innerHTML = '';
    let totalPrice = 0;
    cartLists.forEach((value, key) => {
        totalPrice = totalPrice + value.price;

        if (value != null) {
            let listItem = document.createElement('li');
            listItem.setAttribute('class', 'list-group-item');
            listItem.innerHTML = `
                <div><img src="${value.image}" style="width: 80px"/></div>
                <div><h5 class="mt-1">${value.name}</h5></div>
                <div><h6 class="mt-2">${value.price.toLocaleString()}</h6></div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count m-2">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            cartList.appendChild(listItem);
        }
    });

    // Calculate subtotal, tax, and total
    subtotal.innerText = totalPrice.toLocaleString();
    tax.innerText = (totalPrice * 0.12).toLocaleString(); // Assuming 12% tax
    total.innerText = (totalPrice + parseFloat(tax.innerText)).toLocaleString();

    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete cartLists[key];
    } else {
        cartLists[key].quantity = quantity;
        cartLists[key].price = quantity * items[key].price;
    }
    reloadCart();
}

function clearCart() {
    // Get the subtotal, tax and total elements
const subtotalElement = document.querySelector('.subtotal');
const taxElement = document.querySelector('.tax');
const totalElement = document.querySelector('.total');
const cartListElement = document.querySelector('.cart-list');

// Get the cart items
const cartItems = [];

// Function to update the subtotal, tax and total when an item is added or removed
function updateTotal() {
    let subtotal = 0;
    let tax = 0;

    // Calculate the subtotal
    cartItems.forEach((item) => {
        subtotal += item.price * item.quantity;
    });

    // Calculate the tax
    tax = subtotal * 0.12;

    // Update the subtotal, tax and total elements
    subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
    taxElement.textContent = `Rs. ${tax.toFixed(2)}`;
    totalElement.textContent = `Rs. ${subtotal + tax.toFixed(2)}`;
}

// Function to add an item to the cart
function addItem(item) {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ id: item.id, price: item.price, quantity: 1 });
    }

    updateTotal();

    // Add the item to the cart list
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} x ${item.quantity}`;
    cartListElement.appendChild(listItem);
}

// Function to remove an item from the cart
function removeItem(id) {
    const index = cartItems.findIndex((cartItem) => cartItem.id === id);
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateTotal();
        // Remove the item from the cart list
        const listItem = document.querySelector(`li[data-item-id="${id}"]`);
        if (listItem) {
            listItem.remove();
        }
    }
}

// Function to clear the cart
function clearCart() {
    cartItems.length = 0;
    updateTotal();
    // Clear the cart list
    cartListElement.innerHTML = '';
}

// Example usage:
addItem({ id: 1, name: 'Item 1', price: 10 });
addItem({ id: 2, name: 'Item 2', price: 20 });
removeItem(1);
addItem({ id: 1, name: 'Item 1', price: 10 }); // This will increment the quantity of Item 1
clearCart();
    cartLists = [];
    reloadCart();
}
 In script.js, add the following code:
function calculateChanges() {
  const subtotal = parseFloat($(".subtotal").text().replace("$", ""));
  const tax = parseFloat($(".tax").text().replace("$", ""));
  const total = subtotal + tax;
  const cashTendered = parseFloat($("#cash-tendered").val());
  
  if (cashTendered >= total) {
    const changes = cashTendered - total;
    $(".changes").text(`$${changes.toFixed(2)}`);
  } else {
    $(".changes").text("Insufficient payment");
  }
}

