/**
 * MAIN SCRIPT - Landing Page SPA
 * 
 * Este script incluye:
 * - Scroll suave
 * - Animaciones con Intersection Observer
 * - Validación de formulario en tiempo real
 * - Funcionalidad de modal
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // SMOOTH SCROLL
    // ======================
    // Implementación manual de scroll suave sin librerías
    // usando data-attributes para identificar los elementos
    
    document.querySelectorAll('[data-smooth-scroll]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,//* esto devuelve el numero de pixeles a que se encuentra el elemento 
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // INTERSECTION OBSERVER
    // ======================
    // Para animaciones al hacer scroll
    
    // Configuración del Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Callback para el Observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animate');
                
                // Aplicar clase de animación según el data-attribute
                switch(animationType) {
                    case 'fade-up':
                        element.classList.add('animate-fade-up');
                        break;
                    case 'fade-in':
                        element.classList.add('animate-fade-in');
                        break;
                }
                
                // Dejar de observar el elemento una vez animado
                observer.unobserve(element);
            }
        });
    };
    
    // Crear el Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observar todos los elementos con data-animate
    document.querySelectorAll('[data-animate]').forEach(element => {
        observer.observe(element);
    });

    // ======================
    // FORM VALIDATION
    // ======================
    // Validación en tiempo real usando data-attributes
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Validar en tiempo real (evento input)
        contactForm.querySelectorAll('[data-validate]').forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
        
        // Validar al enviar el formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            this.querySelectorAll('[data-validate]').forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Aquí iría la lógica para enviar el formulario
                alert('Formulario enviado correctamente!');
                this.reset();
            }
        });
    }
    
    // Función de validación
    function validateField(field) {
        const errorElement = document.getElementById(field.getAttribute('data-error'));
        const value = field.value.trim();
        let isValid = true;
        
        // Resetear mensaje de error
        errorElement.style.display = 'none';
        field.style.borderColor = '#ddd';
        
        // Validar según el tipo especificado en data-validate
        switch(field.getAttribute('data-validate')) {
            case 'text':
                if (value === '') {
                    showError(field, errorElement, 'Este campo es requerido');
                    isValid = false;
                }
                break;
                
            case 'email':
                if (value === '') {
                    showError(field, errorElement, 'Este campo es requerido');
                    isValid = false;
                } else if (!isValidEmail(value)) {
                    showError(field, errorElement, 'Ingresa un email válido');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    }
    
    // Mostrar error
    function showError(field, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#e53e3e';
    }
    
    // Validar email con regex
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ======================
    // MODAL FUNCTIONALITY
    // ======================
    // Control de modales usando data-attributes
    
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-trigger');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Cerrar modal haciendo click fuera del contenido
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});