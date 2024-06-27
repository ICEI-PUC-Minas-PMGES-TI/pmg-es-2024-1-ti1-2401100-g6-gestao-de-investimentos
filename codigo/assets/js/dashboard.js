document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');

    // Expand and collapse sidebar on hover
    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });


        // Definir o nome do usuário
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let currentUser = users.find(user => user.email === localStorage.getItem('currentUserEmail'));
        if (currentUser) {
            document.getElementById('username').textContent = currentUser.nome_usuario;
        }
    
        // Logout
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('currentUserEmail');
            window.location.href = '/codigo/pages/login_page.html';
        });
    
        // Gráfico de Evolução do Patrimônio
        var ctx1 = document.getElementById('patrimonioChart').getContext('2d');
        var patrimonioChart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    label: 'Patrimônio',
                    data: [10, 20, 30, 40, 50, 60, 70],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    
        // Gráfico de Distribuição das Carteiras
        var ctx2 = document.getElementById('carteirasChart').getContext('2d');
        var carteirasChart = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['Ações', 'Títulos', 'Imóveis', 'Outros'],
                datasets: [{
                    label: 'Distribuição',
                    data: [30, 40, 15, 15],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    
});
