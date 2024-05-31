class AcoesServices {
    constructor() {
        this.baseURL = "http://localhost:3000";
    }

    async getAll(sorter, range, clear) {
        const response = await fetch(this.baseURL + "/acoes");

        if(!response.ok) {
            alert("Verifique se o JSONServer está rodando");
            throw new Error(response.statusText);
        }

        const parsed = await response.json();
        if(range) this.filterRange(parsed, range, clear);
        if(sorter) this.sort(parsed, sorter);
        return parsed;
    }

    async getFromID(ID, range, limit = 0) {
        const all = await this.getAll(null, range, false);
        const tester = new RegExp(ID, "gi");
        Object.keys(all).forEach(key => {
            if(!tester.test(key)) delete all[key];
        });
        const keys = Object.keys(all);
        if(keys.length < 0) return undefined;
        if(keys.length === 1 && limit === 1) return all[keys[0]];
        return all;
    }

    filterRange(all, range, clear = true) {
        const [min, max] = range.map(e => e.getTime());
        Object.entries(all).forEach(([key, acao]) => {
            Object.keys(acao.tracking).forEach(date => {
                const time = new Date(date).getTime();
                if(min > time || max < time) {
                    delete acao["tracking"][date];
                    if(clear && Object.keys(acao["tracking"]).length === 0) delete all[key];
                }
            });
        });
    }

    sort(all, sorter) {
        const sorted = {};
        Object.entries(all).sort(sorter).forEach(([key, acao]) => {
            sorted[key] = acao;
            delete all[key];
        });
        Object.assign(all, sorted);
    }
}

export const acoesServices = new AcoesServices();