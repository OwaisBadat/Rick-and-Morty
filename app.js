const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
const apiURL = 'https://rickandmortyapi.com/api/character';


const loadCharacters = async () => {
    try {
        const res = await fetch(apiURL);
        rmCharacters = await res.json();
        displayCharacters(rmCharacters.results);
    } catch (err) {
        console.error(err);
    }
};

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = rmCharacters.results.filter((character) => {
        return (
            // character.name.toLowerCase() === searchString;
            character.name.toLowerCase().includes(searchString)
        );
    });
    console.log(filteredCharacters);
    displayCharacters(filteredCharacters);
});

const deleteCard = (parentNode) => {
    console.log("Delete Card Function")
    console.log(parentNode)
    $(parentNode).fadeOut(300);
}

const displayCharacters = (rmCharacters) => {
    console.log(rmCharacters)
    const htmlString = rmCharacters
        .map((character) => {
            return `
            <li class="character">
                <img src="${character.image}"></img>
                <h3>${character.name}</h3>
                <button onClick=deleteCard(this.parentNode)>Delete</button>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
