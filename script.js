// Efeito de scroll suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação ao rolar a página (opcional)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});
const video = document.getElementById("videoProjeto1");
let playCount = 0;

video.addEventListener("ended", function () {
    playCount++;
    if (playCount < 4) {
        video.play(); // Reproduz novamente até atingir 4 repetições
    }
});
// Menu Hamburguer
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});
//jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj

//dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

// Sistema de autenticação do painel administrativo
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há um parâmetro de admin na URL
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    
    // Se houver o parâmetro, mostra o prompt de senha
    if (adminParam === 'true') {
        checkAdmin();
    }
});

function checkAdmin() {
    const password = prompt("Digite a senha de administrador:");
    // Substitua 'senhaSegura123' por uma senha forte em produção
    if (password === 'senhaSegura123') {
        document.getElementById('admin-dashboard').style.display = 'block';
        loadVisitorData();
        
        // Adiciona a classe admin-logged ao body para estilização específica
        document.body.classList.add('admin-logged');
    } else if (password !== null) {
        alert("Senha incorreta!");
    }
}

// Simulação de dados de visitantes
function loadVisitorData() {
    // Obter dados do localStorage ou inicializar
    let visitors = JSON.parse(localStorage.getItem('portfolioVisitors')) || [];
    
    // Atualizar estatísticas
    document.getElementById('total-visitors').textContent = visitors.length;
    
    const today = new Date().toDateString();
    const todayVisitors = visitors.filter(v => new Date(v.timestamp).toDateString() === today);
    document.getElementById('today-visitors').textContent = todayVisitors.length;
    
    const uniqueIPs = [...new Set(visitors.map(v => v.ip))];
    document.getElementById('unique-visitors').textContent = uniqueIPs.length;
    
    // Preencher tabela (últimos 10 visitantes)
    const lastVisitors = visitors.slice(-10).reverse();
    const tableBody = document.getElementById('visitors-list');
    tableBody.innerHTML = '';
    
    lastVisitors.forEach(visitor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(visitor.timestamp).toLocaleString()}</td>
            <td>${visitor.ip}</td>
            <td>${visitor.location || 'Desconhecido'}</td>
            <td>${visitor.pagesVisited || 'Home'}</td>
            <td>${visitor.device || 'Desktop'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function trackVisitor() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const visitorData = {
                timestamp: new Date().toISOString(),
                ip: data.ip,
                location: `${data.city}, ${data.country_name}`,
                pagesVisited: window.location.pathname,
                device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
            };

            console.log(visitorData);

            // Aqui você pode enviar os dados para o servidor via fetch/AJAX
            // fetch('/registrar-visita', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(visitorData)
            // });
        })
        .catch(error => {
            console.error('Erro ao obter IP e localização:', error);
        });
}

trackVisitor();
    
    // Armazenar no localStorage (em produção, envie para um backend)
    let visitors = JSON.parse(localStorage.getItem('portfolioVisitors')) || [];
    visitors.push(visitorData);
    localStorage.setItem('portfolioVisitors', JSON.stringify(visitors));


// Chamar a função de rastreamento quando a página carregar
window.addEventListener('load', trackVisitor);

// Atalho de teclado para acessar o painel (Ctrl+Alt+A)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.key === 'a') {
        checkAdmin();
    }
});
