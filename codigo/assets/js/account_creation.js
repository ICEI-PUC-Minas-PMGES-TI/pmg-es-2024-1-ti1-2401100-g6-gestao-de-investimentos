document.addEventListener("DOMContentLoaded", function() {
    // Função para salvar os dados no Local Storage
    function salvarDados() {
        const nomeCompleto = document.getElementById('nomeCompleto').value;
        const email = document.getElementById('email').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;
        const senha = document.getElementById('senha').value;
        
        const usuario = {
            nomeCompleto,
            email,
            cpf,
            telefone,
            dataNascimento,
            endereco,
            senha
        };
        
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    
    // Evento de envio do formulário
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        const senha = document.getElementById('senha').value;
        const confirmacaoSenha = document.getElementById('confirmacaoSenha').value;

        if (senha !== confirmacaoSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        
        salvarDados();
        alert('Conta criada com sucesso!');
        window.location.href = '/codigo/pages/login_page.html'; 
    });
});
