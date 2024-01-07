document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
  
    chrome.storage.sync.get(['enabled'], function(result) {
      toggleSwitch.checked = result.enabled !== false;
    });
  
    toggleSwitch.addEventListener('change', function() {
      chrome.storage.sync.set({ enabled: toggleSwitch.checked });
      
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleExtension', enabled: toggleSwitch.checked });
      });
    });
  });