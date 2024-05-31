export const getMaxFromAcao = acao => {
    const allValues = Object.values(acao.tracking);
    return Math.max(0, ...allValues.map(day => +day.maxPrice));
}

export const getMinFromAcao = acao => {
    const allValues = Object.values(acao.tracking);
    return Math.min(0, ...allValues.map(day => +day.minPrice));
}

export const parseToCash = (value, currency = "BRL") => {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: currency,
    }).format(value);
}

export const parseDateToInput = date => {
    let year = (date.getFullYear()).toString(),
        month = (date.getMonth() + 1).toString(),
        day = (date.getDate()).toString(),
        hours = (date.getHours()).toString(),
        minutes = (date.getMinutes()).toString();
    while(year.length < 4) year = "0" + year;
    while(month.length < 2) month = "0" + month;
    while(day.length < 2) day = "0" + day;
    while(hours.length < 2) hours = "0" + hours;
    while(minutes.length < 2) minutes = "0" + minutes;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}