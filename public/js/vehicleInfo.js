url = new URL(document.URL);
const urlParams = url.searchParams;
const vehicleId = urlParams.get("vehicle_id");

const callbackForVehicleInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const selectionVehicle = document.getElementById("selectionVehicle");
    selectionVehicle.innerHTML = `
      <div class="container">
          <div class="col-xs-6 col-md-4 mt-3 p-2 mx-auto justify-content-center text-light">
            <p>Vehicle ID: ${responseData.vehicle_id}</p>
            <p>Vehicle Name: ${responseData.vehicle_name}</p>
            <p>Vehicle Description: ${responseData.vehicle_description}</p>
            <p>Points Needed: ${responseData.points_needed}</p>
          </div>
      </div>
        `;
    const displayEditButton = document.getElementById("editVehicleButton");
    displayEditButton.innerHTML = `
    <button type="button" class="btn btn-success text-center" data-toggle="modal" data-target="#createVehicleModal" id="editVehicle"><a href="editVehicle.html?vehicle_id=${responseData.vehicle_id}" class="text-decoration-none text-light">Edit Vehicle</a></button>
    `

    const deleteVehicle = document.getElementById(`deleteVehicle`);
    const editVehicle = document.getElementById(`editVehicle`);

if (userId == responseData.added_by_user_id) {
    editVehicle.classList.remove("d-none");
    deleteVehicle.classList.remove("d-none");
    deleteVehicle.addEventListener("click", async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch(currentURL + "/api/vehicles/" + vehicleId, {
                method: 'DELETE'
            });
            // async waits for a response from the server before proceeding
    
            if (response.ok) {
                alert("Vehicle has been deleted.");
                window.location.href = "vehicle.html";
            } else {
                const responseData = await response.json();
                console.error("Failed to delete vehicle:", responseData);
                alert("Failed to delete vehicle. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting vehicle:", error);
            alert("An error occurred while deleting the vehicle. Please try again.");
        }
    });
} else {
    deleteVehicle.classList.add("d-none");
    editVehicle.classList.add("d-none");
}

    
  };
  fetchMethod(currentURL + `/api/vehicles/${vehicleId}`, callbackForVehicleInfo);