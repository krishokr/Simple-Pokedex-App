let pokemonRepository = (function() {
    let pokemonList = [];

    //Helper Functions for Item Inspection
    function checkItemType(item) {
        //checks to see if item is an object
        return (typeof item === 'object') ? item : false;
    }

    function checkItemProperties(item) {
        //checks to see if item has specified properties
        return (item.name && item.height && item.types) ? item : false;
    }

    function itemIsObjectWithSpecifiedProperties(item) {
        //returns true if item is an object with specified properties
        return checkItemType(item) && checkItemProperties(item);
    }

    //Helper Functions for Methods
    function getAll() { return pokemonList};
    
    function add(pokemon) {
        //This might be too long...
        return itemIsObjectWithSpecifiedProperties(pokemon) ? pokemonList.push(pokemon) : console.log("Cannot add a non-object or an object without specified properties: name, height, types");
    };
    
    return {
        getAll: getAll,
        add: add
    }
})();

pokemonRepository.add({name: 'Bulbasaur', height: 0.7, types: ['poison', 'grass']});
pokemonRepository.add({name: 'Charizard', height: 1.7, types: ['fire', 'flying']});
pokemonRepository.add({name: 'Squirtle', height: 0.5, types: ['water']})

// Helper Functions
let pokemonList = () => pokemonRepository.getAll();

let getName = pokemon => pokemon.name;

let getHeight = pokemon => pokemon.height;

function getNote(height) {
    let note = '';
    if (height > 1) {
        note = 'So big!!'
    }
    return note;
};

function pokemonDescription(name, height, note) {
    return `<br>${name} (Height: ${height}) ${note}<br>` 
};

//Unsure if I should have this function, or if I should just include it in the .forEach()
function writePokemon(pokemon) {
    let name = getName(pokemon);
    let height = getHeight(pokemon);
    let note = getNote(height);
    let description = pokemonDescription(name, height, note);
        
    return document.write(description);
}

function displayPokemonArray (pokemonList) {
    return pokemonList.forEach(pokemon => writePokemon(pokemon));
}

//Displaying Pokemon on Site
displayPokemonArray(pokemonList());






