function imprimirNoticias() {
    let tela = document.getElementById('noticias');
    let strHtml = '';
    let objDados = lerNoticias();
    for (let i = 0; i < objDados.Noticias.length; i++) {
        strHtml += '<div class="card" style="width: 20rem;"><h2>' + objDados.Noticias[i].titulo + '</h2><img src="' + objDados.Noticias[i].link + '" class="card-img-top" alt="..."><div class="card-body"><p class="card-text">' + objDados.Noticias[i].Resumo + '</p></div></div>';
    }
    tela.innerHTML = strHtml;
}
window.onload = imprimirNoticias