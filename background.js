// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('Background service loaded')
   });
   
   
   
   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
       console.log('>>> tabId:', tabId);
       console.log('>>> tab:', tab);
       console.log('>>> changeInfo:', changeInfo);
   });