document.addEventListener('DOMContentLoaded', () => {
    // 1. Atualizar ano do Footer dinamicamente
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Controle do Menu Mobile
    const btnMobileMenu = document.getElementById('btn-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (btnMobileMenu && mobileMenu) {
        btnMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Fechar menu ao clicar em qualquer item
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});