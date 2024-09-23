// Selector del estado de la factura (donde se muestra si está 'abierta' o 'cerrada')
const targetNode = document.querySelector('.note-status'); 
// Selector para obtener el nombre de la factura
const noteTitleSelector = '.note-title'; // Cambia esto al selector correcto del nombre de la nota

// Configuración para observar cambios en el estado de la factura
const config = { attributes: true, childList: true, subtree: true };

const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.target.innerText === 'Cerrado') {
            // Obtener el nombre de la factura desde el DOM
            const noteTitle = document.querySelector(noteTitleSelector).innerText;
            
            // Número de teléfono (en formato internacional sin '+')
            const phoneNumber = '675837275'; // Reemplazar con tu número de teléfono
            
            // Mensaje predefinido que incluye el nombre de la nota
            const message = encodeURIComponent(`La nota "${noteTitle}" ha cambiado de estado a cerrado.`);
            
            // URL de WhatsApp Web con el mensaje
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Abrir WhatsApp Web en una nueva pestaña
            window.open(whatsappUrl, '_blank');
        }
    }
};

// Iniciar el observador
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
