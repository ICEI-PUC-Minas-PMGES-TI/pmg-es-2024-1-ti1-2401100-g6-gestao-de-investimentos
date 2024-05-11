const {title, tooltip} = Chart.defaults.plugins;
title.display = true;
title.font.size = 36;

tooltip.callbacks.label = function(context) {
    let label = context.dataset.label || '';
    label += ": ";
    if(context.parsed !== null) {
        label += formatCash("BRL", context.parsed.y ? context.parsed.y : context.parsed);
    }
    return label;
}

const {font} = Chart.defaults;
font.family = "'Ubuntu', 'sans-serif";

async function getInvestments() {
    return await (await fetch("../../data/investments.json")).json();
}

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function randomRGB() {
    const rgb = Array.from({length: 3}, () => Math.floor(Math.random() * 256));
    return `rgb(${rgb.join(",")})`;
}

function getMostRecentValues(investment) {
    const times = Object.keys(investment.values).map(key => new Date(key).getTime());
    const mostRecent = Math.max(...times);
    return investment.values[Object.keys(investment.values).find(key => mostRecent === new Date(key).getTime())];
}

function getPreviousValues(investment, current) {
    const times = Object.keys(investment.values);
    return investment.values[times[times.indexOf(current) - 1]];
}

function getValues(investment, month, year) {
    return Object.entries(investment.values).find(([time, values]) => {
        const date = new Date(time);
        if(year) return year === date.getFullYear() && month === date.getMonth();
        else return month === date.getMonth();
    });
}

function formatCash(currency, value) {
    return new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: currency,
    }).format(value);
}

function mainLoad() {
    const sidebarItems = document.querySelectorAll("#sidebar .item:not(.active)");
    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            const {location} = window;
            const path = location.href.split("/");
            path[path.length - 1] = item.getAttribute("data-href");
            location.replace(path.join("/"));
        });
    });

    const main = document.querySelector("main");
    main.classList.remove("loading");
}

window.addEventListener("load", () => {
    const toggleButtons = document.querySelectorAll("button.toggle");
    toggleButtons.forEach(button => {
        const selector = button.getAttribute("data-target");
        const target = document.querySelector(selector);
        let first = true;
        button.addEventListener("click", () => {
            if(button.classList.contains("open") || first) {
                button.classList.remove("open");
                button.classList.add("close");
                first = false;
            } else {
                button.classList.add("open");
                button.classList.remove("close");
            }
            target.classList.toggle("collapse");
        });
    });

    mainLoad();
});