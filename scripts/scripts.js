function on() {
    // displays overlay content
    const turnOn = document.getElementById("overlay");
    turnOn.style.display = "block";
    // turn off vertical scroll 
    const overflow = document.querySelector("body");
    overflow.style.overflow = "hidden";
}

function off() {
    // hides overlay content
    const turnOff = document.getElementById("overlay");
    turnOff.style.display = "none";
    // turn on vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "";
}


document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Retrieve cart items from local storage
    const order = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize arrays to store titles and quantities, and a variable for total price
    const titles = [];
    const quantities = [];
    let totalPrice = 0;

    const titleQuantityPairs = [];

    order.forEach(item => {
        titleQuantityPairs.push(`${item.title} (Quantity: ${item.quantity})`);
    });

    const titlesWithQuantityPairs = titleQuantityPairs.join(', ');

    // Loop through each item in the cart
    order.forEach(item => {
        // Extract title and quantity for each item and accumulate total price
        titles.push(item.title);
        quantities.push(item.quantity);
        totalPrice += item.totalPrice;
    });

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const senderMessage = document.getElementById("message").value;
    const delivery = document.getElementById("delivery").checked;
    const pickup = document.getElementById("pick-up").checked;
    const dineIn = document.getElementById("dine-in").checked;
    const orderType = pickup ? "Pickup" : dineIn ? "Dine-In" : delivery ? "Delivery" : "Not specified";
    const dateTime = new Date().toLocaleString();

    const title = order.length > 0 ? order[0].title : "No items in cart";


    const contents = {
        content: `New Order From ${name}  ${"<@&1242651341235683458>"}`,
        embeds: [
            {
                title: "__**Order Details**__",
                fields: [
                    { name: 'Order Type', value: orderType },
                    { name: 'Name', value: name },
                    { name: 'Email', value: email },
                    { name: 'Phone Number', value: phone },
                    { name: 'Message', value: senderMessage },
                    { name: '\u200B', value: '**__Receipt__**' },
                    { name: '', value: '' },
                    { name: 'Order Titles', value: titlesWithQuantityPairs }, // Join titles array into a string
                    { name: '', value: '' },// Join quantities array into a string
                    { name: '', value: '' },
                    { name: 'Total Price', value: `$${totalPrice.toFixed(2)}` }, // Display total price formatted to 2 decimal places
                    { name: '', value: '' },
                    { name: 'Date and Time', value: dateTime },
                ],
            }
        ]
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1242371903306600518/j0spX6ZDGj09BlI-1aK-X6XdpdyAvbRgch86GvnNTgGHvKg_6F19dr9B5_R6MXdgidPT';

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contents)
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully');
            window.location.href = 'order.html';
        } else {
            alert('An unknown error occurred on the server.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An unknown error occurred on the server.');
    });
});








// Cart

document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the "Add to Cart" button on the order page
    document.getElementById('add-item-button').addEventListener('click', () => {
        const dropdown = document.getElementById('item-dropdown');
        const selectedItem = dropdown.options[dropdown.selectedIndex];
        const title = selectedItem.text.split(' - ')[0];
        const price = selectedItem.getAttribute('data-price');
        const quantity = parseInt(document.getElementById('item-quantity').value, 10);

        if (title && quantity > 0) {
            addItemToCart(title, price, quantity);
        }
    });

    // Function to add an item to the cart
    function addItemToCart(title, price, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const pickup = document.getElementById('delivery').checked;
        const deliveryFee = pickup ? 25 : 0; // Assuming a delivery fee of $5 when pickup is selected
    
        const totalPrice = (parseFloat(price) + deliveryFee) * quantity; // Calculate total price including delivery fee
    
        const existingItem = cart.find(item => item.title === title);
    
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice += totalPrice; // Update total price of existing item
        } else {
            cart.push({ title, price: parseFloat(price), quantity, totalPrice });
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
    
    // Function to render cart items
    function renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;  // If cartItemsContainer is not present, exit the function
        cartItemsContainer.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach(item => {
            const cartRow = document.createElement('div');
            cartRow.classList.add('cart-row');
                cartRow.innerHTML = 
        `<div class="cart-item cart-column">
            <span class="cart-item-name1">Item:</span>
            <span class="cart-item-title">${item.title}</span>
        </div>
        <span class="quantity-box">Quantity: </span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${item.quantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    ;
            cartItemsContainer.append(cartRow);

            // Event listener for the remove button
            cartRow.querySelector('.btn-danger').addEventListener('click', () => {
                removeItemFromCart(item.title);
            });

            // Event listener for the quantity input
            cartRow.querySelector('.cart-quantity-input').addEventListener('change', event => {
                updateCartItemQuantity(item.title, event.target.value);
            });
        });

        updateCartTotal();
    }

    // Function to update the cart total
    function updateCartTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let deliveryFee = 0;
    

        // Check if pickup option is selected
        const pickup = document.getElementById('delivery').checked;
        if (pickup) {
            // Add your delivery fee amount here
            deliveryFee = 25; // Example delivery fee of $5
        }
    
        // Calculate total including delivery fee
        const totalPrice = total + deliveryFee;
    
        // Update total price display
        
        document.querySelectorAll('.cart-total-price').forEach(totalPriceElement => {
            totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        });
    }

    // Function to remove an item from the cart
    function removeItemFromCart(title) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.title !== title);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    // Function to update cart item quantity
    function updateCartItemQuantity(title, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.title === title);
        if (item) {
            item.quantity = parseInt(quantity, 10);
            if (item.quantity <= 0) {
                removeItemFromCart(title);
            } else {
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartTotal();
            }
        }
    }

    // Initial render of cart items
    renderCartItems();
});
