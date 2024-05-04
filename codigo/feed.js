function leNoticias() {
    let strdados = localStorage.getItem('db');
    let objDados = {};
    if (strdados) {
        objDados = JSON.parse(strdados);
    } else {
        objDados = {
            Noticias: [{
                    titulo: "noticias teste",
                    Resumo: "esse e um teste de noticias",
                    link: "https://www.cnnbrasil.com.br/economia/negocios/brasil-importa-energia-do-uruguai-para-garantir-fornecimento-ao-rs/"
                },
                {
                    titulo: "noticias teste",
                    Resumo: "esse e um teste de noticias",
                    link: "https://www.cnnbrasil.com.br/economia/negocios/brasil-importa-energia-do-uruguai-para-garantir-fornecimento-ao-rs/"
                },
                {
                    titulo: "noticias teste",
                    Resumo: "esse e um teste de noticias",
                    link: "https://www.cnnbrasil.com.br/economia/negocios/brasil-importa-energia-do-uruguai-para-garantir-fornecimento-ao-rs/"
                }
            ]
        };
    }
    return objDados;
}

function salvaNoticias(objDados) {
    localStorage.setItem('db', JSON.stringify(objDados));
}

function incluirNoticias() {
    let objDados = leNoticias();
    let strtitulo = document.getElementById('campoTitulo').value;
    let strResumo = document.getElementById('campoResumo').value;
    let strlink = document.getElementById('campoLink').value;
    let NovaNoticia = {
        titulo: strtitulo,
        Resumo: strResumo,
        link: strlink,
    };
    objDados.Noticias.push(NovaNoticia);
    salvaNoticias(objDados);
    lerNoticias(); // Atualiza a exibição das notícias após adicionar uma nova
}

function lerNoticias() {
    let tela = document.getElementById('noticias');
    let strHtml = '';
    let objDados = leNoticias();
    for (let i = 0; i < objDados.Noticias.length; i++) {
        strHtml += '<div class="card" style="width: 20rem;"><h2>' + objDados.Noticias[i].titulo + '</h2><img src="' + objDados.Noticias[i].link + '" class="card-img-top" alt="..."><div class="card-body"><p class="card-text">' + objDados.Noticias[i].Resumo + '</p></div></div>';
    }
    tela.innerHTML = strHtml;
}


document.getElementById('ler').addEventListener('click', lerNoticias);
document.getElementById('EnviarNoticia').addEventListener('click', incluirNoticias);


window.onload = lerNoticias;
