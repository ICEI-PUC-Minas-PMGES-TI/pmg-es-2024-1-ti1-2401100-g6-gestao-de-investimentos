document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;

        if (email && senha) {
            var usuarioString = localStorage.getItem('usuario');
            if (usuarioString) {
                var usuario = JSON.parse(usuarioString);
                if (usuario.email === email && usuario.senha === senha) {
                    alert('Login bem-sucedido! Redirecionando para o dashboard.');
                    // Redireciona para o dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Email ou senha incorretos.');
                }
            } else {
                alert('Nenhuma conta encontrada. Por favor, registre-se.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
