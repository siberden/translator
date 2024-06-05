// script.js
async function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const translationDirection = document.getElementById('translationDirection').value;
    const outputTextElement = document.getElementById('outputText');

    let sourceLang, targetLang;

    if (translationDirection === 'kb-en') {
        sourceLang = 'kb';
        targetLang = 'en';
    } else {
        sourceLang = 'en';
        targetLang = 'kb';
    }

    try {
        const response = await fetch('https://libretranslate.de/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: inputText,
                source: sourceLang,
                target: targetLang,
                format: 'text'
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Translation API error');
        }

        const data = await response.json();
        outputTextElement.textContent = data.translatedText;
    } catch (error) {
        outputTextElement.textContent = 'Error: ' + error.message;
    }
}
