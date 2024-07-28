// if i manage to get this edit message feature working i'll be super happy and i will shit over my pants (i'm wearing shorts)

document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const vehicleId = urlParams.get("vehicle_id");
    const editMessageForm = document.getElementById("editVehicleForm");
    editMessageForm.addEventListener("submit", function (event) {
      const newVehicleName = document.getElementById("newVehicleName").value;
      const newVehicleCategory = document.getElementById("newVehicleCategory").value;
      const newVehicleDescription = document.getElementById("newVehicleDescription").value;
      const newPrice = document.getElementById("newPrice").value;
      event.preventDefault();
  
      const callbackForUpdate = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        if (responseStatus == 200) {
          // Redirect or perform further actions for logged-in user
          alert("You have successfully updated your vehicle.");
          window.location.href = "vehicle.html";
        } 
      };
  
      const data = {
        vehicle_name: newVehicleName,
        category: newVehicleCategory,
        vehicle_description: newVehicleDescription,
        points_needed: newPrice
      };
      alert("You have successfully updated your vehicle.");
      window.location.href = "vehicle.html";
      fetchMethod(currentURL + "/api/vehicles/" + vehicleId, callbackForUpdate, "PUT", data);
    });
  });
  