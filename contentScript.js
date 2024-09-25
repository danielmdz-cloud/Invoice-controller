const targetNode = document.querySelector('span[title^="Estado del siniestro"]');

const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const estado = targetNode.innerText.trim();
            const numNota = document.querySelector('span[title="Número de iTramit"]').textContent.trim().replace(/[^0-9]/g, '').trim();

            if (estado === "CERRADO") {
                const mensaje = `La nota ${numNota} ha cambiado a estado CERRADO.`;
		sendWhatsAppMessage(mensaje);
            }
        }
    }
});

observer.observe(targetNode, { childList: true, subtree: true });

function sendWhatsAppMessage(message) {  
	phoneNumber = '34123123123';  //edit with your phone number  
	const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    	window.open(url, '_blank');
}