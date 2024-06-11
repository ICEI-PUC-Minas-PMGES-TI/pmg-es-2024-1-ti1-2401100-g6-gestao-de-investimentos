document.addEventListener("DOMContentLoaded", function() {
    // Evento de envio do formulário de recuperação de senha
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário

        const email = document.getElementById('email').value;

        // Simulação de envio de instruções de recuperação de senha
        alert(`Instruções de recuperação de senha foram enviadas para ${email}`);
        window.location.href = '/codigo/login.html'; // Redireciona para a página de login
    });
});
