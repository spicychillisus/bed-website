const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const taskProgress = document.getElementById("taskDetailsProgress");
    responseData.forEach((ca1) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "container";
      displayItem.innerHTML = `
      <div class="card mt-3 p-2 col-md-4 justofy-content-center mx-auto">
        <h3 class="text-muted">User ID ${ca1.user_id} has completed a new task!</h3>
        <span class="card-text">Completed Task ID: ${ca1.task_id}</span>
        <span class="card-text">Notes: ${ca1.notes}</span>
        
        <a href="taskProgressDetails.html?progress_id=${ca1.progress_id}" class="text-danger text-decoration-none">More Details</a>
      </div>  
          `;
    taskProgress.appendChild(displayItem);
      
    });
  };
  
  //const currentURL = window.location.protocol + "//" + window.location.host
  fetchMethod(currentURL + "/api/task_progress", callback);