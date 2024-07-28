url = new URL(document.URL);
const urlParams = url.searchParams;
const taskId = urlParams.get("task_id");
const callbackForUserInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const taskDetails = document.getElementById("taskDetails");
    taskDetails.innerHTML = `
      <div class="container">
          <div class="col-xs-6 col-md-4 mt-3 p-2 mx-auto justify-content-center text-light">
            <p>Task ID: ${responseData.task_id}</p>
            <p>Task Name: ${responseData.title}</p>
            <p>Task Description: ${responseData.description}</p>
            <p>Points Earned: ${responseData.points}</p>
          </div>
      </div>
        `;
    
  };
  fetchMethod(currentURL + `/api/tasks/${taskId}`, callbackForUserInfo);