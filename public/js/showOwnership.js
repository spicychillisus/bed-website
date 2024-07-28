const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const displayVehicles = document.getElementById("ownershipLeaderboard");
  responseData.forEach((ca1) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "container";
    displayItem.innerHTML = `
    <div class="card mt-3 p-2 col-md-4 mx-auto justify-content-center">
      <h5>User ID ${ca1.user_id} has acquired a new vehicle!</h5>
      <span class="card-text">Vehicle ID: ${ca1.vehicle_id}</span>
      <a href="individualOwnership.html?id=${ca1.vehicle_id}" class="text-danger text-decoration-none">More Details</a>
    </div>  
        `;
    displayVehicles.appendChild(displayItem);

  });
};

//const currentURL = window.location.protocol + "//" + window.location.host
fetchMethod(currentURL + "/api/ownership", callback);