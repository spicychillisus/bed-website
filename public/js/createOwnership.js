document.addEventListener("DOMContentLoaded", function () {
    const createOwnership = document.getElementById("createOwnership");
  
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
        // Reset the form fields
        createOwnership.reset();
        // Check if create player was successful
        window.location.href = "ownershipBoard.html";
      } else {
        alert(responseData.message);
      }
    };
  
    createOwnership.addEventListener("submit", function (event) {
      console.log("createOwnership.addEventListener");
      event.preventDefault();
  
      const vehicleId = document.getElementById("vehicleId").value;
  
      const data = {
        vehicle_id: vehicleId,
        user_id: userId
      };
  
      // Perform login request
      fetchMethod(currentURL + "/api/ownership/", callback, "POST", data, localStorage.getItem("token"));
    });
    
  });
  