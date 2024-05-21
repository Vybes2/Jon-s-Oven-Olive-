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

function orderSubmit() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    const webhook = "https://discord.com/api/webhooks/1242371903306600518/j0spX6ZDGj09BlI-1aK-X6XdpdyAvbRgch86GvnNTgGHvKg_6F19dr9B5_R6MXdgidPT";

    const contents = {
        "content": "New Order From " + name,
        "embeds": [
            {
                "title": "Order Details",
                "description": "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone,
                "color": 16711680
            }
        ]
    };

    const request = new XMLHttpRequest();
    request.open("POST", webhook);
    request.setRequestHeader('Content-type', 'application/json');
    const params = {
        content: contents
    }
    request.send(JSON.stringify(params));
}