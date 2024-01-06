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
