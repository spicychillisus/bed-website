document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
  
    taskForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const taskTitle = document.getElementById("taskTitle").value;
      const taskDescription = document.getElementById("taskDescription").value;
      const taskPoints = document.getElementById("taskPoints").value;
      
      // Perform signup logic
      if (taskPoints > 0) {
        // Passwords match, proceed with signup
        console.log("Task Added!");
        console.log("Task:", taskTitle);
        console.log("Description:", taskDescription);
        console.log("Points:", taskPoints);
  
        const data = {
          title: taskTitle,
          description: taskDescription,
          points: taskPoints
        };
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 201) {
            // Check if signup was successful
            if (responseData) {
              // Redirect to login.html
              window.location.href = "task.html";
              alert("You have successfully signed created a task")
            }
          }

          
        };
        const currentURL = window.location.protocol + "//" + window.location.host

        // Perform signup request
        fetchMethod(currentURL + "/api/tasks", callback, "POST", data);
  
        // Reset the form fields
        taskForm.reset();
      } 
    });
  });