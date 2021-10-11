let pokemonRepository = (function() {
    let pokemonList = []; //this is an array of normal objects
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Functions for loading API
    function loadList() {
        return fetch(apiUrl).then(function(response) {return response.json()}).then(function(json) {
            
            json.results.forEach(function(item) { //results is a property in the json object that holds the name and url
                let pokemon = { //turns json object into real object
                    name: item.name,
                    detailsUrl: item.url
                }

                add(pokemon); //pokemon here is a real object
                
            }); //this is returning a promise, but of undefined since there is no return value. can be used later
           
        }).catch (e => console.error(e))
    }
        //this function below must be called inside of a pokemonRepository.getAll().forEach() loop
    function loadDetails(item) { //loading details for each pokemon in pokemonList array --> 
        let url = item.detailsUrl; // there's an item parameter since need to get the details url from each pokemon
        return fetch(url).then(response=> response.json()).then(function(json) {
            item.imageUrl = json.sprites.front_default; //adding new properties imageUrl, height, types to each item                                                   
            item.height = json.height; 
            item.types = json.types;
        }).catch (e => console.error(e)) //RETURNS A PROMISE!!
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
        loadDetails: loadDetails
    }
})();


//Displaying Pokemon on Site
(function() {


    function showDetails(pokemon) { 
        pokemonRepository.loadDetails(pokemon).then(function() {
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

    //loadList() loads initial api and fills pokemonList in repository with pokemon objects including name and details url
    //loadDetails() loads details url, and then fills the pokemon objects with height, imageUrl, and types
    //showDetails() calls loadDetails() and displays the properties in the console

    pokemonRepository.loadList().then(function() { //no parameter here since .loadList() doesn't have a return value
        //console.log(pokemonRepository.getAll()) if want to print entire list, need to do this after calling loadList()
        pokemonRepository.getAll().forEach(function(pokemon) {
            addListItem(pokemon);           
        })
    })   
})();



//Qs: why can I not just print pokemonRepository.getAll() without first calling .loadList()?
