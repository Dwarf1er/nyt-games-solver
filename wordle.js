import { setDefaultDate } from './setDefaultDate.js';

function fetchWordleAnswers(date) {
    const wordleUrl = `https://corsproxy.io/?https://www.nytimes.com/svc/wordle/v2/${date}.json`;
    fetchAnswers(wordleUrl, 'wordleAnswers');
}

function fetchAnswers(url, targetId) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const answersContainer = document.getElementById(targetId);
        answersContainer.innerHTML = '';

        if (targetId === 'wordleAnswers') {
            const wordleAnswer = data.solution.toUpperCase();
            const wordleLetters = wordleAnswer.split('');
            const wordleContainer = document.createElement('div');
            wordleContainer.classList.add('wordle-container');
            wordleLetters.forEach(letter => {
                const card = document.createElement('div');
                card.classList.add('card', 'mx-1');
                card.style.width = '3rem';
                card.style.height = '3rem';
                card.style.textAlign = 'center';
                card.style.fontSize = '1.5rem';
                card.style.lineHeight = '3rem';
                card.textContent = letter;
                wordleContainer.appendChild(card);
            });
            answersContainer.appendChild(wordleContainer);
        }
    })
    .catch(error => console.error('Error fetching answers:', error));
}

window.onload = function() {
    const defaultDate = setDefaultDate();
    fetchWordleAnswers(defaultDate);
};

export { fetchWordleAnswers };
