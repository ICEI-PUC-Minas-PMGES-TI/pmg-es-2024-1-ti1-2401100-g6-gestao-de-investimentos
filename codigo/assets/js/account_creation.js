document.addEventListener("DOMContentLoaded", function() {
    // Máscara para o CPF
    Inputmask("999.999.999-99").mask(document.getElementById("cpf"));

    // Máscara para o telefone
    Inputmask("(99) 99999-9999").mask(document.getElementById("telefone"));

    // Validação e envio do formulário
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        
        // Validação de senha
        const senha = formData.get('senha');
        const confirmacaoSenha = formData.get('confirmacaoSenha');
        
        if (senha !== confirmacaoSenha) {
            alert("As senhas não coincidem. Por favor, verifique.");
            return;
        }
        
        const userData = {
            id: Date.now(),
            nome: formData.get('nomeCompleto'),
            nome_usuario: formData.get('nomeUsuario'),
            email: formData.get('email'),
            senha: formData.get('senha'),
            cpf: formData.get('cpf'),
            data_nascimento: formData.get('dataNascimento'),
            telefone: formData.get('telefone'),
            endereco: formData.get('endereco'),
            tipo_perfil_investidor: formData.get('tipoPerfilInvestidor'),
            foto_perfil: "/codigo/assets/imgs/perfis/default.png",
            foto_banner: "/codigo/assets/imgs/banners/default.png",
            tipo: "usuario"
        };

        fetch('/codigo/data/users.json')
            .then(response => response.json())
            .then(users => {
                users.push(userData);
                return fetch('/codigo/data/users.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(users)
                });
            })
            .then(() => {
                alert('Conta criada com sucesso!');
                window.location.href = '/codigo/pages/login_page.html';
            })
            .catch(error => console.error('Erro ao salvar os dados:', error));
    });
});
