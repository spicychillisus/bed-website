// if i manage to get this edit message feature working i'll be super happy and i will shit over my pants (i'm wearing shorts)

document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const messageId = urlParams.get("message_id");
    const editMessageForm = document.getElementById("editMessageForm");
    editMessageForm.addEventListener("submit", function (event) {
        const newMessage = document.getElementById("changedMessageInput").value;
      event.preventDefault();
  
      const callbackForUpdate = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        if (responseStatus == 200) {
          // Redirect or perform further actions for logged-in user
          alert("You have successfully updated your message. You may go back to the global chat page to see your new message!");
          window.location.href = "messages.html";
        } 
      };
  
      const data = {
        message_id: messageId,
        message: newMessage
      };
      fetchMethod(currentURL + "/api/messages/" + messageId, callbackForUpdate, "PUT", data);
    });
  });
  