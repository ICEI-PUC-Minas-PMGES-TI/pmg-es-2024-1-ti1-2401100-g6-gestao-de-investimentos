import {acoesServices} from "../../../services/acoes.js";
import {getMaxFromAcao, getMinFromAcao, parseDateToInput, parseToCash} from "./index.js";

const table = document.querySelector("#table .body");

let minDate = new Date(), maxDate = new Date();
minDate.setDate(maxDate.getDate() - 5);

const fromInput = document.querySelector("#from");
fromInput.value = parseDateToInput(minDate);

const toInput = document.querySelector("#to");
toInput.value = parseDateToInput(maxDate);

[fromInput, toInput].forEach(input => {
    input.addEventListener("input", () => {
        if(input === fromInput) minDate = new Date(fromInput.value);
        else maxDate = new Date(toInput.value);
        loadAcoes(true).catch(err => console.log(err));
    });
});

const idInput = document.querySelector("#identifier");
idInput.addEventListener("input", () => {
    ID = idInput.value;
    loadAcoes(true).catch(err => console.log(err));
});

let requested = false, sortFunction = null, ID = null;
async function loadAcoes(reset = false) {
    requested = true;
    if(reset) clearAcoes();
    let acoes
    if(ID) acoes = await acoesServices.getFromID(ID, [minDate, maxDate]);
    else acoes = await acoesServices.getAll(sortFunction, [minDate, maxDate]);

    Object.entries(acoes).forEach(([ID, data]) => {
        const row = document.createElement("div");
        row.classList.add("row");

        row.addEventListener("click", () => {
            seeDetails(ID);
        });

        const identifier = document.createElement("span");
        identifier.innerText = ID;
        const segment = document.createElement("span");
        segment.innerText = data.segmentName;

        const maxPrice = document.createElement("span");
        maxPrice.innerText = parseToCash(getMaxFromAcao(data));
        const minPrice = document.createElement("span");
        minPrice.innerText = parseToCash(getMinFromAcao(data));

        row.append(identifier, segment, maxPrice, minPrice);
        table.appendChild(row);
    });

    requested = false;
}

function clearAcoes() {
    Array.from(table.children).forEach(child => child.remove());
}

function seeDetails(id) {
    window.location.href = window.location.href.split("/").slice(0, -1).join("/") + "/detalhes.html?id=" + id + "&min=" + minDate.getTime() + "&max=" + maxDate.getTime();
}

function setSorters() {
    const headers = document.querySelectorAll("#table .header > div");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const currentArrow = document.querySelector("#table .arrows.top, #table .arrows.bottom");
            const arrows = header.children[1];
            if (!currentArrow || currentArrow !== arrows) arrows.classList.add("top");
            let skip = false;
            if (currentArrow) {
                if (currentArrow === arrows) {
                    if (currentArrow.classList.contains("top")) {
                        currentArrow.classList.remove("top");
                        currentArrow.classList.add("bottom");
                    } else {
                        currentArrow.classList.remove("bottom");
                        skip = true;
                    }
                } else {
                    currentArrow.classList.remove("top", "bottom");
                }
            }
            sortFunction = null;
            if(!skip) {
                const factor = arrows.classList.contains("top") ? 1 : -1;
                switch(header.children[0].innerText) {
                    case "ISIN":
                        sortFunction = ([a, _], [b, __]) => factor * a.localeCompare(b);
                        break;
                    case "Segmento":
                        sortFunction = ([_, a], [__, b]) => factor * a.segmentName.localeCompare(b.segmentName);
                        break;
                    case "Preço Máx.":
                        sortFunction = ([_, a], [__, b]) => factor * (getMaxFromAcao(a) - getMaxFromAcao(b));
                        break;
                    case "Preço Mín.":
                        sortFunction = ([_, a], [__, b]) => factor * (getMinFromAcao(a) - getMinFromAcao(b));
                        break;
                }
            }
            loadAcoes(true).catch(err => console.log(err));
        });
    });
}

window.addEventListener("load", () => {
    loadAcoes().catch(err => console.log(err));
    setSorters();
});