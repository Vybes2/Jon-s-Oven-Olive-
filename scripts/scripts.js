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