document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const tel = localStorage.getItem('tel');
    var today = new Date();
            var day = String(today.getDate()).padStart(2, '0');
            var month = String(today.getMonth() + 1).padStart(2, '0');
            var year = today.getFullYear();
            var formattedDate = day + '/' + month + '/' + year;
            document.getElementById('creation-date').textContent = formattedDate;

    if (username) {
        document.getElementById('user-name').textContent = username;
        document.getElementById('user-full-name').textContent = username;
    }

    if (email) {
        document.getElementById('user-email').textContent = email;
    }

    if (tel) {
        document.getElementById('tel').textContent = tel;
    }

    
    function makeEditable(event) {
        event.preventDefault();
        const editTargetId = event.target.getAttribute('data-edit');
        const targetElement = document.getElementById(editTargetId);

        
        if (targetElement.tagName === 'INPUT') {
            return;
        }

        const currentValue = targetElement.textContent;
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = currentValue;

        targetElement.replaceWith(inputElement);
        inputElement.focus();


        function saveChanges() {
            const newValue = inputElement.value;
            targetElement.textContent = newValue;

            
            if (editTargetId === 'user-full-name') {
                localStorage.setItem('username', newValue);
            } else if (editTargetId === 'user-email') {
                localStorage.setItem('email', newValue);
            }

            inputElement.replaceWith(targetElement);
        }

        
        inputElement.addEventListener('blur', saveChanges);
        inputElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveChanges();
            }
        });
    }

    
    document.querySelectorAll('.edit-link').forEach(function(link) {
        link.addEventListener('click', makeEditable);
    });
});
