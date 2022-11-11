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

    // data bij juiste js zetten
    document.querySelector('.js-name').innerText = "Name: " + DictBreeds[id].name;
    document.querySelector('.js-origin').innerText = "Origin: " + DictBreeds[id].origin;
    document.querySelector('.js-life_span').innerText = "Life-span: " + DictBreeds[id].life_span;
    
    // document.querySelector('.js-img').innerHTML = `<img src="${DictBreeds[id].image.url}" alt="cat">`;
    document.querySelector('.js-img').innerHTML = `<img class="c-cat-data__img" src="${DictBreeds[id].image.url}" alt="cat">`;
    
    document.querySelector('.js-weight_imperial').innerText = DictBreeds[id].weight.imperial + " pounds";
    document.querySelector('.js-weight_metric').innerText = DictBreeds[id].weight.metric + " kilogram";

    // css aanpassen adhv deze data
    document.querySelector('.js-child_friendly').innerText = "Child-friendly:";
    document.querySelector('.js-energy_level').innerText = "Energy-level:";
    document.querySelector('.js-grooming').innerText = "Grooming:";
    document.querySelector('.js-intelligence').innerText = "Intelligence:";

    getLevel(DictBreeds[id].child_friendly, DictBreeds[id].energy_level, DictBreeds[id].grooming, DictBreeds[id].intelligence);
}

const getLevel = (cl, el, gr, il) => {
    const cfLevel = document.querySelector('.js-cf-level');
    const elLevel = document.querySelector('.js-el-level');
    const grLevel = document.querySelector('.js-gr-level');
    const ilLevel = document.querySelector('.js-il-level');

    cfLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    elLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    grLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    ilLevel.classList.remove('c-level__bar-1', 'c-level__bar-2', 'c-level__bar-3', 'c-level__bar-4', 'c-level__bar-5');
    
    cfLevel.classList.add(`c-level__bar-${cl}`);
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
