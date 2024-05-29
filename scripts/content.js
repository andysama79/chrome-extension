const article = document.querySelector('article');

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegExp);

    // matchAll returns an iterator, convert to array to get word count

    const wordCount = [...words].length; // varArgs?z
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement('p');

    // Use the same styling as the publish information in an article's header

    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;

    // support for API reference docs
    const position = article.querySelector('devsite-feature-tooltip');
    
    // support for article docs with date
    const date = article.querySelector('time')?.parentNode; // `?.`safely access props that might be null or undefined

    (date ?? position).insertAdjacentElement('afterend', badge);
}