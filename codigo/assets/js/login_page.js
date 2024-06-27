document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginSenha').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(user => user.email === email);

        if (user && user.senha === password) {
            alert('Login bem-sucedido!');
            // Redireciona para o dashboard
            window.location.href = '/codigo/pages/dashboard.html';
        } else {
            document.getElementById('errorFeedback').textContent = 'E-mail ou senha incorretos.';
            document.getElementById('errorFeedback').style.display = 'block';
        }
    });

    // Validações em tempo real
    document.getElementById('loginEmail').addEventListener('input', function() {
        const email = this.value;
        if (email === '') {
            document.getElementById('emailFeedback').textContent = 'O e-mail é obrigatório.';
            document.getElementById('emailFeedback').style.display = 'block';
        } else {
            document.getElementById('emailFeedback').style.display = 'none';
        }
    });

    document.getElementById('loginSenha').addEventListener('input', function() {
        const password = this.value;
        if (password === '') {
            document.getElementById('senhaFeedback').textContent = 'A senha é obrigatória.';
            document.getElementById('senhaFeedback').style.display = 'block';
        } else {
            document.getElementById('senhaFeedback').style.display = 'none';
        }
    });
});
