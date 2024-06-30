document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');

    // Expand and collapse sidebar on hover
    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInUser');
        window.location.href = '/codigo/pages/login_page.html';
    });

    // Simulated data
    const valuation = 15000.75;
    const depreciation = 2000.25;
    const totalReturn = valuation - depreciation;
    const annualGrowthRate = 0.12;
    const roi = 0.25;

    // Update the HTML with the fetched data
    document.getElementById('valuation').textContent = `R$ ${valuation.toFixed(2)}`;
    document.getElementById('depreciation').textContent = `R$ ${depreciation.toFixed(2)}`;
    document.getElementById('total-return').textContent = `R$ ${totalReturn.toFixed(2)}`;
    document.getElementById('annualGrowthRate').textContent = `${(annualGrowthRate * 100).toFixed(2)}%`;
    document.getElementById('roi').textContent = `${(roi * 100).toFixed(2)}%`;

    // Performance chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Rendimento',
                data: [12000, 15000, 14000, 15500, 16000, 16500, 17000],
                backgroundColor: 'rgba(0, 137, 188, 0.2)',
                borderColor: 'rgba(0, 137, 188, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Mês'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valor (R$)'
                    }
                }
            }
        }
    });

    // Asset distribution chart
    const assetDistributionCtx = document.getElementById('assetDistributionChart').getContext('2d');
    new Chart(assetDistributionCtx, {
        type: 'pie',
        data: {
            labels: ['Ações', 'Criptomoedas', 'Fundos', 'Títulos'],
            datasets: [{
                label: 'Distribuição de Ativos',
                data: [40, 25, 20, 15],
                backgroundColor: ['#441092', '#723ed1', '#0bb9e3', '#ffcc00'],
                borderColor: ['#441092', '#723ed1', '#0bb9e3', '#ffcc00'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
        }
    });

    // Portfolio allocation chart
    const portfolioAllocationCtx = document.getElementById('portfolioAllocationChart').getContext('2d');
    new Chart(portfolioAllocationCtx, {
        type: 'doughnut',
        data: {
            labels: ['Tecnologia', 'Saúde', 'Energia', 'Financeiro'],
            datasets: [{
                label: 'Alocação de Portfólio',
                data: [30, 25, 25, 20],
                backgroundColor: ['#0089bc', '#00c49a', '#ffca00', '#f45b69'],
                borderColor: ['#0089bc', '#00c49a', '#ffca00', '#f45b69'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
        }
    });

    // Weekly variation chart
    const weeklyVariationCtx = document.getElementById('weeklyVariationChart').getContext('2d');
    new Chart(weeklyVariationCtx, {
        type: 'bar',
        data: {
            labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
            datasets: [{
                label: 'Variação Semanal',
                data: [5000, 5500, 5200, 5800],
                backgroundColor: 'rgba(114, 62, 209, 0.5)',
                borderColor: 'rgba(114, 62, 209, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Semana'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Valor (R$)'
                    }
                }
            }
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('expense-form');
    const expensesTable = document.getElementById('expenses-table').getElementsByTagName('tbody')[0];
    const expensesChartCtx = document.getElementById('expenses-chart').getContext('2d');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let chart;
    let editingExpenseId = null;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const transactionDate = document.getElementById('transaction-date').value;
        const transactionType = document.getElementById('transaction-type').value;
        const transactionAmount = parseFloat(document.getElementById('transaction-amount').value);
        const bank = document.getElementById('bank').value;

        if (!transactionDate || isNaN(transactionAmount) || !bank) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        if (editingExpenseId !== null) {
            const expenseIndex = expenses.findIndex(expense => expense.id === editingExpenseId);
            expenses[expenseIndex] = {
                id: editingExpenseId,
                date: transactionDate,
                type: transactionType,
                amount: transactionAmount,
                bank
            };
            editingExpenseId = null;
        } else {
            const newExpense = {
                id: Date.now(),
                date: transactionDate,
                type: transactionType,
                amount: transactionAmount,
                bank
            };
            expenses.push(newExpense);
        }

        recalculateExpenses();
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateTable();
        updateChart();
        form.reset();
    });

    function recalculateExpenses() {
        let totalAmount = 0;
        expenses.forEach(expense => {
            const amount = expense.type === 'Entrada' ? expense.amount : -expense.amount;
            totalAmount += amount;
            expense.leftoverAmount = totalAmount;
            expense.status = totalAmount > 0 ? 'Positivo' : totalAmount < 0 ? 'Negativo' : 'Neutro';
        });
    }

    function updateTable() {
        expensesTable.innerHTML = '';
        expenses.forEach(expense => addExpenseToTable(expense));
    }

    function addExpenseToTable(expense) {
        const row = expensesTable.insertRow();
        row.setAttribute('data-id', expense.id);

        row.insertCell(0).textContent = new Date(expense.date).toLocaleDateString();
        row.insertCell(1).textContent = expense.type;
        row.insertCell(2).textContent = expense.amount;
        row.insertCell(3).textContent = expense.leftoverAmount;
        row.insertCell(4).textContent = expense.status;
        row.insertCell(5).textContent = expense.bank;

        const actionsCell = row.insertCell(6);
        actionsCell.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => editExpense(expense.id));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteExpense(expense.id));
        actionsCell.appendChild(deleteButton);
    }

    function editExpense(id) {
        const expense = expenses.find(expense => expense.id === id);
        document.getElementById('transaction-date').value = expense.date;
        document.getElementById('transaction-type').value = expense.type;
        document.getElementById('transaction-amount').value = expense.amount;
        document.getElementById('bank').value = expense.bank;
        editingExpenseId = id;
    }

    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        recalculateExpenses();
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateTable();
        updateChart();
    }

    function updateChart() {
        if (chart) {
            chart.destroy();
        }

        const labels = expenses.map(expense => new Date(expense.date).toLocaleDateString());
        const data = expenses.map(expense => expense.leftoverAmount);

        chart = new Chart(expensesChartCtx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Saldo',
                    data,
                    borderColor: '#008adb',
                    backgroundColor: 'rgba(0, 138, 219, 0.2)',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Data'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Saldo'
                        }
                    }
                }
            }
        });
    }

    recalculateExpenses();
    updateTable();
    updateChart();
});
