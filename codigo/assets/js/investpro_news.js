function lerNoticias() {
    let strdados = localStorage.getItem('db');
    let objDados = {};
    if (strdados) {
        objDados = JSON.parse(strdados);
    } else {
        objDados = {
            Noticias: [{
                titulo: "noticias teste",
                Resumo: "esse e um teste de noticias",
                link: "https://www.cnnbrasil.com.br/economia/negocios/brasil-importa-energia-do-uruguai-para-garantir-fornecimento-ao-rs/",
                Image: "images/sua-imagem.jpg", // Substitua 'sua-imagem.jpg' pelo nome correto do arquivo da sua imagem
            }],
        };
    }
    return objDados;
}

function salvaNoticias(objDados) {
    localStorage.setItem('db', JSON.stringify(objDados));
}

function incluirNoticias() {
    let objDados = lerNoticias();
    let strtitulo = document.getElementById('campoTitulo').value;
    let strImage = document.getElementById('campoImg').value;
    let strResumo = document.getElementById('campoResumo').value;
    let strlink = document.getElementById('campoLink').value;
    let NovaNoticia = {
        titulo: strtitulo,
        Resumo: strResumo,
        link: strlink,
        Image: strImage,
    };
    objDados.Noticias.push(NovaNoticia);
    salvaNoticias(objDados);
}

function imprimirNoticias() {
    let tela = document.getElementById('noticias');
    let strHtml = '';
    let objDados = lerNoticias();
    for (let i = objDados.Noticias.length - 1; i >= 0; i--) {
        strHtml += '<a href="' + objDados.Noticias[i].link + '"><div class="card" style="width: 20rem;"><h2>' + objDados.Noticias[i].titulo + '</h2><img src="' + objDados.Noticias[i].Image + '" class="card-img-top" alt="..."><div class="card-body"><p class="card-text">' + objDados.Noticias[i].Resumo + '</p></div></div></a>';
    }
    tela.innerHTML = strHtml;
}

window.onload = imprimirNoticias();
