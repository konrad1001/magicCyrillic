chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Received message from background script:', request);
    if (request.action === 'toggleExtension') {
      // Handle the toggle action in the content script
      console.log('Received toggle message in content script');
      if (request.enabled) {
        replaceTextNodes(document.body, false);
        // Initialize the MutationObserver
        initializeObserver();
      } else {
        replaceTextNodes(document.body, true)
        // Disconnect the MutationObserver
        disconnectObserver();
      }
      // Perform necessary actions based on the toggle
    }
  });

/**
 * Replace random sample of text on the page with cyrillic characters.
 */
/**
 * Observe the document for changes, and replace text nodes in any added nodes.
 */

let observer;

function initializeObserver() {
  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Handle added or removed nodes
        mutation.addedNodes.forEach((node) => {
            replaceTextNodes(node);
          });
      }
    });
  });

  // Initial observation on the entire document body
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Function to disconnect the MutationObserver
function disconnectObserver() {
  if (observer) {
    observer.disconnect();
    console.log('MutationObserver disconnected.');
  }
}

function replaceText(text) {
    const replacements = {
        a: 'а',   b: 'б',   c: 'ц',   d: 'д',   e: 'э',
        f: 'ф',   g: 'г',   i: 'и',
        k: 'к',   l: 'л',   m: 'м',   n: 'н',   o: 'о',
        p: 'п',   r: 'р',   s: 'с',   t: 'т',
        v: 'в',   x: 'х',   y: 'й',
        z: 'з'
    };
  
    return text.replace(/[a-zA-Z]/g, (match) => {
      const lowercaseMatch = match.toLowerCase();
      if(Math.random() < 0.1) {
        return replacements[lowercaseMatch] || match;
      } else {
        return match;
      }
    });
}
function reverseReplaceText(text) {
  const reverseReplacements = {
      'а': 'a',   'б': 'b',   'ц': 'c',   'д': 'd',   'э': 'e',
      'ф': 'f',   'г': 'g',   'и': 'i',
      'к': 'k',   'л': 'l',   'м': 'm',   'н': 'n',   'о': 'o',
      'п': 'p',   'р': 'r',   'с': 's',   'т': 't',
      'в': 'v',   'х': 'x',   'й': 'y',
      'з': 'z'
  };

  return text.replace(/[а-яА-Я]/g, (match) => {
    const lowercaseMatch = match.toLowerCase();
    return reverseReplacements[lowercaseMatch] || match;
  });
}

/**
 * Recursively replace text nodes in the given node.
 * Recurse on nodes, until we reach a text node.
 */
function replaceTextNodes(node, reverse) {
    if(node.nodeType === Node.TEXT_NODE) {
        node.textContent = reverse ? reverseReplaceText(node.textContent) : replaceText(node.textContent);
        
    } else {
        for(const childNode of node.childNodes) {
            replaceTextNodes(childNode, reverse);
        }
    }
}

//replaceTextNodes(document.body);








