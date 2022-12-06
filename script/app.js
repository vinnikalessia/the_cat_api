// live_Hg2ermC9eGWh1KaZGfDE3hg191cnT6d9YfitnJKQRO18gpFShChaqADfjZ6ANKJc






const getDictId = (breeds) => {
    const dictId = {}; // dict van alle id's die een cijfer id hebben gekregen voor randomizer
    let id = 0;
    for(let breed of breeds) {
        dictId[id += 1] = breed.id;
    }
    return dictId;
}

const getRandomBreed = (breedsDict) => {
    const randomId = Math.floor(Math.random() * 60); // er zijn maar 60 verschillende rassen in API
    // randomId is cijfer id van id dat als tekst is

    const randomBreed = breedsDict[randomId];

    // ik krijg random kat-id, nu kat zoek met dat id
    return randomId;
}

const getCatById = (idCijfer, DictBreeds) => {
    const id = idCijfer - 1;
    const weight = document.querySelector('.js-weight');
    const weightButton = document.querySelector('.js-weight-button');
    const checkbox = document.querySelector('.js-checkbox');
    const weight_value = document.querySelector('.js-weight-value');

    // data bij juiste js zetten
    document.querySelector('.js-name').innerText = "Name: " + DictBreeds[id].name;
    document.querySelector('.js-origin').innerText = "Origin: " + DictBreeds[id].origin;
    document.querySelector('.js-life_span').innerText = "Life-span: " + DictBreeds[id].life_span + " years";

    // image
    document.querySelector('.js-img').innerHTML = `<img class="c-cat-data__img" src="${DictBreeds[id].image}" alt="cat">`;
    
    // weight
    document.querySelector('.js-weight').innerHTML = `<div class="c-cat-data__weight">${DictBreeds[id].weight.imperial} pounds</div>`;
    
    /////////////////////////////////////////////////////////////////////////////////////
    
    weightButton.addEventListener('click', () => {
        console.info("weight button clicked!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        if(checkbox.checked) {
            console.info("checked => kilogram");
            document.querySelector('.js-weight').innerHTML = `<div class="c-cat-data__weight">${DictBreeds[id].weight.metric} kilogram</div>`;
            
        }
        else {
            console.info("not checked => pound");
            document.querySelector('.js-weight').innerHTML = `<div class="c-cat-data__weight">${DictBreeds[id].weight.imperial} pounds</div>`;
        }
    });
    
    // document.querySelector('.js-weight_metric').innerText = DictBreeds[id].weight.metric + " kilogram";
    // document.querySelector('.js-weight_imperial').innerText = DictBreeds[id].weight.imperial + " pounds";

    /////////////////////////////////////////////////////////////////////////////////////


    // css aanpassen adhv deze data
    document.querySelector('.js-child_friendly').innerText = "Child-friendly:";
    document.querySelector('.js-energy_level').innerText = "Energy-level:";
    document.querySelector('.js-grooming').innerText = "Grooming:";
    document.querySelector('.js-intelligence').innerText = "Intelligence:";

    getLevel(DictBreeds[id].child_friendly, DictBreeds[id].energy_level, DictBreeds[id].grooming, DictBreeds[id].intelligence);
}

const getLevel = (cf, el, gr, il) => {
    const cfLevel = document.querySelector('.js-cf-level');
    const elLevel = document.querySelector('.js-el-level');
    const grLevel = document.querySelector('.js-gr-level');
    const ilLevel = document.querySelector('.js-il-level');

    /*hover waardes*/
    document.querySelector('.js-cf-waarde').innerHTML = `<p>${cf}</p>`;
    document.querySelector('.js-el-waarde').innerHTML = `<p>${el}</p>`;
    document.querySelector('.js-gr-waarde').innerHTML = `<p>${gr}</p>`;
    document.querySelector('.js-il-waarde').innerHTML = `<p>${il}</p>`;
    
    /*vorige level waardes opruimen*/
    cfLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    elLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    grLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    ilLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    
    /*de juiste bar tonen*/
    cfLevel.classList.add(`c-level__bar-${cf}`);
    elLevel.classList.add(`c-level__bar-${el}`);
    grLevel.classList.add(`c-level__bar-${gr}`);
    ilLevel.classList.add(`c-level__bar-${il}`);
}


const getData = (endpoint) => {
    return fetch(endpoint)
        .then(response => response.json())
        .catch(error => console.log(error));
}


document.addEventListener('DOMContentLoaded', async function() {
    // controle
    console.info("DOM loaded");

    // data ophalen
    const endpoint = `https://api.thecatapi.com/v1/breeds?limit=60&page=0`
    const breeds = await getData(endpoint);

    // test
    const randomCatButton = document.querySelector('.js-random-cat');

    randomCatButton.addEventListener('click', function() {
        console.info("random button clicked");
        
        const randomCat = getRandomBreed(dictId);
        getCatById(randomCat, breeds);
    })

    // id's van alle rassen in een dict zetten
    const dictId = getDictId(breeds);

    // random id van een ras ophalen
    const randomCat = getRandomBreed(dictId);

    // random kat ophalen
    getCatById(randomCat, breeds);


})
