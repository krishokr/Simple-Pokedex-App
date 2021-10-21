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
            item.abilities = json.abilities;
            item.id = json.id;
            item.weight = json.weight;
        }).catch (e => console.error(e)) //RETURNS A PROMISE!!
    }

    //Displays pokemon object in the console using loadDetails() function above
    function showDetails(pokemon) { 
        loadDetails(pokemon).then(function() {
            //printing pokemon in console
            // console.log(pokemon);

            //using other IIFE to show the modal upon clicking pokemon
            pokemonModal.createModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl, pokemon.abilities, pokemon.id, pokemon.weight);
            
        }).catch(e => console.error(e))
    }

    function displayListItems(pokemon) {
        loadDetails(pokemon).then(function() {
            addListItem(pokemon);
        }).catch(e => console.error(e))
    }

    //Function that creates elements and adds pokemon to html
    function addListItem(pokemon) {
        let pokemonUL = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('col-12');
        listItem.classList.add('col-lg-2');
        listItem.classList.add('col-md-4');
        listItem.classList.add('d-flex');
        listItem.classList.add('justify-content-center');

        let pokemonButton = document.createElement('button');

        //adding bootstrap classes & attributes
        pokemonButton.classList.add('btn');
        pokemonButton.classList.add('btn-primary');
        pokemonButton.setAttribute("data-toggle", "modal");
        pokemonButton.setAttribute("data-target", ".modal");

        //adding text and a class to the new button
        pokemonButton.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemonButton.classList.add('pokemon-button');

        //creating pokemon image html and adding image      
        let imageUrl = pokemon.imageUrl;
        let pokemonImage = document.createElement('img');
        pokemonImage.src = imageUrl;   
        pokemonButton.appendChild(pokemonImage);      
        
        //adding the pokemon button to the list item, and the list item to the pokemon unordered list
        listItem.appendChild(pokemonButton);
        pokemonUL.appendChild(listItem);

        //adding event listener to print pokemon name in console and show modal when clicked
        pokemonButton.addEventListener('click', function() {
            return showDetails(pokemon);

        });

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
        addListItem: addListItem,
        displayListItems: displayListItems
    }
})();


//Displaying Pokemon on Site
pokemonRepository.loadList().then(function() { //no parameter here since .loadList() doesn't have a return value
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.displayListItems(pokemon);       
    })
})   

//Notes:
    //loadList() loads initial api and fills pokemonList in repository with pokemon objects including name and details url
    //loadDetails() loads details url, and then fills the pokemon objects with height, imageUrl, and types
    //showDetails() calls loadDetails() and displays the properties in the console


//Code for Modals
let pokemonModal = (function() {

    //Helper function that retrieves pokemon types from an array of objects and displays
    function getPokemonTypes(typesObjectArray) {
        let typesArray = [];
        typesObjectArray.forEach(function(object) {    
            typesArray.push(object.type.name);
        })
        return typesArray;
    }

    function getTypeColor(typesArray) {
        console.log(typesArray)
        let pokemonTypesContainer = document.querySelector('.pokemon-types-container');
        pokemonTypesContainer.innerHTML = '';

        typesArray.forEach(function(type) {
            //create a container
            let typeContainer = document.createElement('div');

            //all types have pokemon-type class for general styling
            typeContainer.classList.add('pokemon-type');

            //create h3 to hold type text
            let typeElement = document.createElement('p');

            //add type to typeElement
            typeElement.innerText = type;
            typeContainer.classList.add((type==='' ? 'normal':type));
            
            typeContainer.appendChild(typeElement);
            
            pokemonTypesContainer.appendChild(typeContainer);
            
        })
        
    }

    function getAbilities(array) {
        let abilitiesArray = [];
        array.forEach(function(object) {
            let ability = object.ability.name;
            abilitiesArray.push(ability);
        })
        return abilitiesArray;
    }

    function formatString(string) {
        let dashIndex = string.indexOf('-');

        if (dashIndex !== -1) {
            let firstString = string.slice(0,dashIndex);
            let lastString = string.slice(dashIndex+1);
        
            let newFirstString = firstString.charAt(0).toUpperCase() + firstString.slice(1);
            let newLastString = lastString.charAt(0).toUpperCase() + lastString.slice(1);
            
            return newFirstString + " " + newLastString;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function displayAbilities(abilities) {
        let pokemonAbilitiesContainer = document.querySelector('.pokemon-abilities');
        pokemonAbilitiesContainer.innerHTML = '';
        let abilitiesArray = getAbilities(abilities);

        abilitiesArray.forEach(ability => {
            let abilityContainer = document.createElement('p');
            abilityContainer.innerText = formatString(ability);
            pokemonAbilitiesContainer.appendChild(abilityContainer);
        })

    }

    function getId(id) {      
        if (id < 10) {
            return `#00${id}`
        } else if (id < 100) {
            return `#0${id}`
        } else {
            return `#${id}`
        }
    }

    function createModal(name, height, types, image, abilities, id, weight) {
        //modal --> modal dialog --> modal content --> actual content

        //Adding pokemon name to modal
        let pokemonName = document.querySelector('.title');
        pokemonName.innerText = name.charAt(0).toUpperCase() + name.slice(1);

        //Adding pokemon height to modal
        let pokemonHeight = document.querySelector('.pokemon-height');
        pokemonHeight.innerText = height;

        //Getting pokemon types
        let typesArray = getPokemonTypes(types);
        //add background color for each type
        getTypeColor(typesArray);
        

        //Adding pokemon image to modal
        let pokemonImage = document.querySelector('.pokemon-image');
        pokemonImage.src = image; 

        //Getting pokemon abilities
        displayAbilities(abilities);

        //Displaying id
        let pokemonIdContainer = document.querySelector('.pokemon-id');
        let formattedID = getId(id);
        pokemonIdContainer.innerText = formattedID;

        //Displaying Weight
        let pokemonWeightContainer = document.querySelector('.pokemon-weight');
        pokemonWeightContainer.innerText = weight;

    }    

    return {
        createModal: createModal
    }


})();



