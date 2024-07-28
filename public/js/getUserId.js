// this page is a test to see if decoding the token will give the user id. 
// if you're still seeing this file in the repository, it means it worked.
// run the code below in the browser console to see the user id after logging in.

// Get the token from localStorage
const token = localStorage.getItem('token');

// Decode the JWT
const decodedToken = atob(token.split('.')[1]);

// Parse the decoded token as JSON
const tokenData = JSON.parse(decodedToken);

// Access the user ID from the token data
const userId = tokenData.userId;

console.log(userId)


