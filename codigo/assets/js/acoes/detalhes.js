import {acoesServices} from "../../../services/acoes.js";
import {getMaxFromAcao, getMinFromAcao, parseDateToInput, parseToCash} from "./index.js";

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const params = new URLSearchParams(window.location.search);
const id = params.has("id") ? params.get("id") : null;

let minDate = params.has("min") ?  new Date(+params.get("min")) : new Date(),
    maxDate = params.has("max") ?  new Date(+params.get("max")) : new Date();
if(!params.has("min")) minDate.setDate(minDate.getDate() - 5);
let acao = await acoesServices.getFromID(id, [minDate, maxDate], 1);

const fromInput = document.querySelector("#from");
fromInput.value = parseDateToInput(minDate);

const toInput = document.querySelector("#to");
toInput.value = parseDateToInput(maxDate);

[fromInput, toInput].forEach(input => {
    input.addEventListener("input", async () => {
        if(input === fromInput) minDate = new Date(fromInput.value);
        else maxDate = new Date(toInput.value);
        acao = await acoesServices.getFromID(id, [minDate, maxDate], 1);
        loadInfo(true);
        loadGraph(true);
    });
});

function loadInfo(onlyPrice = false) {
    if(!onlyPrice) {
        ID.innerText = id;
        ISIN.innerText = acao.ISIN;
    }
    console.log(acao);
    let min = getMinFromAcao(acao),
        max = getMaxFromAcao(acao);
    if(acao.tracking && (min !== 0 || max !== 0)) {
        minPrice.innerText = parseToCash(min);
        maxPrice.innerText = parseToCash(max);
    } else {
        minPrice.innerText = maxPrice.innerText = "R$ -";
    }
}

const canvas = document.querySelector("#graph");
let chart;
function loadGraph(reset = false) {
    function createGraph() {
        const dates = Object.keys(acao.tracking).map(key => [key, new Date(key)]).sort(([_, a], [__, b]) => a.getTime() - b.getTime());
        const labels = [],
            min = [],
            max = [],
            average = [],
            last = [],
            tradeQuantity = [],
            financialVolume = [];
        const {tracking} = acao;
        dates.forEach(([key, date]) => {
            labels.push(`${date.getDate()}-${monthNames[date.getMonth()]}`);
            min.push(tracking[key].minPrice);
            max.push(tracking[key].maxPrice);
            average.push(tracking[key].averagePrice);
            last.push(tracking[key].lastPrice);
            tradeQuantity.push(tracking[key].tradeQuantity);
            financialVolume.push(tracking[key].financialVolume);
        });

        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Preço Mínimo",
                    data: min,
                },
                {
                    label: "Preço Máximo",
                    data: max,
                },
                {
                    label: "Preço Médio",
                    data: average,
                },
                {
                    label: "Último Preço",
                    data: last,
                },
                {
                    label: "Vendas Negociadas",
                    data: tradeQuantity,
                },
                {
                    label: "Volume Movido",
                    data: financialVolume,
                }
            ]
        }
        const options = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    onHover: (_, __, ___) => canvas.style.cursor = "pointer",
                    onLeave: (_, __, ___) => canvas.style.cursor = "default",
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            let label = (context.dataset.label || '') + ": ";
                            if (context.parsed.y) {
                                label += context.dataset.label !== "Vendas Negociadas" ? parseToCash(context.parsed.y) : context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            }
        }
        return new Chart(
            canvas,
            {
                type: "line",
                data: data,
                options: options
            }
        );
    }
    if(reset) chart.destroy();
    chart = createGraph();
    chart.hide(5);
}

const ID = document.querySelector("#ID .value");
const ISIN = document.querySelector("#ISIN .value");
const minPrice = document.querySelector("#min-price .value");
const maxPrice = document.querySelector("#max-price .value");

window.addEventListener("load", () => {
    loadInfo();
    loadGraph();
});

window.addEventListener("resize", () => {
    loadGraph(true);
});