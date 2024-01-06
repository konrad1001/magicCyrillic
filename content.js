/**
 * Replace random sample of text on the page with cyrillic characters.
 */

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

/**
 * Recursively replace text nodes in the given node.
 * Recurse on nodes, until we reach a text node.
 */
function replaceTextNodes(node) {
    if(node.nodeType === Node.TEXT_NODE) {
        node.textContent = replaceText(node.textContent);
    } else {
        for(const childNode of node.childNodes) {
            replaceTextNodes(childNode);
        }
    }
}

/**
 * Observe the document for changes, and replace text nodes in any added nodes.
 */
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        //Handle added or removed nodes
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                replaceTextNodes(node);
            });
        }
    }
    )
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});



