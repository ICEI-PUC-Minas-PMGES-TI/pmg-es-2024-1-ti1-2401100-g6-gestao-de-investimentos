const {title} = Chart.defaults.plugins;
title.display = true;
title.font.size = 36;

const {font} = Chart.defaults;
font.family = "'Ubuntu', 'sans-serif";

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function getMostRecentValues(investment) {
    const times = Object.keys(investment.values).map(key => new Date(key).getTime());
    const mostRecent = Math.max(...times);
    return investment.values[Object.keys(investment.values).find(key => mostRecent === new Date(key).getTime())];
}

function randomRGB() {
    const rgb = Array.from({length: 3}, () => Math.floor(Math.random() * 256));
    return `rgb(${rgb.join(",")})`;
}

async function load() {
    const investments = await getInvestments();
    const table = document.querySelector(".investments table tbody");
    const values = {
        total: 0,
        invested: 0,
        roi: 0,
    }
    investments.forEach(investment => {
        const recentValues = getMostRecentValues(investment);
        values.total += recentValues.total;
        values.invested += recentValues.invested;

        const row = document.createElement("tr");

        const icon = document.createElement("td");
        const iconImg = document.createElement("img");
        iconImg.src = investment.icon;
        iconImg.alt = "ícone da corretora";
        iconImg.classList.add("icon");
        icon.appendChild(iconImg);

        const name = document.createElement("td");
        name.classList.add("name");
        name.innerText = investment.name;

        const type = document.createElement("td");
        type.classList.add("type");
        type.innerText = investment.type;

        const investedValue = document.createElement("td");
        investedValue.classList.add("value");
        investedValue.innerText = formatCash("BRL", recentValues.invested / 100);

        const totalValue = document.createElement("td");
        totalValue.classList.add("value");
        totalValue.innerText = formatCash("BRL", recentValues.total / 100);

        const roi = document.createElement("td");
        roi.classList.add("roi");
        roi.innerText = ((recentValues.total / recentValues.invested - 1) * 100).toFixed(2) + "%";

        row.append(icon, name, type, investedValue, totalValue, roi);

        row.addEventListener("click", () => {
            const {location} = window;
            location.replace(location.href.replace("dashboard", "details") + "?id=" + investment.id);
        });

        table.appendChild(row);
    });

    values.roi = values.total / values.invested - 1;

    const totalInvested = document.querySelector("#total-invested .value");
    totalInvested.innerText = formatCash("BRL", values.invested / 100);

    const totalValue = document.querySelector("#total-value .value");
    totalValue.innerText = formatCash("BRL", values.total / 100);
    if(values.total !== 0) totalValue.classList.add(values.total > 0 ? "positive" : "negative");

    const roi = document.querySelector("#roi .value");
    roi.innerText = `${(values.roi * 100).toFixed(2)}%`;

    if(values.roi > 0) {
        roi.classList.add("positive");
        roi.innerText = "+" + roi.innerText;
    } else if(values.roi < 0) {
        roi.classList.add("negative");
    }

    const growthGraph = document.querySelector("#growth");
    const portfolioGraph = document.querySelector("#portfolio");

    const growthLabels = [];
    const graphInvested = {
        label: "Total Investido",
        data: [],
        fill: false,
        borderColor: randomRGB(),
    };
    const graphTotal = {
        label: "Valor Total",
        data: [],
        fill: false,
        borderColor: randomRGB(),
    };
    const portfolioLabels = [];
    const graphPortfolio = {
        label: "Portfólio",
        data: [],
        backgroundColor: []
    };

    const times = [], investmentsByType = {};
    investments.forEach(investment => {
        times.push(...Object.keys(investment.values).map(key => new Date(key).getTime()));
        if(!investmentsByType[investment.type]) {
            portfolioLabels.push(investment.type);
            investmentsByType[investment.type] = [];
        }
        investmentsByType[investment.type].push(investment);
    });
    const mostRecent = new Date(Math.max(...times));
    const leastRecent = new Date(Math.min(...times));
    if(mostRecent.getFullYear() - leastRecent.getFullYear() > 0) {
        let total = 0, invested = 0;
        for(let year = leastRecent.getFullYear(); year <= mostRecent.getFullYear(); year++) {
            let month = 0, maxMonth = 11;
            if(year === leastRecent.getFullYear()) month = leastRecent.getMonth();
            else if(year === mostRecent.getFullYear()) maxMonth = mostRecent.getMonth();
            for(; month <= maxMonth; month++) {
                growthLabels.push(`${year}-${monthNames[month]}`);
                investments.forEach(investment => {
                    Object.keys(investment.values).forEach(key => {
                        const date = new Date(key);
                        if(date.getMonth() === month && date.getFullYear() === year) {
                            total += investment.values[key].total;
                            invested += investment.values[key].invested;
                        }
                    });
                });
                graphInvested.data.push(invested / 100);
                graphTotal.data.push(total / 100);
            }
        }
    } else {
        let total = 0, invested = 0;
        for(let month = leastRecent.getMonth(); month <= mostRecent.getMonth(); month++) {
            growthLabels.push(monthNames[month]);
            investments.forEach(investment => {
                Object.keys(investment.values).forEach(key => {
                    const date = new Date(key);
                    if(date.getMonth() === month) {
                        total += investment.values[key].total;
                        invested += investment.values[key].invested;
                    }
                });
            });
            graphTotal.data.push(total / 100);
            graphInvested.data.push(invested / 100);
        }
    }

    Object.entries(investmentsByType).forEach(([_, investments]) => {
        let total = 0;
        investments.forEach(investment => {
            total += getMostRecentValues(investment).total;
        });
        graphPortfolio.backgroundColor.push(randomRGB());
        graphPortfolio.data.push(total / 100);
    });

    new Chart(growthGraph, {
        type: "line",
        data: {
            labels: growthLabels,
            datasets: [
                graphTotal,
                graphInvested,
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    align: "start",
                },
                title: {
                    text: "Valor Investido"
                }
            }
        }
    });

    new Chart(portfolioGraph, {
        type: "doughnut",
        data: {
            labels: portfolioLabels,
            datasets: [
                graphPortfolio
            ]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right"
                },
                title: {
                    text: "Portfólio"
                }
            }
        }
    });
}

window.addEventListener('load', () => {
    load().then();
});