var url = new URL(document.URL);
const urlParams = url.searchParams;
const taskProgressId = urlParams.get("progress_id");
const deleteTaskProgress = document.getElementById('deleteTaskProgress'); // get the delete button

const callbackForTaskProgress = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const taskProgressDetails = document.getElementById("taskProgress");
    taskProgressDetails.innerHTML = `
      <div class="container">
          <div class="col-xs-6 col-md-4 mt-3 p-2 mx-auto justify-content-center text-light">
            <p>Task ID: ${responseData.task_id}</p>
            <p>User ID that completed it: ${responseData.user_id}</p>
            <p>Notes: ${responseData.notes}</p>
            <p>Completion Date: ${responseData.completion_date}</p>
          </div>
      </div>
        `;
    // this part here is if you want to delete the task progress
    
    if (userId == responseData.user_id) {
      deleteTaskProgress.classList.remove("d-none");
        deleteTaskProgress.addEventListener("click", (event) => {
          event.preventDefault();
          const callbackForDelete = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            window.location.reload();
            window.location.href = "showTaskProgress.html";
            alert("Your progress has been deleted.");
          };
          fetchMethod(currentURL + "/api/task_progress/" + taskProgressId, callbackForDelete, 'DELETE', null);
        });
    } else {
      deleteTaskProgress.classList.add("d-none");
    }
    
  };
  fetchMethod(currentURL + `/api/task_progress/${taskProgressId}`, callbackForTaskProgress);