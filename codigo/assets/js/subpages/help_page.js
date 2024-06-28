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

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const formData = {
            name,
            email,
            message,
        };

        // Store form data in Local Storage (mock sending)
        localStorage.setItem('contactFormData', JSON.stringify(formData));
        alert('Mensagem enviada com sucesso!');

        // Clear form fields
        contactForm.reset();
    });
});
