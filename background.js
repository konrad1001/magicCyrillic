// Message listener to handle toggleExtension action
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleExtension') {
    console.log('Received message to toggle extension. Enabled:', request.enabled);

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // Check if there is at least one tab and if it has an 'id' property
      console.log("balls");
    console.log(tabs[0]);
    console.log(request);
      if (tabs && tabs.length > 0 && tabs[0].id) {
        const activeTabId = tabs[0].id;
        
        chrome.tabs.sendMessage(activeTabId, request);
      } else {
        console.error('Unable to find an active tab or missing tab ID.');
      }
    });
  }
});
