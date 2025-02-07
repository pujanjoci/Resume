let menu = document.querySelector("#menu-icon-js");
let menuicon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let navtc = document.querySelector("#nav-tc-js");

menu.onclick = () => {
    menuicon.classList.toggle("bx-x");
    navbar.classList.toggle("open");
    navtc.classList.toggle("nav-touch-close-open");
};

navtc.onclick = () => {
    menuicon.classList.toggle("bx-x");
    navbar.classList.remove("open");
    navtc.classList.remove("nav-touch-close-open");
    navtc.classList.remove("nav-tc-z");
    navtc.classList.remove("nav-LR-TC");
};

/* Scroll behavior */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    document.getElementById("header").classList.add("scrolled");
    if (currentScrollPos === 0) {
        document.getElementById("header").classList.remove("scrolled");
    }
    if (navtc.classList.contains("nav-touch-close-open")) {
        return;
    }
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("header").style.top = "0";
    } else {
        document.getElementById("header").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
};

const contactSection = document.querySelector(".contact-section");
const formSection = document.querySelector(".form-section");
const contactSubmitAfter = document.querySelector(".contact-submit-after");
const csaOK = document.querySelector(".csa-ok");

const contactForm = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const errorDiv = document.querySelector(".error");
const emailErrorDiv = document.querySelector(".email-error");
const contactButton = document.querySelector(".contact-button");
const contactLoad = document.querySelector(".contact-load");
const submitText = document.querySelector(".submit-text");

const LOCK_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const SHOW_LOCK_TEXT_DURATION = 10000; // 10 seconds

if (csaOK) {
    csaOK.onclick = () => {
        contactSubmitAfter.classList.remove("show");
        formSection.classList.remove("hide");
        contactSection.classList.remove("csa-cs");
        contactForm.classList.remove("csa-cf");
        contactButton.classList.remove("loading");
        contactLoad.classList.remove("show");
        submitText.classList.remove("hide");
    };
}

// Check if the form should be locked
function checkLockStatus() {
    const storedTime = localStorage.getItem("formTime");

    if (storedTime) {
        const elapsedTime = Date.now() - parseInt(storedTime, 10);
        if (elapsedTime < LOCK_DURATION) {
            lockSubmitButton(LOCK_DURATION - elapsedTime);
        } else {
            unlockSubmitButton();
        }
    }
}

function lockSubmitButton(timeLeft) {
    contactButton.disabled = true;
    contactButton.style.cursor = "not-allowed";
    contactButton.style.opacity = "0.5";
    contactButton.innerHTML = "Locked (10 Mins)";

    // Show "Locked (10 Mins)" for 10 seconds, then change to "Submit" (greyed out)
    setTimeout(() => {
        contactButton.innerHTML = "Submit";
    }, SHOW_LOCK_TEXT_DURATION);

    const interval = setInterval(() => {
        const remainingTime = parseInt(localStorage.getItem("formTime"), 10) + LOCK_DURATION - Date.now();
        if (remainingTime <= 0) {
            clearInterval(interval);
            unlockSubmitButton();
        }
    }, 60000);
}

function unlockSubmitButton() {
    contactButton.disabled = false;
    contactButton.style.cursor = "pointer";
    contactButton.style.opacity = "1";
    contactButton.innerHTML = "Submit";
    localStorage.removeItem("formTime");
}

// Validate form fields
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    let nameIsValid = true;
    let emailIsValid = true;
    let messageIsValid = true;

    if (nameInput.value.trim() === "") {
        isValid = false;
        nameIsValid = false;
    }

    if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
        isValid = false;
        if (emailInput.value.trim() !== "" && !isValidEmail(emailInput.value)) {
            emailIsValid = false;
        }
    }

    if (messageInput.value.trim() === "") {
        isValid = false;
        messageIsValid = false;
    }

    if (!isValid) {
        errorDiv.classList.add("error-show");
        emailErrorDiv.classList.remove("error-show");
        if (nameIsValid && messageIsValid && !emailIsValid) {
            errorDiv.classList.remove("error-show");
            emailErrorDiv.classList.add("error-show");
        }
    } else {
        emailErrorDiv.classList.remove("error-show");
        errorDiv.classList.remove("error-show");
        contactButton.classList.add("loading");
        contactLoad.classList.add("show");
        submitText.classList.add("hide");

        // Save the time and lock the button
        localStorage.setItem("formTime", Date.now());
        lockSubmitButton(LOCK_DURATION);

        setTimeout(() => {
            sendMail();
        }, 2000);
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

if (contactForm) {
    contactForm.addEventListener("submit", validateForm);
}

// Unlock the button after the cooldown period
checkLockStatus();

function sendMail() {
    contactSubmitAfter.classList.add("show");
    formSection.classList.add("hide");
    contactSection.classList.add("csa-cs");
    contactForm.classList.add("csa-cf");

    // Uncomment the following to use EmailJS
    // var params = {
    //     name: document.getElementById('name').value,
    //     email: document.getElementById('email').value,
    //     message: document.getElementById('message').value
    // }

    // const serviceID = "service_evf2wim";
    // const templateID = "template_v085uvl";

    // emailjs.send(serviceID, templateID, params)
    //     .then(res => {
    //         document.getElementById('name').value = "";
    //         document.getElementById('email').value = "";
    //         document.getElementById('message').value = "";

    //         contactSubmitAfter.classList.add("show");
    //         formSection.classList.add("hide");
    //         contactSection.classList.add("csa-cs");
    //         contactForm.classList.add("csa-cf");

    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
}
