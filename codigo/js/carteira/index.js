async function getInvestments() {
    return await (await fetch("../../data/investments.json")).json();
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
    mainLoad();
});