function leNoticias() {
    let strdados= localStorage.getItem('db');
    let objDados = {}
    if (strdados){
        objDados =JSON.parse (strdados)
    }
    else {
        objDados = { Noticias : [
             {titulo: "noticias teste", Resumo: "esse e um teste de noticias", link: "https://www.cnnbrasil.com.br/economia/negocios/brasil-importa-energia-do-uruguai-para-garantir-fornecimento-ao-rs/"},
             {titulo: "noticias teste", Resumo: "esse e um teste de noticias", link: "https://www.cnnbrasil.com.br/economia/negocios/brasil-importa-energia-do-uruguai-para-garantir-fornecimento-ao-rs/"},
             {titulo: "noticias teste", Resumo: "esse e um teste de noticias", link: "https://www.cnnbrasil.com.br/economia/negocios/brasil-importa-energia-do-uruguai-para-garantir-fornecimento-ao-rs/"},

        ]
        }
    }
    return objDados;
}
function salvaNoticias() {
    localStorage.setItem ('db', JSON.stringify (Dados));
}
function incluirNoticias(){
    let  tela = document.getElementById('')
}