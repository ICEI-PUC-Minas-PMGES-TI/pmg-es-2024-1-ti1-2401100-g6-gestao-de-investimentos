document.addEventListener('DOMContentLoaded', function() {
    // Configuração do carrossel
    $('.carousel').carousel({
        interval: 3000
    });

    // Opção para parar o carrossel no hover
    $('.carousel').hover(function() {
        $(this).carousel('pause');
    }, function() {
        $(this).carousel('cycle');
    });
});
