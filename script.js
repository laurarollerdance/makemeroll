document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Móvil ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                navToggle.setAttribute('aria-label', 'Cerrar menú');
            } else {
                navToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.setAttribute('aria-label', 'Abrir menú');
                }
            });
        });
    }

    // --- FAQ Acordeón Simple ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('dt');
        const answer = item.querySelector('dd');

        if (question && answer) {
             answer.style.display = 'none';
             item.classList.remove('active'); 

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('dd').style.display = 'none';
                    }
                });

                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block'; 
                } else {
                     item.classList.remove('active');
                     answer.style.display = 'none'; 
                }
            });
        }
    });

    // --- Inicialización del Carrusel de Comunidad ---
    if (document.querySelector('.comunidad-carousel')) {
        const comunidadSwiper = new Swiper('.comunidad-carousel', {
            loop: true, 
            autoplay: {
                delay: 3000, 
                disableOnInteraction: false, 
                pauseOnMouseEnter: true,    
            },
            navigation: {
                nextEl: '.comunidad-carousel .swiper-button-next', 
                prevEl: '.comunidad-carousel .swiper-button-prev',
            },
            keyboard: true, 
        });
    }

    // --- INICIALIZACIÓN DEL CARRUSEL DE SHOWS ---
    if (document.querySelector('.shows-carousel')) { 
        const showsSwiper = new Swiper('.shows-carousel', {
            loop: true,
            autoplay: {
                delay: 3500, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.shows-carousel .swiper-button-next', 
                prevEl: '.shows-carousel .swiper-button-prev', 
            },
            effect: 'fade', 
            keyboard: true,
        });
    }

    // --- INICIALIZACIÓN DEL CARRUSEL DEL RETIRO ---
    if (document.querySelector('.retiro-carousel')) { 
        const retiroSwiper = new Swiper('.retiro-carousel', {
            loop: true, 
            autoplay: {
                delay: 4500, 
                disableOnInteraction: true, 
            },
            navigation: {
                nextEl: '.retiro-carousel .swiper-button-next.retiro-next', 
                prevEl: '.retiro-carousel .swiper-button-prev.retiro-prev', 
            },
            pagination: { 
              el: '.retiro-carousel .swiper-pagination.retiro-pagination',
              clickable: true,
            },
            effect: 'slide', 
            grabCursor: true, 
            keyboard: true,
            // Opcional:
            // slidesPerView: 1.1,
            // centeredSlides: true,
            // spaceBetween: 15,
        });
    }

    // --- MANEJO DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    // PEGA AQUÍ LA URL DE TU APLICACIÓN WEB DE GOOGLE APPS SCRIPT
    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbxtWmONrDQupQ2p2htdBka3vZtrRossCW1zuSD90lwgBvwuS6WcRf8yOo5L0W8g1jw/exec'; // <-- ¡¡¡RECUERDA REEMPLAZAR ESTO!!!

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío tradicional del formulario
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            formStatus.textContent = ''; // Limpiar mensajes anteriores
            formStatus.style.color = 'inherit';

            const formData = new FormData(this);
            
            fetch(googleScriptURL, {
                method: 'POST',
                body: formData 
            })
            .then(response => response.json()) 
            .then(data => {
                if (data.result === "success") {
                    formStatus.textContent = data.message || '¡Mensaje enviado con éxito!';
                    formStatus.style.color = 'green';
                    contactForm.reset(); 
                } else {
                    formStatus.textContent = data.message || 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
                    formStatus.style.color = 'red';
                }
            })
            .catch((error) => {
                formStatus.textContent = 'Error de conexión. Por favor, inténtalo más tarde.';
                formStatus.style.color = 'red';
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }

}); // Fin ÚNICO de DOMContentLoaded