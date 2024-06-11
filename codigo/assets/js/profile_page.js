document.addEventListener("DOMContentLoaded", function() {
    // Função de logout
    document.querySelector('#sidebar ul.bottom-links li a[href$="Sair"]').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('usuario'); // Remove os dados do usuário do Local Storage
        window.location.href = '/codigo/login.html'; // Redireciona para a página de login
    });

    // Função para colapsar o sidebar
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('collapse');
        document.getElementById('content').classList.toggle('collapse');
    });

    // Carregar informações do usuário
    function carregarDadosUsuario() {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
            document.querySelector('.card-body h5').textContent = usuario.nomeCompleto;
            document.getElementById('firstName').value = usuario.nome;
            document.getElementById('lastName').value = usuario.sobrenome;
            document.getElementById('phoneNumber').value = usuario.telefone;
            document.getElementById('email').value = usuario.email;
            document.getElementById('city').value = usuario.cidade;
            document.getElementById('state').value = usuario.estado;
            document.getElementById('zipcode').value = usuario.cep;
            document.getElementById('country').value = usuario.pais;
        } else {
            window.location.href = '/codigo/login.html'; // Redireciona para a página de login se não houver usuário
        }
    }

    carregarDadosUsuario();
});
