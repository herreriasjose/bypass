// popup.js

const analyze = document.getElementById("analyze");
analyze.addEventListener("click", async () => {

    // Sending message to background
    chrome.runtime.sendMessage({ name: 'sendpopup' }, function (response) {
        console.log('Response received:', response);
    });


    // Sending message to content
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { name: "sendpopup" }, function (response) {
            if (response != null) {
                const viewer = document.getElementById('viewer');
                const images = response.map(image => {
                    let name = image.currentSrc.split('/');
                    name = name[name.length - 1];
                    return `<li><a href=${image.currentSrc} target="_blank">${name}</a></li>`
                });
                const listImages = `<ul>${images.join('')}</ul>`;
                const ele = document.createElement("span");
                ele.innerHTML = listImages;
                viewer.appendChild(ele);
            }
        });
    });

});