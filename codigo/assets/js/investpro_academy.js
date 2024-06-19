document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });

    // Função para filtrar cursos por categoria
    window.filterCourses = function(category) {
        // Lógica para filtrar cursos por categoria
        alert(`Filtrando cursos por: ${category}`);
    };

    // Função de logout
    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });
});
