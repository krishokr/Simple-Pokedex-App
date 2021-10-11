let pokemonRepository = (function() {
    let pokemonList = []; //this is an array of normal objects
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Functions for loading initial API to get pokemon object with name and detailsUrl properties
    function loadList() {
        return fetch(apiUrl).then(function(response) {return response.json()}).then(function(json) {
            //results is a property in the json object that holds the name and url
            json.results.forEach(function(item) { 
                let pokemon = { //turns json object into real object
                    name: item.name,
                    detailsUrl: item.url
                }
                add(pokemon); //pokemon here is a real object               
            }); //successful fetch returns undefined promise since there's no return value
           
        }).catch (e => console.error(e))
    }
    
    //Gets pokemon api details via the detailsUrl property from each pokemon object (found initially from loadList())
    function loadDetails(item) { 
        let url = item.detailsUrl; //there's an item parameter since need to get the details url from each pokemon
        return fetch(url).then(response=> response.json()).then(function(json) {
            item.imageUrl = json.sprites.front_default;                                                
            item.height = json.height; 
            item.types = json.types;
        }).catch (e => console.error(e)) //RETURNS A PROMISE!!
    }

    //Displays pokemon object in the console using loadDetails() function above
    function showDetails(pokemon) { 
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        }).catch(e => console.error(e))
    }

    //Function that creates elements and adds pokemon to html
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
        pokemonButton.addEventListener('click', function() {return showDetails(pokemon)});
    }

    //Helper functions for item inspection
    function checkItemType(item) {
        //checks to see if item is an object
        return (typeof item === 'object') ? item : false;
    }

    //Helper Functions for Methods
    function getAll() { return pokemonList};
    
    function add(pokemon) {
        return checkItemType(pokemon) ? (pokemonList.push(pokemon)) : console.log("Cannot add a non-object or an object without specified properties: name, height, types");
    };
    
    return {
        getAll: getAll,
        add: add,
        loadList: loadList,
        addListItem: addListItem
    }
})();


//Displaying Pokemon on Site
pokemonRepository.loadList().then(function() { //no parameter here since .loadList() doesn't have a return value
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);           
    })
})   

//Notes:
    //loadList() loads initial api and fills pokemonList in repository with pokemon objects including name and details url
    //loadDetails() loads details url, and then fills the pokemon objects with height, imageUrl, and types
    //showDetails() calls loadDetails() and displays the properties in the console