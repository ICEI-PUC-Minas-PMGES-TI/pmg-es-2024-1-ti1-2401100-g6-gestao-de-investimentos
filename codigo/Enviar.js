

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




document.getElementById('EnviarNoticia').addEventListener('click', incluirNoticias);



