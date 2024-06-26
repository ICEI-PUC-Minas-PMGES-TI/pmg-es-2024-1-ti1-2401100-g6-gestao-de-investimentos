document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const accountInfo = document.getElementById('accountInfo');
    const accountForm = document.getElementById('accountForm');

    function openTab(event, tabName) {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        document.getElementById(tabName).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    // Adicione os eventos de clique para os botões de aba
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            openTab(event, this.getAttribute('onclick').split("'")[1]);
        });
    });

    // Carregar informações do perfil do localStorage
    function loadProfile() {
        const profile = JSON.parse(localStorage.getItem('profile'));
        if (profile) {
            document.getElementById('viewUsername').textContent = profile.username || '';
            document.getElementById('viewFirstName').textContent = profile.firstName || '';
            document.getElementById('viewLastName').textContent = profile.lastName || '';
            document.getElementById('viewPhoneNumber').textContent = profile.phoneNumber || '';
            document.getElementById('viewEmailAddress').textContent = profile.emailAddress || '';
            document.getElementById('viewCity').textContent = profile.city || '';
            document.getElementById('viewStateCounty').textContent = profile.stateCounty || '';
            document.getElementById('viewPostcode').textContent = profile.postcode || '';
            document.getElementById('viewCountry').textContent = profile.country || '';
            document.getElementById('username').textContent = `${profile.username || ''}`;
            document.getElementById('useremail').textContent = profile.emailAddress || '';

            // Preencher o formulário com as informações do perfil
            document.getElementById('usernameInput').value = profile.username || '';
            document.getElementById('firstName').value = profile.firstName || '';
            document.getElementById('lastName').value = profile.lastName || '';
            document.getElementById('phoneNumber').value = profile.phoneNumber || '';
            document.getElementById('emailAddress').value = profile.emailAddress || '';
            document.getElementById('city').value = profile.city || '';
            document.getElementById('stateCounty').value = profile.stateCounty || '';
            document.getElementById('postcode').value = profile.postcode || '';
            document.getElementById('country').value = profile.country || '';
        }
    }

    // Editar configurações da conta
    window.editAccountSettings = function() {
        accountInfo.style.display = 'none';
        accountForm.style.display = 'block';
    };

    // Cancelar edição
    window.cancelEdit = function() {
        accountForm.style.display = 'none';
        accountInfo.style.display = 'block';
    };

    // Salvar configurações da conta
    window.saveAccountSettings = function() {
        const profile = {
            username: document.getElementById('usernameInput').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            emailAddress: document.getElementById('emailAddress').value,
            city: document.getElementById('city').value,
            stateCounty: document.getElementById('stateCounty').value,
            postcode: document.getElementById('postcode').value,
            country: document.getElementById('country').value
        };

        localStorage.setItem('profile', JSON.stringify(profile));
        loadProfile();
        cancelEdit();
    };

    // Limpar dados da conta
    window.clearAccountData = function() {
        if (confirm('Tem certeza de que deseja apagar seus dados?')) {
            const profile = JSON.parse(localStorage.getItem('profile'));
            profile.firstName = '';
            profile.lastName = '';
            profile.phoneNumber = '';
            profile.city = '';
            profile.stateCounty = '';
            profile.postcode = '';
            profile.country = '';
            localStorage.setItem('profile', JSON.stringify(profile));
            loadProfile();
        }
    };

    // Confirmar exclusão da conta
    window.confirmDeleteAccount = function() {
        $('#confirmDeleteModal').modal('show');
    };

    // Excluir conta
    window.deleteAccount = function() {
        localStorage.removeItem('profile');
        window.location.href = 'index.html';
    };

    // Alterar imagem de perfil
    window.changeProfilePic = function() {
        // Implementar lógica para alterar a imagem de perfil
    };

    // Alterar banner
    window.changeBanner = function() {
        // Implementar lógica para alterar o banner
    };

    loadProfile();

    // Funções do Quiz
    const questions = document.querySelectorAll('.quiz-question');
    const progressBar = document.getElementById('progress_bar');
    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.style.display = i === index ? 'block' : 'none';
        });
        updateProgressBar(index);
    }

    function updateProgressBar(index) {
        const progress = (index / (questions.length - 1)) * 100;
        progressBar.firstElementChild.style.width = `${progress}%`;
    }

    function handleAnswerClick(event) {
        const selectedAnswer = event.target.previousElementSibling.querySelector('input:checked');
        if (selectedAnswer) {
            score += parseInt(selectedAnswer.value);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion(currentQuestionIndex);
            } else {
                showResult();
            }
        } else {
            alert('Por favor, selecione uma resposta.');
        }
    }

    function showResult() {
        document.getElementById('result').style.display = 'block';
        document.getElementById('printtotalscore').innerText = `Score: ${score}`;
        document.getElementById('printscoreinfo').innerText = 'Descrição do perfil de investimento baseado no score.';
    }

    document.querySelectorAll('.submit-button').forEach(button => {
        button.addEventListener('click', handleAnswerClick);
    });

    document.querySelector('.retake-button').addEventListener('click', () => {
        score = 0;
        currentQuestionIndex = 0;
        showQuestion(currentQuestionIndex);
        document.getElementById('result').style.display = 'none';
    });

    // Mostrar a primeira pergunta do quiz
    showQuestion(currentQuestionIndex);
});
