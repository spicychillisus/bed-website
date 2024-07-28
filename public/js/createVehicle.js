document.addEventListener("DOMContentLoaded", function () {
  const createVehicleForm = document.getElementById("createVehicleForm");
  /* const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText"); */

  createVehicleForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const vehicleName = document.getElementById("vehicleName").value;
    const vehicleCategory = document.getElementById("vehicleCategory").value;
    const vehicleDescription = document.getElementById("vehicleDescription").value;
    const vehiclePrice = document.getElementById("vehiclePrice").value;
    
    // Perform signup logic
    if (vehiclePrice > 0) {
      // Passwords match, proceed with signup
      console.log("Added!");
      console.log("Vehicle Name:", vehicleName);
      console.log("Category:", vehicleCategory);
      console.log("Description:", vehicleDescription);
      console.log("Price:", vehiclePrice);

      const data = {
        vehicle_name: vehicleName,
        category: vehicleCategory,
        vehicle_description: vehicleDescription,
        points_needed: parseInt(vehiclePrice),
        added_by_user_id: userId
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
          // Check if signup was successful
          if (responseData) {
            // Redirect to login.html
            window.location.href = "vehicle.html";
            alert("Vehicle has been added")
          }
        } else {
          // Signup failed, handle error
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }

        
      };
      const currentURL = window.location.protocol + "//" + window.location.host

      // Perform signup request
      fetchMethod(currentURL + "/api/vehicles", callback, "POST", data);

      // Reset the form fields
      createVehicleForm.reset();
    } 
  });
});