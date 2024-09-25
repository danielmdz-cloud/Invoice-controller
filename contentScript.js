chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startMonitoring") {
        console.log('Received message from background script:', message);

        const waitForElement = (selector, callback) => {
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
            } else {
                setTimeout(() => waitForElement(selector, callback), 500);
            }
        };

        waitForElement('span[title^="Estado del siniestro:"]', (targetNode) => {
            console.log("Target node found:", targetNode);

            const config = { childList: true, subtree: true, characterData: true };
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.target && mutation.target.innerText) {
                        const newState = mutation.target.innerText.trim();
                        console.log("New state detected:", newState);

                        if (newState === 'CERRADO') {
                            const noteNumber = document.querySelector('span[title="Número de iTramit"]')?.innerText.trim();
                            console.log("Note number detected:", noteNumber);

                            if (noteNumber) {
                                const phoneNumber = '675837275'; 
                                const message = encodeURIComponent(`La nota con número "${noteNumber}" ha cambiado de estado a CERRADO.`);
                                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                                window.open(whatsappUrl, '_blank');
                            }
                        }
                    }
                }
            });

            observer.observe(targetNode, config);
        });
    }
});
