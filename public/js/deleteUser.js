// this page is for deleting your account. yes, you can delete your own account.
// this just means all ur progress is lost
const deleteButton = document.getElementById(`deleteAccount`);
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        window.location.reload();
        window.location.href = "login.html";
        alert("Your account has been deleted.");
      };
      fetchMethod(currentURL + "/api/users/" + userId, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
    });