document.addEventListener("DOMContentLoaded", function () {
    // declare variable
    // this part is for detecting if user is logged in or not and showing a different screen if token exists
    const loggedInScreen = document.getElementById("Logged");
    const normalScreen = document.getElementById("notLogged");
    const addMessage = document.getElementById("addMessage")

    const token = localStorage.getItem("token");
    if (token) {
        // d-none means display: none in bootstrap
        loggedInScreen.classList.remove("d-none");
        normalScreen.classList.add("d-none");
        addMessage.classList.remove("d-none");
    } else {
        loggedInScreen.classList.add("d-none");
        normalScreen.classList.remove("d-none");
        addMessage.classList.add("d-none");
    }

    

})