document.addEventListener("DOMContentLoaded", function () {
  const createMessageForm = document.getElementById("createMessageForm");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 201) {
      // Reset the form fields
      createMessageForm.reset();
      // Check if create player was successful
      window.location.href = "messages.html";
    } else {
      alert(responseData.message);
    }
  };

  createMessageForm.addEventListener("submit", function (event) {
    console.log("createPlayerForm.addEventListener");
    event.preventDefault();

    const message = document.getElementById("messageInput").value;

    const data = {
      user_id: userId,
      message: message
    };

    // Perform login request
    fetchMethod(currentURL + "/api/messages/", callback, "POST", data, localStorage.getItem("token"));
  });
  
});
