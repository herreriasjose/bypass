// background.js
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const ver = 1;
    console.log('>>> ver:', ver);
    console.log('>>> tabId:', tabId);
    console.log('>>> tab:', tab);
    console.log('>>> changeInfo:', changeInfo);

});


