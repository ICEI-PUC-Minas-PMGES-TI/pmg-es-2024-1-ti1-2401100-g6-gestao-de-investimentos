document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    if (password !== confirmPassword) {
        message.textContent = 'As senhas não coincidem!';
        return;
    }

    
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('tel', tel);

    message.style.color = 'green';
    message.textContent = 'Cadastro realizado com sucesso!';
    document.getElementById('registrationForm').reset();

   
    window.location.href = 'ProfilePage.html';
});
