document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se a corretora já existe na conta do usuário
    function verificarCorretoraExistente(corretora) {
        // Implemente aqui a lógica para verificar se a corretora já existe
        // Retorna true se existir, false caso contrário
        // Por enquanto, vamos simular que a corretora não existe
        return false;
    }

    // Função para adicionar a corretora à conta do usuário
    function adicionarCorretora(corretora) {
        // Implemente aqui a lógica para adicionar a corretora à conta do usuário
        // Retorna true se a adição for bem-sucedida, false caso contrário
        // Por enquanto, vamos simular que a adição foi bem-sucedida
        return true;
    }

    // Função para lidar com o envio do formulário
    function handleFormSubmit(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Obtém os valores dos campos do formulário
        var nomeCorretora = document.getElementById('nomeCorretora').value;
        var cnpjCorretora = document.getElementById('cnpjCorretora').value;
        var telefoneCorretora = document.getElementById('telefoneCorretora').value;

        // Verifica se a corretora já existe na conta do usuário
        if (verificarCorretoraExistente(nomeCorretora)) {
            mostrarMensagemErro('Esta corretora já está adicionada à sua conta.');
            return;
        }

        // Adiciona a corretora à conta do usuário
        if (adicionarCorretora(nomeCorretora)) {
            mostrarMensagemSucesso('Corretora adicionada com sucesso!');
            // Redireciona o usuário para a tela anterior
            setTimeout(function() {
                window.location.href = '/codigo/pages/wallet.html';
            }, 2000); // Redireciona após 2 segundos
        } else {
            mostrarMensagemErro('Erro ao adicionar a corretora. Por favor, tente novamente mais tarde.');
        }
    }

    // Função para mostrar mensagem de erro
    function mostrarMensagemErro(mensagem) {
        var mensagemDiv = document.getElementById('mensagem');
        mensagemDiv.textContent = mensagem;
        mensagemDiv.style.color = 'red';
        mensagemDiv.style.display = 'block';
    }

    // Função para mostrar mensagem de sucesso
    function mostrarMensagemSucesso(mensagem) {
        var mensagemDiv = document.getElementById('mensagem');
        mensagemDiv.textContent = mensagem;
        mensagemDiv.style.color = 'green';
        mensagemDiv.style.display = 'block';
    }

    // Adiciona um event listener para o envio do formulário
    var form = document.getElementById('adicionarCorretoraForm');
    form.addEventListener('submit', handleFormSubmit);
});
