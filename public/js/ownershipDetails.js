var url = new URL(document.URL);
const urlParams = url.searchParams;
const ownershipId = urlParams.get("id");

const callbackForOwnership = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const ownershipInformation = document.getElementById("ownershipInformation");
    ownershipInformation.innerHTML = `
      <div class="container">
          <div class="col-xs-6 col-md-4 mt-3 p-2 mx-auto justify-content-center text-light">
            <p>Ownership ID: ${responseData.id}</p>
            <p>User ID: ${responseData.user_id}</p>
            <p>Vehicle ID: ${responseData.vehicle_id}</p>
          </div>
      </div>
        `;
    const deleteOwnership = document.getElementById("deleteOwnership");
    if (parseInt(responseData.user_id) == userId) {
        deleteOwnership.classList.remove("d-none");
        deleteOwnership.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForDelete = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            window.location.href = "ownershipBoard.html";
            };
        fetchMethod(currentURL + `/api/ownership/${ownershipId}`, callbackForDelete, 'DELETE', null);
        });
    } else {
        deleteOwnership.classList.add("d-none");
    }
  };
  fetchMethod(currentURL + `/api/ownership/${ownershipId}`, callbackForOwnership);