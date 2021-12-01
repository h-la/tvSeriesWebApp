let url = 'https://api.tvmaze.com/search/shows?q=';

const searchTvShows = async (searchText) => {
    try {
        const response = await fetch(url + searchText);              // Käynnistetään haku.
        if (!response.ok) throw new Error('something went wrong'); // Jos tapahtuu virhe, heitetään ilmoitus
        const series = await response.json();                     // muutetaan ladattu tekstimuotoinen JSON JavaScript-olioksi/taulukoksi

        // tulostetaan haun tulos konsoliin
        console.log(series);

        let ul = document.getElementById('hakutulokset');
        ul.innerHTML = '';

        series.map(s => {
            let li = document.createElement('li');
            let name = document.createElement('h2');
            name.innerText = s.show.name;
            li.appendChild(name);
            if (s.show.officialSite !== null) {
                let webSite = document.createElement('a');
                var linkText = document.createTextNode('official website');
                webSite.appendChild(linkText);
                webSite.href = s.show.officialSite;
                li.appendChild(webSite);
                let br = document.createElement('p');
                li.appendChild(br);
            }
            try {
                let image = document.createElement('img');
                image.src = s.show.image.medium;
                li.appendChild(image);
            } catch (error) {
                console.log(error);
            }
            let summary = document.createElement('p');
            summary.innerHTML = s.show.summary;
            li.appendChild(summary);

            let genres = document.createElement('p');
            genres.innerHTML = "Genres: [" + s.show.genres.join(", ") + "]";
            genres.setAttribute('class', 'biggerFont');
            li.appendChild(genres);

            ul.appendChild(li);
        });
    } catch (error) {       // Otetaan heitetty virheilmoitus kiinni
        console.log(error);
    }
}

const button = document.getElementById('hakunappi');

const activateSearch = () => {
    let searchText = document.getElementById('hakuteksti').value;
    console.log(searchText);
    if (searchText) {
        searchTvShows(searchText);
    }
}

button.addEventListener('click', activateSearch);

