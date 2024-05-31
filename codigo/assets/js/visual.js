document.addEventListener('DOMContentLoaded', function() {
    var cpfInput = document.getElementById('cpf');
    var telefoneInput = document.getElementById('telefone');

    var cpfMaxLength = 14;
    var telefoneMaxLength = 14;

    cpfInput.addEventListener('input', function(event) {
        var value = event.target.value.replace(/\D/g, '');
        var maskedValue = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        event.target.value = maskedValue.substring(0, cpfMaxLength);
    });

    telefoneInput.addEventListener('input', function(event) {
        var value = event.target.value.replace(/\D/g, '');
        var maskedValue = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        event.target.value = maskedValue.substring(0, telefoneMaxLength);
    });
});
