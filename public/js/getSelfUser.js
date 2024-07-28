const callbackForUserInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const userInformation = document.getElementById("userInformation");

  responseData.forEach((results) => {
    userInformation.innerHTML = `
    <div class="container">
        <div class="col-xs-6 col-md-4 mt-3 p-2 mx-auto justify-content-center text-light">
          <p>Username: ${results.username}</p>
          <p>Email: ${results.email}</p>
          <p>Your Points: ${results.total_points}</p>
          <p>Your ID: ${results.user_id}</p>
        </div>
    </div>
      `;
  })
  
};
fetchMethod(currentURL + `/api/users/${userId}`, callbackForUserInfo);