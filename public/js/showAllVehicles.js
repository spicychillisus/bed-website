const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const displayVehicles = document.getElementById("dealership");
    responseData.forEach((ca1) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "container";
      displayItem.innerHTML = `
      <div class="card mt-3 p-2 col-md-4 mx-auto justify-content-center">
        <h5>${ca1.vehicle_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Category: ${ca1.category}</h6>
        <span class="card-text">Price: ${ca1.points_needed}</span>
        <a href="vehicleInfo.html?vehicle_id=${ca1.vehicle_id}" class="text-danger text-decoration-none">More Details</a>
        <span>Added by user_id: ${ca1.added_by_user_id}</span>
      </div>  
          `;
      displayVehicles.appendChild(displayItem);
      
    });
  };
  
  //const currentURL = window.location.protocol + "//" + window.location.host
  fetchMethod(currentURL + "/api/vehicles", callback);