// content.ts

import {nanoid} from 'nanoid';


chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {

        const command = message.command;
        let response = null;
        
        console.log(sender.tab ?
            ">>> Message received in content:" + JSON.stringify(message) + " from the script:" + sender.tab.url :
            ">>> Message received in content:" + JSON.stringify(message) + " from the extension");

        if (command != null) {
            if (command === 'getimages') {
                const images = document.getElementsByTagName('img');
                const imagesFiltered = [...images].map((image) => { return { currentSrc: image.currentSrc, height: image.naturalHeight, with: image.naturalWidth } });
                response = { command, data: imagesFiltered };
                sendResponse(response);
            }
            if (command === 'getnanoid') {
                const id: string = nanoid();
                console.log('>>> id:', id);
                response = { command, data: id }
                sendResponse(response);
            }
        }
    }
);