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

