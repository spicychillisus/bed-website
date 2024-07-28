document.addEventListener("DOMContentLoaded", function () {
    const taskProgressForm = document.getElementById("taskProgressForm");
  
    taskProgressForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const taskId = document.getElementById("taskId").value;
      const taskNotes = document.getElementById("taskNotes").value;
      const taskDate = document.getElementById("taskDate").value;
      
      console.log("new progress yay");
  
        const data = {
          user_id: userId,
          task_id: taskId,
          completion_date: taskDate,
          notes: taskNotes
        };
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 201) {
            // Check if signup was successful
            if (responseData) {
              // Redirect to login.html
              window.location.href = "showTaskProgress.html";
              alert("You have completed a task! You can now check the leaderboard to see your progress.")
            }
          }

          if (responseStatus == 404) {
            alert("Task not found. Please try again.")
          }

          
        };
        const currentURL = window.location.protocol + "//" + window.location.host

        // Perform signup request
        fetchMethod(currentURL + "/api/task_progress", callback, "POST", data);
  
        // Reset the form fields
        taskProgressForm.reset();
    });
  });