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