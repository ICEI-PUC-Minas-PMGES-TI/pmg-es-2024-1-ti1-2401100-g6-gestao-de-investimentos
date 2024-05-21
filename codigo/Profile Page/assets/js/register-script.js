document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    document.addEventListener('DOMContentLoaded', function() {
        var telefone = document.getElementById('tel');
    
        telefone.addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    });

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
