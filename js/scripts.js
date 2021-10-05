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

        return itemIsObjectWithSpecifiedProperties(pokemon) ? pokemonList.push(pokemon) : console.log("Cannot add a non-object or an object without specified properties: name, height, types");
    };
    
    return {
        getAll: getAll,
        add: add
    }
})();

// Adding pokemon to the pokemon repository
pokemonRepository.add({name: 'Bulbasaur', height: 0.7, types: ['poison', 'grass']});
pokemonRepository.add({name: 'Charizard', height: 1.7, types: ['fire', 'flying']});
pokemonRepository.add({name: 'Squirtle', height: 0.5, types: ['water']});


//Displaying Pokemon on Site
(function() {
    let pokemonList = pokemonRepository.getAll();

    function getNote(height) {
        let note = '';
        if (height > 1) {
            note = 'So big!!'
        }
        return note;
    };

    return pokemonList.forEach(function(pokemon) {
            let name = pokemon.name;
            let height = pokemon.height;
            let note = getNote(height);
            
            return document.write(`<br>${name} (Height: ${height}) ${note}<br>`);
        });
})();






