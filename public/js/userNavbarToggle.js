document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const globalChat = document.getElementById("globalChat");
    const vehicles = document.getElementById("vehicles");
    const tasks = document.getElementById("tasks");
    const taskProgress = document.getElementById("taskProgress");
    const ownership = document.getElementById("ownership");
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, show profile button and hide login and register buttons
      loginButton.classList.add("d-none");
      registerButton.classList.add("d-none");
      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
      globalChat.classList.remove("d-none");
      vehicles.classList.remove("d-none");
      tasks.classList.remove("d-none");
      taskProgress.classList.remove("d-none");
      ownership.classList.remove("d-none");
    } else {
      // Token does not exist, show login and register buttons and hide profile and logout buttons
      // gentle reminder: d-none means display: none
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
      globalChat.classList.add("d-none");
      vehicles.classList.add("d-none");
      tasks.classList.add("d-none");
      taskProgress.classList.add("d-none");
      ownership.classList.add("d-none");
    }
    
    // logout feature
    logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html after user clicks on logout button
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });

  });