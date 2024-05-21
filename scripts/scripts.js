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

const form = document.getElementById("order-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("phone").value;
    const data = {
        name: name,
        email: email,
        message: message
    };
    console.log(data);
    form.reset();
    off();
});