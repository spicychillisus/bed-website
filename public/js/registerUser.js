document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
  
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      // password validation
      const passwordLength = 8;
      const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
      // check if password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, and one number
      if (password.length < passwordLength && !passwordRegex.test(password) || password.length > passwordLength && !passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number")
        return;
      }
      // Perform signup logic
      if (password === confirmPassword) {
        // Passwords match, proceed with signup
        console.log("Signup successful");
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
  
        const data = {
          username: username,
          email: email,
          password: password
        };
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 201) {
            // Check if signup was successful
            if (responseData) {
              // Redirect to login.html
              window.location.href = "login.html";
              warningText.innerText = responseData.message;
              alert("You have successfully signed up for an account. Please log in.")
            }
          } else {
            // Signup failed, handle error
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
          }

          
        };
        const currentURL = window.location.protocol + "//" + window.location.host

        // Perform signup request
        fetchMethod(currentURL + "/api/register", callback, "POST", data);
  
        // Reset the form fields
        signupForm.reset();
      } else {
        // Passwords do not match, handle error
        warningCard.classList.remove("d-none");
        warningText.innerText = "Passwords do not match";
      }
    });
  });