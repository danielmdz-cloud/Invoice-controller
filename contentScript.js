// Selector del estado de la nota (basado en el title "Estado del siniestro: PTE VISITA")
const targetNode = document.querySelector('span[title^="Estado del siniestro:"]');
// Selector para obtener el número de la nota
const noteNumberSelector = 'span[title="Número de iTramit"]'; 

// Configuración para observar cambios en el estado de la nota
const config = { attributes: true, childList: true, subtree: true };

const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        // Monitorear si el estado ha cambiado a 'CERRADO'
        if (mutation.type === 'childList' && mutation.target.innerText === 'CERRADO') {
            // Obtener el número de la nota desde el DOM
            const noteNumber = document.querySelector(noteNumberSelector).innerText;
            
            // Número de teléfono (en formato internacional sin '+')
            const phoneNumber = '675837275'; // Reemplazar con tu número de teléfono
            
            // Mensaje predefinido que incluye el número de la nota
            const message = encodeURIComponent(`La nota con número "${noteNumber}" ha cambiado de estado a CERRADO.`);
            
            // URL de WhatsApp Web con el mensaje
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            // Abrir WhatsApp Web en una nueva pestaña
            window.open(whatsappUrl, '_blank');
        }
    }
};

// Iniciar el observador
const observer = new MutationObserver(callback);
if (targetNode) {
    observer.observe(targetNode, config);
}
