document.addEventListener("DOMContentLoaded", function() {
    // Validação e envio do formulário
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        // Validação de senha
        let senha = formData.get('senha');
        let confirmacaoSenha = formData.get('confirmacaoSenha');

        if (senha !== confirmacaoSenha) {
            document.getElementById('senhaFeedback').textContent = "As senhas não coincidem. Por favor, verifique.";
            document.getElementById('senhaFeedback').style.display = 'block';
            return;
        } else {
            document.getElementById('senhaFeedback').style.display = 'none';
        }

        // Validação de maioridade
        const dataNascimento = new Date(formData.get('dataNascimento'));
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        if (idade < 18) {
            document.getElementById('idadeFeedback').textContent = "Você precisa ter pelo menos 18 anos para criar uma conta.";
            document.getElementById('idadeFeedback').style.display = 'block';
            return;
        } else {
            document.getElementById('idadeFeedback').style.display = 'none';
        }

        const userData = {
            id: Date.now(),
            nome: document.getElementById('nomeCompleto').value,
            nome_usuario: document.getElementById('nomeUsuario').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            cpf: document.getElementById('cpf').value,
            data_nascimento: document.getElementById('dataNascimento').value,
            telefone: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value,
            foto_perfil: "/codigo/assets/imgs/perfis/default.png",
            foto_banner: "/codigo/assets/imgs/banners/default.png",
            tipo: "usuario"
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificação se a conta já existe
        if (users.some(user => user.email === userData.email)) {
            document.getElementById('emailFeedback').textContent = "Uma conta com este e-mail já existe.";
            document.getElementById('emailFeedback').style.display = 'block';
            return;
        } else {
            document.getElementById('emailFeedback').style.display = 'none';
        }

        if (users.some(user => user.cpf === userData.cpf)) {
            document.getElementById('cpfFeedback').textContent = "Uma conta com este CPF já existe.";
            document.getElementById('cpfFeedback').style.display = 'block';
            return;
        } else {
            document.getElementById('cpfFeedback').style.display = 'none';
        }

        // Adiciona o novo usuário
        users.push(userData);

        // Salva no localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Conta criada com sucesso! Você será redirecionado para a página de login.');

        setTimeout(() => {
            window.location.href = '/codigo/pages/login_page.html';
        }, 2000);
    });

    // Atualização de ícones e nomes de arquivo ao selecionar
    document.getElementById('fotoPerfil').addEventListener('change', function() {
        var fileName = this.files[0].name;
        document.getElementById('file-name-perfil').textContent = fileName;
        document.getElementById('icon-perfil').style.display = 'inline';
    });

    document.getElementById('fotoBanner').addEventListener('change', function() {
        var fileName = this.files[0].name;
        document.getElementById('file-name-banner').textContent = fileName;
        document.getElementById('icon-banner').style.display = 'inline';
    });
});
