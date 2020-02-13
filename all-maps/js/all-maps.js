fetch('https://api.topomaps.app/maps')
    .then(response => {
        return response.json()
    })
    .then(data => {
        let countries = Object.create(null);

        data.forEach(element => {
            if (!element.requiresLogin) {
                if (countries[element.country] == null) {
                    countries[element.country] = [element];
                } else {
                    countries[element.country].push(element);
                }
            }
        });

        var cardsContainer = document.getElementById('cards');

        Object.keys(countries).forEach(function(country, index) {
            let card = document.createElement('div');
            card.className = 'card mb-3';

            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            let countryTitle = document.createElement('h3');
            countryTitle.className = 'card-title';
            countryTitle.textContent = getCountryName(country);
            cardBody.appendChild(countryTitle);

            let itemsList = document.createElement('ul');

            countries[country].forEach(element => {
                let itemElement = document.createElement('li');
                itemElement.className = 'country-item';
                itemElement.textContent = formattedName(element.type) + ' (' + element.copyright + ')';

                let tryElement = document.createElement('a');
                tryElement.href = 'map/?id=' + element.id;
                tryElement.textContent = 'Try it Out!';

                itemElement.appendChild(tryElement);

                itemsList.appendChild(itemElement);
            });

            cardBody.appendChild(itemsList);

            card.appendChild(cardBody);

            cardsContainer.appendChild(card);
        })
    })
    .catch(err => {
        alert(err);
    })

function formattedName(mapType) {
    switch (mapType) {
        case 'topo':
            return "Topo";
        case 'imagery':
            return "Imagery";
        case 'nautical':
            return "Nautical Charts";
        case 'imagery_topo':
            return "Imagery + Topo";
        default:
            return mapType;
    }
}