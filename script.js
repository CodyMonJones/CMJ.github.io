//MAP STYLE AND FUNCTIONS
let marker;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 32.762688, lng:  -97.010441 },
        zoom: 10,
        gestureHandling: 'none',
        zoomControl: false,
        mapId: '83b5a3fb03b81e32',
    });
    marker = new google.maps.Marker({
        position: { lat: 32.762688, lng:  -97.010441 },
        map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        title: "Click Me",
    });
    marker.addListener("click", toggleBounce);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

//MENU TOGGLE 
const hamburger = document.querySelector(".header__menu");
let navLinks = document.querySelector(".header__mobmenu");
let menuStatus = false;

hamburger.addEventListener('click', () => {
    if (!menuStatus) {
        hamburger.classList.add('nav-open');
        navLinks.classList.add('nav-open');
        menuStatus = true;
    }
    else {
        hamburger.classList.remove('nav-open');
        navLinks.classList.remove('nav-open');
        menuStatus = false;
    }

    hamburger.classList.toggle("toggle");
    navLinks.classList.toggle("toggle");
});

//MENU TOGGLE ON LINK CLICK
let mobLinks = document.querySelector(".header__mobmenu");

mobLinks.addEventListener('click', () => {
    hamburger.classList.remove('nav-open');
    navLinks.classList.remove('nav-open');
    menuStatus = false;


    hamburger.classList.toggle("toggle");
    navLinks.classList.toggle("toggle");
});

//FORM FUNCTIONS
const form = document.querySelector(".contact__form");
const usernameIn = document.getElementById("name");
const emailIn = document.getElementById("email");
const userNumberIn = document.getElementById("number");
const userMsgIn = document.getElementById("message");


form.addEventListener('submit', e => {
    e.preventDefault();

    let validUser = validateUsername(),
        validEmail = validateEmail(),
        validNumber = validateNumber(),
        validMessage = validateMessage();
    
    let validForm = validUser && validEmail && validNumber && validMessage;

    if (validForm) {
        alert("Form has been submitted");
        formReset();
    }
});

function checkEmpty(value) {
    if (value === '') {
        return false;
    } else {
        return true;
    }
}

const checkEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const checkNumber = (number) => {
    const num = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return num.test(number);
}

const showError = (input, message) => {
    const field = input.parentElement;
   
    field.classList.remove('valid');
    field.classList.add('invalid');
    
    const errorMessage = field.querySelector('small');
    errorMessage.textContent = message;
}

const showSuccess = (input) => {
    const field = input.parentElement;

    field.classList.remove('invalid');
    field.classList.add('valid');

    const errorMessage = field.querySelector('small');
    errorMessage.textContent = '';
}


const validateUsername = () => {
    let valid = false;
    const username = usernameIn.value.trim();

    if (!checkEmpty(username)) {
        showError(usernameIn, 'Name is required.');
    } else {
        showSuccess(usernameIn);
        valid = true;
    }
    return valid;
}

const validateEmail = () => {
    let valid = false;
    const email = emailIn.value.trim();

    if (!checkEmpty(email)) {
        showError(emailIn, 'Email is required.');
    } else if(!checkEmail(email)){
        showError(emailIn, 'Please enter a valid email.');
    } else {
        showSuccess(emailIn);
        valid = true;
    }
    return valid;
}

const validateNumber = () => {
    let valid = false;
    const number = userNumberIn.value.trim();

    if (!checkEmpty(number)) {
        showError(userNumberIn, 'Phone number is required.');
    } else if (!checkNumber(number)) {
        showError(userNumberIn, 'Please enter a valid phone number');
    } else {
        showSuccess(userNumberIn);
        valid = true;
    }
    return valid;
}

const validateMessage = () => {
    let valid = false;
    const message = userMsgIn.value.trim();

    if (!checkEmpty(message)) {
        showError(userMsgIn, 'Message is required');
    } else {
        showSuccess(userMsgIn);
        valid = true;
    }
    return valid;
}

form.addEventListener('input', e => {
    switch (e.target.id) {
        case 'name':
            validateUsername();
            break;
        
        case 'email':
            validateEmail();
            break;
        
        case 'user-number':
            validateNumber();
            break;
        
        case 'message':
            validateMessage();
            break;
    }
});

