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

function sendWebhook(event) {
    event.preventDefault();


    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const senderMessage = document.getElementById("message").value;
    const dateTime = new Date().toLocaleString();
    console.log(name, email, phone);
    const webhook = "https://discord.com/api/webhooks/1242371903306600518/j0spX6ZDGj09BlI-1aK-X6XdpdyAvbRgch86GvnNTgGHvKg_6F19dr9B5_R6MXdgidPT";


    const contents = {
        content: "New Order From " + name + " at " + dateTime + "<@&1242651341235683458>",
        embeds: [
            {
                title: "Order Details",
                fields: [
                    { name: 'Name', value: name },
                    // { name: 'Discord', value: senderDiscord },
                    { name: 'Email', value: email },
                    { name: 'Phone Number', value: phone },
                    { name: 'Message', value: senderMessage },
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
}

