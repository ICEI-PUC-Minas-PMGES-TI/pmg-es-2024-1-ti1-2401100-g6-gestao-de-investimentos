
document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar os gráficos
    function loadCharts() {
        var ctx1 = document.getElementById('investmentPerformanceChart').getContext('2d');
        var investmentPerformanceChart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Desempenho dos Investimentos',
                    data: [12000, 14000, 13000, 15000, 16000, 17000, 18000],
                    backgroundColor: 'rgba(0, 137, 188, 0.2)',
                    borderColor: 'rgba(0, 137, 188, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        var ctx2 = document.getElementById('portfolioDistributionChart').getContext('2d');
        var portfolioDistributionChart = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Ações', 'Renda Fixa', 'Imóveis', 'Criptomoedas'],
                datasets: [{
                    label: 'Distribuição da Carteira',
                    data: [40, 30, 20, 10],
                    backgroundColor: [
                        'rgba(0, 137, 188, 0.8)',
                        'rgba(114, 62, 209, 0.8)',
                        'rgba(123, 92, 229, 0.8)',
                        'rgba(11, 185, 227, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0, 137, 188, 1)',
                        'rgba(114, 62, 209, 1)',
                        'rgba(123, 92, 229, 1)',
                        'rgba(11, 185, 227, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
            }
        });
    }

    // Carregar os gráficos ao carregar a página
    loadCharts();
});
