// Menú Hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cambiar Color de Fondo
const colorBtn = document.getElementById('colorBtn');
const colors = ['#f4f4f4', '#e6f7ff', '#ffe6e6', '#e6ffe6'];
let currentColor = 0;

colorBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = colors[currentColor];
    currentColor = (currentColor + 1) % colors.length;
    
});

// Fetch API (JSONPlaceholder)
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        const userData = document.getElementById('userData');
        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
            `;
            userData.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));