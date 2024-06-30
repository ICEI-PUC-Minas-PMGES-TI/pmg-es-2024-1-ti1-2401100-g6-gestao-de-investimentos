document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    // Função de filtragem
    const filterCourses = (filter) => {
        console.log(`Filtrando por: ${filter}`); // Adiciona um log para depuração
        courseCards.forEach(card => {
            console.log(`Curso: ${card.classList}`); // Adiciona um log para depuração
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                if (card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    };

    // Adiciona evento de clique a cada botão de filtragem
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterCourses(filter);

            // Remove a classe 'active' de todos os botões e adiciona ao botão clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Filtragem inicial para mostrar todos os cursos
    filterCourses('all');
});
