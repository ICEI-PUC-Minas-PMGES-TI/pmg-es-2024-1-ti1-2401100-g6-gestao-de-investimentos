function renderTable(investments) {
    const table = document.querySelector(".investments table tbody");
    //clear table except for header
    Array.from(table.children)
        .splice(1)
        .forEach(child => table.removeChild(child));
    const values = {
        total: 0,
        invested: 0,
        roi: 0,
    }
    investments.forEach(investment => {
        const recentValues = getMostRecentValues(investment);
        if (recentValues.total === 0) return;
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
            location.href = location.href.replace("dashboard", "details") + "?id=" + investment.id;
        });

        table.appendChild(row);
    });

    return values;
}

function renderInfo(values) {
    values.roi = values.total / values.invested - 1;

    const totalInvested = document.querySelector("#total-invested .value");
    totalInvested.innerText = formatCash("BRL", values.invested / 100);

    const totalValue = document.querySelector("#total-value .value");
    totalValue.innerText = formatCash("BRL", values.total / 100);
    if (values.total !== 0) totalValue.classList.add(values.total > 0 ? "positive" : "negative");

    const roi = document.querySelector("#roi .value");
    roi.innerText = `${(values.roi * 100).toFixed(2)}%`;

    if (values.roi > 0) {
        roi.classList.add("positive");
        roi.innerText = "+" + roi.innerText;
    } else if (values.roi < 0) {
        roi.classList.add("negative");
    }
}

function renderGraphs(investments) {
    const growthGraph = document.querySelector("#growth");
    const portfolioGraph = document.querySelector("#portfolio");

    const graphData = calculateGraphsData(investments);

    graphs.growth = new Chart(growthGraph, {
        type: "line",
        data: graphData.growth,
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        callback: function (value, index, ticks) {
                            return formatCash("BRL", value);
                        }
                    }
                }
            },
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

    graphs.portfolio = new Chart(portfolioGraph, {
        type: "doughnut",
        data: graphData.portfolio,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    onClick: (_, legendItem, legend) => {
                        legend.chart.toggleDataVisibility(legendItem.index);
                        legend.chart.update();
                        const index = ignorePortfolioGraph.indexOf(legendItem.text);
                        if(index > -1) ignorePortfolioGraph.splice(index, 1);
                        else ignorePortfolioGraph.push(legendItem.text);
                        const finalInvestments = getFinalInvestments(investments);
                        const values = renderTable(finalInvestments);
                        renderInfo(values);
                        graphs.growth.data = calculateGraphsData(finalInvestments).growth;
                        graphs.growth.update();
                    }
                },
                title: {
                    text: "Portfólio"
                }
            }
        }
    });
}

function calculateGraphsData(investments) {
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
        if (!investmentsByType[investment.type]) {
            portfolioLabels.push(investment.type);
            investmentsByType[investment.type] = [];
        }
        investmentsByType[investment.type].push(investment);
    });
    const mostRecent = new Date(Math.max(...times));
    const leastRecent = new Date(Math.min(...times));
    if (mostRecent.getFullYear() - leastRecent.getFullYear() > 0) {
        let total = 0, invested = 0;
        for (let year = leastRecent.getFullYear(); year <= mostRecent.getFullYear(); year++) {
            let month = 0, maxMonth = 11;
            if (year === leastRecent.getFullYear()) month = leastRecent.getMonth();
            else if (year === mostRecent.getFullYear()) maxMonth = mostRecent.getMonth();
            for (; month <= maxMonth; month++) {
                growthLabels.push(`${year}-${monthNames[month]}`);
                investments.forEach(investment => {
                    const currentValues = getValues(investment, month, year);
                    if (!currentValues) return;
                    const [time, values] = currentValues;
                    total += values.total;
                    invested += values.invested;

                    const previousValues = getPreviousValues(investment, time);
                    if (previousValues) {
                        total -= previousValues.total;
                        invested -= previousValues.invested;
                    }
                });
                graphInvested.data.push(invested / 100);
                graphTotal.data.push(total / 100);
            }
        }
    } else {
        let total = 0, invested = 0;
        for (let month = leastRecent.getMonth(); month <= mostRecent.getMonth(); month++) {
            growthLabels.push(monthNames[month]);
            investments.forEach(investment => {
                const currentValues = getValues(investment, month);
                if (!currentValues) return;
                const [time, values] = currentValues;
                total += values.total;
                invested += values.invested;

                const previousValues = getPreviousValues(investment, time);
                if (previousValues) {
                    total -= previousValues.total;
                    invested -= previousValues.invested;
                }
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

    return {
        growth: {
            labels: growthLabels,
            datasets: [
                graphTotal,
                graphInvested
            ]
        },
        portfolio: {
            labels: portfolioLabels,
            datasets: [
                graphPortfolio
            ]
        }
    }
}

function getFinalInvestments(investments) {
    const filtered = investments.filter(investment => !ignorePortfolioGraph.includes(investment.type));
    return sortFunction ? filtered.sort(sortFunction) : filtered;
}

function setTableSorts(investments) {
    const headers = document.querySelectorAll(".investments table tbody th");
    headers.forEach(header => {
        if(header.children.length === 0) return;
        header.addEventListener("click", () => {
            const currentArrow = document.querySelector("th .arrows.top, th .arrows.bottom");
            const arrows = header.children[0].children[1];
            if (!currentArrow || currentArrow !== arrows) arrows.classList.add("top");
            if (currentArrow) {
                if (currentArrow === arrows) {
                    if (currentArrow.classList.contains("top")) {
                        currentArrow.classList.remove("top");
                        currentArrow.classList.add("bottom");
                    } else {
                        currentArrow.classList.remove("bottom");
                    }
                } else {
                    currentArrow.classList.remove("top", "bottom");
                }
            }
            sortFunction = null;
            const factor = arrows.classList.contains("top") ? 1 : -1;
            switch(header.children[0].children[0].innerText) {
                case "Nome":
                    sortFunction = (a, b) => factor * a.name.localeCompare(b.name);
                    break;
                case "Tipo":
                    sortFunction = (a, b) => factor * a.type.localeCompare(b.type);
                    break;
                case "Valor Investido":
                    sortFunction = (a, b) => factor * (getMostRecentValues(a).invested - getMostRecentValues(b).invested);
                    break;
                case "Valor Total":
                    sortFunction = (a, b) => factor * (getMostRecentValues(a).total - getMostRecentValues(b).total);
                    break;
                case "ROI":
                    sortFunction = (a, b) => {
                        const aValues = getMostRecentValues(a);
                        const aROI = aValues.total / aValues.invested;
                        const bValues = getMostRecentValues(b);
                        const bROI = bValues.total / bValues.invested;
                        return factor * (aROI - bROI);
                    }
                    break;
            }
            renderTable(getFinalInvestments(investments));
        });
    });
}

const graphs = {}, ignorePortfolioGraph = [];
let sortFunction = null;
async function load() {
    const investments = await getInvestments();
    if (!investments) return;
    setTableSorts(investments);

    const values = renderTable(investments);
    if(investments.length > 0) renderInfo(values);
    renderGraphs(investments);

    window.addEventListener('resize', () => {
        Object.values(graphs).forEach(graph => graph.destroy());
        renderGraphs(getFinalInvestments(investments));
    });
}

window.addEventListener('load', () => {
    load().then();
});