const id = parseInt(new URLSearchParams(window.location.search).get("id") ?? "0");

async function load() {
    const investments = await getInvestments();
    const investment = investments.find((investment) => investment.id === id);

    const name = document.querySelector("#name .value");
    const type = document.querySelector("#type .value");
    const invested = document.querySelector("#invested .value");
    const total = document.querySelector("#total .value");
    const roi = document.querySelector("#roi .value");

    name.innerText = investment.name;
    type.innerText = investment.type;
    const values = getMostRecentValues(investment);
    invested.innerText = formatCash("BRL", values.invested /100);
    total.innerText = formatCash("BRL", values.total /100);
    const roiValue = values.total / values.invested - 1;
    if(roiValue !== 0) roi.classList.add(roiValue > 0 ? "positive" : "negative");
    roi.innerText = `${roiValue > 0 ? "+" : ""}${(roiValue * 100).toFixed(4)} %`;

    const labels = [];
    const graphTotalValues = {
        label: "Valor Total",
        data: [],
        fill: false,
        borderColor: randomRGB(),
    };
    const graphInvestedValues = {
        label: "Valor Investido",
        data: [],
        fill: false,
        borderColor: randomRGB(),
    };

    const times = Object.keys(investment.values).sort((a,b)=>a-b);
    if(new Date(times[0]).getFullYear() - new Date(times[times.length - 1]).getFullYear() > 0) {
        times.forEach(time => {
            const date = new Date(time);
            labels.push(`${date.getFullYear()}-${monthNames[date.getMonth()]}`);
        });
    } else {
        times.forEach(time => {
            const date = new Date(time);
            labels.push(monthNames[date.getMonth()]);
            graphTotalValues.data.push(investment.values[time].total / 100);
            graphInvestedValues.data.push(investment.values[time].invested / 100);
        });
    }
    console.log(labels, graphInvestedValues, graphTotalValues);

    const allTimeGraph = document.querySelector("#all-time");
    new Chart(allTimeGraph, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                graphTotalValues,
                graphInvestedValues,
            ]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
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
                    text: "Evolução do Investimento"
                }
            }
        }
    });
}

window.addEventListener("load", () => {
    load().then();
});