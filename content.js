



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            ">>> message received in content:" + JSON.stringify(request) + " from the script:" + sender.tab.url :
            ">>> message received in content:" + JSON.stringify(request) + " from the extension");

        const images = document.getElementsByTagName('img');
        const imagesFiltered = [...images].map((image) => { return { currentSrc: image.currentSrc, height: image.naturalHeight, with: image.naturalWidth } });


        console.log('>>> images found:', imagesFiltered);

        sendResponse(imagesFiltered);
    }
);