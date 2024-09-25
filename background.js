chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url && changeInfo.url.includes('show?expediente=')) {
        console.log('URL monitoreada:', changeInfo.url);
        chrome.tabs.sendMessage(tabId, { action: "startMonitoring", url: changeInfo.url });
        console.log('Message sent to content script');
    }
});
