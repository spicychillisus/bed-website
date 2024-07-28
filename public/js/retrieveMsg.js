// Purpose: retrieve messages from the database and display them on the messages.html page
// also delete messages if the user is the owner of the message
// retrieve messages
const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const displayMessages = document.getElementById("messageBox");
    responseData.forEach((ca1) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "container d-flex justify-content-center";
      displayItem.innerHTML = `
          <div class="col-xs-6 col-md-4 card mt-3 p-2">
            <span>${ca1.message}</span>
            <span class="font-weight-bold">written by user_id: ${ca1.user_id}</span>
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-primary text-center" data-toggle="modal" data-target="#createVehicleModal" id="delete-${ca1.message_id}"><a href="messages.html" class="text-decoration-none text-light">Delete</a></button>
              <button type="button" class="btn btn-danger text-center" data-toggle="modal" data-target="#createVehicleModal" id="update-${ca1.message_id}"><a href="editMessage.html?message_id=${ca1.message_id}" class="text-decoration-none text-light">Update</a></button>

            </div>
        </div>
          `;
      displayMessages.appendChild(displayItem);
      const deleteButton = document.getElementById(`delete-${ca1.message_id}`);
      const updateButton = document.getElementById(`update-${ca1.message_id}`);
      // checking if the user is the owner of the message
      // only the owner of the message can delete their own messages
      // if user did not create message => delete button will not work
      if (userId == ca1.user_id) {
        deleteButton.classList.remove("d-none");
        updateButton.classList.remove("d-none");
        deleteButton.addEventListener("click", (event) => {
          event.preventDefault();
          const callbackForDelete = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            window.location.reload();
          };
        fetchMethod(currentURL + "/api/messages/" + ca1.message_id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
      });
      } else {
          deleteButton.classList.add("d-none");
          updateButton.classList.add("d-none");
      }
  });
  };
  
fetchMethod(currentURL + "/api/messages", callback);

