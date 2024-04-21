function fetchConnectionsAnswers(date) {
    const connectionsUrl = `https://corsproxy.io/?https://www.nytimes.com/svc/connections/v2/${date}.json`;
    fetchAnswers(connectionsUrl, 'connectionsAnswers');
}

function getBackgroundColor(index) {
    switch (index) {
        case 1:
            return 'rgb(249,223,109)';
        case 2:
            return 'rgb(160,195,90)';
        case 3:
            return 'rgb(176,196,239)';
        case 4:
            return 'rgb(186,129,197)';
        default:
            return '#fff';
    }
}

function fetchAnswers(url, targetId) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const answersContainer = document.getElementById(targetId);
        answersContainer.innerHTML = '';

        if (targetId === 'connectionsAnswers') {
            data.categories.forEach((category, index) => {
                const categoryContainer = document.createElement('div');
                categoryContainer.classList.add('category-container');

                const categoryTitle = document.createElement('h4');
                categoryTitle.classList.add('category-title');
                categoryTitle.textContent = category.title;
                categoryContainer.appendChild(categoryTitle);

                const cardsList = document.createElement('ul');
                cardsList.classList.add('list-group', 'list-group-flush');
                category.cards.forEach(card => {
                    const cardItem = document.createElement('li');
                    cardItem.classList.add('list-group-item');
                    cardItem.style.backgroundColor = getBackgroundColor(index + 1);
                    cardItem.textContent = card.content;
                    cardsList.appendChild(cardItem);
                });
                categoryContainer.appendChild(cardsList);

                answersContainer.appendChild(categoryContainer);
            });
        }
    })
    .catch(error => console.error('Error fetching answers:', error));
}
