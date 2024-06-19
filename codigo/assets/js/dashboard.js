document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');

    // Expand and collapse sidebar on hover
    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });

    // Check for login information in localStorage
    const loggedIn = localStorage.getItem('loggedIn');
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedIn || !loggedInUser) {
        window.location.href = '/codigo/pages/login_page.html'; // Redirect to login if not logged in
    } else {
        document.getElementById('username').textContent = loggedInUser;
    }

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInUser');
        window.location.href = '/codigo/pages/login_page.html'; // Redirect to login after logout
    });
});
