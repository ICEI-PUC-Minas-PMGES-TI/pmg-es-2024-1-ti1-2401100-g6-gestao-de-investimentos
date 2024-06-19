document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });

    // Função para filtrar notícias por categoria
    window.filterNews = function(category) {
        // Lógica para filtrar notícias por categoria
        alert(`Filtrando notícias por: ${category}`);
    };

    // Função de logout
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });
});
