// popup.js


const getimages = document.getElementById("getimages");
const getCommand = document.getElementById("getcommand");


getCommand.addEventListener("change", async (a, b) => {
    const value =  getCommand.value;
    switch (value) {
        case 'getimages':
            sendMessageToContent("getimages");
            return;
        case 'getscreenshot':
            alert("Not available yet");
            return;
        default:
            return;
    }


});


function sendMessageToBackground(command, parameters = null) {
    // Sending message to background
    // chrome.runtime.sendMessage({ message: 'getimages' }, function (response) {
    //     console.log('Response received:', response);
    // });

}


function handleResponse(response) {
    const display = document.getElementById('display');
    const images = response.map(image => {
        let name = image.currentSrc.split('/');
        name = name[name.length - 1];
        const height = image.height;
        const width = image.with;
        allImagesList.push(image.currentSrc);
        return `<li><a href=${image.currentSrc} target="_blank">${name} (${height} x ${width})}</a></li>`
    });
    const listImages = `<ul>${images.join('')}</ul>`;
    const ele = document.createElement("span");
    ele.innerHTML = listImages;
    display.appendChild(ele);
    const allImagesButton = document.createElement('button');
    allImagesButton.classList.add('form-control');
    allImagesButton.classList.add('m-2');
    allImagesButton.innerText = 'All images';
    allImagesButton.onclick = showAllImages;
    display.appendChild(allImagesButton);
}


function sendMessageToContent(command, parameters = null) {
    // Sending message to content
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command }, function (response) {
            if (response != null) {
                handleResponse(response);
            }
        });
    });

}

// Avoid popup closing after clicking anchor
document.addEventListener('click', event => {
    const a = event.target.closest('a[href]');
    if (a) {
        event.preventDefault();
        chrome.tabs.create({ url: a.href, active: false });
    }
});


// Images

const allImagesList = [];

function showAllImages() {
    if (confirm(`Are you sure you want to open ${allImagesList.length} new tabs?`)) {
        for (let image of allImagesList) {
            chrome.tabs.create({ url: image });
        }
    }
}