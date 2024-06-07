document.addEventListener("DOMContentLoaded", function() {
    // Função para verificar os dados de login
    function verificarLogin(email, senha) {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        
        if (usuario && usuario.email === email && usuario.senha === senha) {
            return true;
        }
        return false;
    }
    
    // Evento de envio do formulário de login
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;
        
        if (verificarLogin(email, senha)) {
            alert('Login bem-sucedido!');
            window.location.href = '/codigo/pages/dashboard.html';
        } else {
            alert('E-mail ou senha incorretos!');
        }
    });
});
