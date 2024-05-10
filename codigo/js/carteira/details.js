const id = parseInt(new URLSearchParams(window.location.search).get("id") ?? "0");

async function load() {
    const investments = await getInvestments();
    const investment = investments.find((investment) => investment.id === id);
    console.log(investment);
}

window.addEventListener("load", () => {
    load().then();
});