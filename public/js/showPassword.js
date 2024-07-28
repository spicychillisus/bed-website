function togglePassword() {
    const password = document.getElementById('password');
    const toggleButton = document.getElementById('show-password-toggle');

    if (password.type === 'password') {
        password.type = 'text';
      toggleButton.textContent = 'Hide';
    } else {
        password.type = 'password';
      toggleButton.textContent = 'Show';
    }
  }

  function toggleConfirmPassword() {
    const confirmPassword = document.getElementById('confirmPassword');
    const toggleButton = document.getElementById('show-password-toggle');

    if (confirmPassword.type === 'password') {
        confirmPassword.type = 'text';
      toggleButton.textContent = 'Hide';
    } else {
        confirmPassword.type = 'password';
      toggleButton.textContent = 'Show';
    }
  }