const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const taskBoard = document.getElementById("tasks");
    responseData.forEach((ca1) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "row";
      displayItem.innerHTML = `
      <div class="col-xs-6 col-md-4 card mt-3 p-2 mx-auto justify-content-center">
          <a href="viewTask.html?task_id=${ca1.task_id}" class="text-decoration-none">
              <h4 class="text-dark">${ca1.task_id}. ${ca1.title}</h4>
              <span class="text-dark">${ca1.description}</span>
          </a>
          <span class="text-muted">Points Rewarded: ${ca1.points}</span>
      </div>
          `;
      taskBoard.appendChild(displayItem);
    });
  };
  //const currentURL = window.location.protocol + "//" + window.location.host
  fetchMethod(currentURL + "/api/tasks", callback);