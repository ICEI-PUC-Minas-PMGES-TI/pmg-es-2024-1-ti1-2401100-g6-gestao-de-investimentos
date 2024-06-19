document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');

    sidebar.addEventListener('mouseover', () => {
        sidebar.style.width = '250px';
    });

    sidebar.addEventListener('mouseout', () => {
        sidebar.style.width = '60px';
    });
});
