let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['poison', 'grass']},
    {name: 'Charizard', height: 1.7, types: ['fire', 'flying']}, 
    {name: 'Squirtle', height: 0.5, types: ['water']}
];

for (let i=0; i<pokemonList.length; i++) {

    let pokemonName = pokemonList[i].name;
    let pokemonHeight = pokemonList[i].height;

    let note;
    if (pokemonHeight > 1) {
        note = 'So big!!'
    }
    
    let result = `<br>${pokemonName} (Height: ${pokemonHeight}) ${note || ''}<br>` ;
    
    document.write(result);
}


