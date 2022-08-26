// popup.js


let changeColor = document.getElementById("getUrl");
// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
 

    
    // Sending message to background
    chrome.runtime.sendMessage({name: 'sendpopup'}, function(response) {
        console.log('<<< Response received:', response);
      });

	
  // Sending message to content

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {name: "sendpopup"}, function(response) {
          console.log('<<< Response received:', response);
          if(response != null) {
            const viewer = document.getElementById('viewer');
            for(let o of response) {
                const image = o;
                console.log('>>> image:', image);
            }
          }
        });
      });

});