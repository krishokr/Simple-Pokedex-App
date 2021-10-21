let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(e){let t=e.detailsUrl;return fetch(t).then(e=>e.json()).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=t.types,e.abilities=t.abilities,e.id=t.id,e.weight=t.weight}).catch(e=>console.error(e))}function o(e){let t=document.querySelector(".pokemon-list"),o=document.createElement("li");o.classList.add("col-12"),o.classList.add("col-lg-2"),o.classList.add("col-md-4"),o.classList.add("d-flex"),o.classList.add("justify-content-center");let i=document.createElement("button");i.classList.add("btn"),i.classList.add("btn-primary"),i.setAttribute("data-toggle","modal"),i.setAttribute("data-target",".modal"),i.innerText=e.name.charAt(0).toUpperCase()+e.name.slice(1),i.classList.add("pokemon-button");let c=e.imageUrl,r=document.createElement("img");r.src=c,i.appendChild(r),o.appendChild(i),t.appendChild(o),i.addEventListener("click",function(){return function(e){n(e).then(function(){pokemonModal.createModal(e.name,e.height,e.types,e.imageUrl,e.abilities,e.id,e.weight)}).catch(e=>console.error(e))}(e)})}function i(t){return"object"==typeof(n=t)&&n?e.push(t):console.log("Cannot add a non-object or an object without specified properties: name, height, types");var n}return{getAll:function(){return e},add:i,loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){i({name:e.name,detailsUrl:e.url})})}).catch(e=>console.error(e))},addListItem:o,displayListItems:function(e){n(e).then(function(){o(e)}).catch(e=>console.error(e))}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.displayListItems(e)})});let pokemonModal=function(){return{createModal:function(e,t,n,o,i,c,r){document.querySelector(".title").innerText=e.charAt(0).toUpperCase()+e.slice(1),document.querySelector(".pokemon-height").innerText=t,function(e){console.log(e);let t=document.querySelector(".pokemon-types-container");t.innerHTML="",e.forEach(function(e){let n=document.createElement("div");n.classList.add("pokemon-type");let o=document.createElement("p");o.innerText=e,n.classList.add(""===e?"normal":e),n.appendChild(o),t.appendChild(n)})}(function(e){let t=[];return e.forEach(function(e){t.push(e.type.name)}),t}(n)),document.querySelector(".pokemon-image").src=o,function(e){let t=document.querySelector(".pokemon-abilities");t.innerHTML="",function(e){let t=[];return e.forEach(function(e){let n=e.ability.name;t.push(n)}),t}(e).forEach(e=>{let n=document.createElement("p");n.innerText=function(e){let t=e.indexOf("-");if(-1!==t){let n=e.slice(0,t),o=e.slice(t+1);return n.charAt(0).toUpperCase()+n.slice(1)+" "+(o.charAt(0).toUpperCase()+o.slice(1))}return e.charAt(0).toUpperCase()+e.slice(1)}(e),t.appendChild(n)})}(i);let l=document.querySelector(".pokemon-id"),a=function(e){return e<10?`#00${e}`:e<100?`#0${e}`:`#${e}`}(c);l.innerText=a,document.querySelector(".pokemon-weight").innerText=r}}}();