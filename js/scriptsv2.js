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
    let pokemonRepositoryList = pokemonRepository.getAll();

    function showDetails(pokemon) {
        return console.log(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonUL = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');      
        let pokemonButton = document.createElement('button');

        //adding text and a class to the new button
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('pokemon-button');
        
        //adding the pokemon button to the list item, and the list item to the pokemon unordered list
        listItem.appendChild(pokemonButton);
        pokemonUL.appendChild(listItem);

        //adding event listener to print pokemon name in console
        pokemonButton.addEventListener('click', function() {showDetails(pokemon)});
    }

    

    return pokemonRepositoryList.forEach(function(pokemon) { 
        addListItem(pokemon);
        
    });

})();
