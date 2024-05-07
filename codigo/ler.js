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