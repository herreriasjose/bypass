// content.js


chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {

        let response = null;

        console.log(sender.tab ?
            ">>> Message received in content:" + JSON.stringify(message) + " from the script:" + sender.tab.url :
            ">>> Message received in content:" + JSON.stringify(message) + " from the extension");

        if (message != null) {
            if (message.command === 'getimages') {
                const images = document.getElementsByTagName('img');
                const imagesFiltered = [...images].map((image) => { return { currentSrc: image.currentSrc, height: image.naturalHeight, with: image.naturalWidth } });
                console.log('>>> images found:', imagesFiltered);
                sendResponse(imagesFiltered);
            }
            if (message.command === 'sendResponse') {
                response = 'Hi there';
                sendResponse(response);
            }
        }
    }
);