let input = document.querySelector('input');
let searchBtn = document.getElementById('searchBtn');
let section = document.querySelector('section');

searchBtn.addEventListener('click', laMagie);
    function laMagie(e) {
        e.preventDefault();
        section.innerHTML = '';
        let saisie = input.value;
        console.log(saisie);

        let url = `https://fr.wikipedia.org/w/api.php?action=query&list=search&prop=extracts&inprop=url&utf8=&format=json&origin=*&srlimit=18&srsearch=${saisie}`;
        console.log(url);
        let resultatMagie;
        
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`)
                }
                return response.json();
            })
            .then((resultats) => {
                resultatMagie = resultats.query;
                console.log(resultatMagie);
                afficherMagie();
            })
            .catch((error) => alert(`la magie n'a pas fonctionnée ! ${error}`))
        
        function afficherMagie() {
            for(let i = 0; i < 18; i++) {
                let lienVoirPlus = `https://fr.wikipedia.org/wiki/${resultatMagie.search[i].title}`
                section.innerHTML += `
                <div class="divResultats">
                    <div id="sousDivHaut">
                        <h1>${resultatMagie.search[i].title}</h1>
                        <p>${resultatMagie.search[i].snippet}</p>
                    </div>
                    <div id="sousDivBas">
                        <button type="button" id="voirPlus"><a href="${lienVoirPlus}" target="_blank">LIRE PLUS</a></button>
                    </div>
                </div>
                `;
            }
        }
    }