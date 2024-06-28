document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');

    // Expand and collapse sidebar on hover
    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInUser');
        window.location.href = '/codigo/pages/login_page.html'; // Redirect to login after logout
    });

    const profileInfo = document.getElementById('profile-info');
    const profileForm = document.getElementById('profile-form');
    const editProfileBtn = document.getElementById('edit-profile');
    const deleteAccountBtn = document.getElementById('delete-account');
    const deleteDataBtn = document.getElementById('delete-data');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const confirmDeleteDataBtn = document.getElementById('confirm-delete-data');
    const confirmDeleteAccountBtn = document.getElementById('confirm-delete-account');

    const changePhotoBtn = document.getElementById('change-photo');
    const changePhotoInput = document.getElementById('change-photo-input');
    const profilePhoto = document.getElementById('profile-photo');

    // Load profile data from localStorage
    function loadProfileData() {
        document.getElementById('display-full-name').textContent = localStorage.getItem('fullName');
        document.getElementById('display-username').textContent = localStorage.getItem('username');
        document.getElementById('display-email').textContent = localStorage.getItem('email');
        document.getElementById('display-cpf').textContent = localStorage.getItem('cpf');
        document.getElementById('display-phone').textContent = localStorage.getItem('phone');
        document.getElementById('display-birthdate').textContent = localStorage.getItem('birthdate');
        document.getElementById('display-address').textContent = localStorage.getItem('address');

        document.getElementById('profile-full-name').value = localStorage.getItem('fullName');
        document.getElementById('profile-username').value = localStorage.getItem('username');
        document.getElementById('profile-email').value = localStorage.getItem('email');
        document.getElementById('profile-cpf').value = localStorage.getItem('cpf');
        document.getElementById('profile-phone').value = localStorage.getItem('phone');
        document.getElementById('profile-birthdate').value = localStorage.getItem('birthdate');
        document.getElementById('profile-address').value = localStorage.getItem('address');
    }

    editProfileBtn.addEventListener('click', () => {
        profileInfo.style.display = 'none';
        profileForm.style.display = 'block';
    });

    cancelEditBtn.addEventListener('click', () => {
        profileForm.style.display = 'none';
        profileInfo.style.display = 'block';
    });

    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('fullName', document.getElementById('profile-full-name').value);
        localStorage.setItem('username', document.getElementById('profile-username').value);
        localStorage.setItem('email', document.getElementById('profile-email').value);
        localStorage.setItem('cpf', document.getElementById('profile-cpf').value);
        localStorage.setItem('phone', document.getElementById('profile-phone').value);
        localStorage.setItem('birthdate', document.getElementById('profile-birthdate').value);
        localStorage.setItem('address', document.getElementById('profile-address').value);
        loadProfileData();
        profileForm.style.display = 'none';
        profileInfo.style.display = 'block';
    });

    deleteDataBtn.addEventListener('click', () => {
        $('#deleteDataModal').modal('show');
    });

    deleteAccountBtn.addEventListener('click', () => {
        $('#deleteAccountModal').modal('show');
    });

    confirmDeleteDataBtn.addEventListener('click', () => {
        localStorage.removeItem('cpf');
        localStorage.removeItem('phone');
        localStorage.removeItem('birthdate');
        localStorage.removeItem('address');
        loadProfileData();
        $('#deleteDataModal').modal('hide');
        alert('Dados apagados com sucesso!');
    });

    confirmDeleteAccountBtn.addEventListener('click', () => {
        const password = document.getElementById('confirm-password').value;
        if (password === 'senha_correta') { // Replace with actual password check logic
            // Logic to delete the account
            localStorage.clear();
            $('#deleteAccountModal').modal('hide');
            alert('Conta apagada com sucesso!');
            window.location.href = '/codigo/index.html';
        } else {
            alert('Senha incorreta. Tente novamente.');
        }
    });

    document.getElementById('investor-quiz-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const profile = document.getElementById('question1').value;
        const objective = document.getElementById('question2').value;
        const horizon = document.getElementById('question3').value;
        const reaction = document.getElementById('question4').value;
        const incomeProportion = document.getElementById('question5').value;
        const otherIncome = document.getElementById('question6').value;
        const knowledge = document.getElementById('question7').value;
        const marketFrequency = document.getElementById('question8').value;
        const riskWillingness = document.getElementById('question9').value;
        const age = document.getElementById('question10').value;

        let investorProfile = 'Conservador';

        if (profile === 'advanced' && objective === 'growth' && horizon === 'long' && reaction === 'buy' && incomeProportion === 'large' && otherIncome === 'yes' && knowledge === 'advanced' && marketFrequency === 'regularly' && riskWillingness === 'yes' && age !== 'below_25') {
            investorProfile = 'Agressivo';
        } else if (profile !== 'beginner' && objective !== 'preservation' && horizon !== 'short' && reaction !== 'panic' && incomeProportion !== 'small' && knowledge !== 'none' && riskWillingness !== 'no') {
            investorProfile = 'Moderado';
        }

        document.getElementById('investor-profile').textContent = investorProfile;
        document.getElementById('quiz-result').style.display = 'block';
    });

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tab-button.active').classList.remove('active');
            document.querySelector('.tab-content.active').classList.remove('active');
            tab.classList.add('active');
            document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
        });
    });

    changePhotoBtn.addEventListener('click', () => {
        changePhotoInput.click();
    });

    changePhotoInput.addEventListener('change', (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            profilePhoto.src = reader.result;
            localStorage.setItem('profilePhoto', reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    function loadProfilePhoto() {
        const storedPhoto = localStorage.getItem('profilePhoto');
        if (storedPhoto) {
            profilePhoto.src = storedPhoto;
        }
    }

    loadProfileData();
    loadProfilePhoto();
});
