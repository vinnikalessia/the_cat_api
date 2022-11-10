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
    // console.log(randomBreed); // dit is id van een breed

    // ik krijg random kat-id, nu kat zoek met dat id
    // getCatById(randomBreed);
    // return randomBreed;
    return randomId;
}

const getCatById = (idCijfer, DictBreeds) => {
    const id = idCijfer - 1;

    // testen of alles werkt en ik alle data kan ophalen
    console.info(DictBreeds[id].id + "😆😆😆😆😆"); // naam id van random kat
    console.info(DictBreeds[id].name); // naam van random kat
    console.info(DictBreeds[id].origin); // origin van random kat
    console.info(DictBreeds[id].life_span + " years"); // life span van random kat

    console.info(DictBreeds[id].weight.imperial + " pounds"); // weight pounds van random kat
    console.info(DictBreeds[id].weight.metric + " kilogram"); // weight kilogram van random kat

    console.info(DictBreeds[id].child_friendly); // child friendly van random kat
    console.info(DictBreeds[id].energy_level); // energy level van random kat
    console.info(DictBreeds[id].grooming); // grooming van random kat
    console.info(DictBreeds[id].intelligence); // intelligentie van random kat

    // data bij juiste js zetten
    document.querySelector('.js-name').innerText = "Name: " + DictBreeds[id].name;
    document.querySelector('.js-origin').innerText = "Origin: " + DictBreeds[id].origin;
    document.querySelector('.js-life_span').innerText = "Life-span: " + DictBreeds[id].life_span;
    
    // document.querySelector('.js-img').innerHTML = `<img src="${DictBreeds[id].image.url}" alt="cat">`;
    document.querySelector('.js-img').innerHTML = `<img class="c-cat-data__img" src="${DictBreeds[id].image.url}" alt="cat">`;
    
    document.querySelector('.js-weight_imperial').innerText = DictBreeds[id].weight.imperial + " pounds";
    document.querySelector('.js-weight_metric').innerText = DictBreeds[id].weight.metric + " kilogram";

    // css aanpassen adhv deze data
    document.querySelector('.js-child_friendly').innerText = "Child-friendly: " + DictBreeds[id].child_friendly;
    document.querySelector('.js-energy_level').innerText = "Energy-level: " + DictBreeds[id].energy_level;
    document.querySelector('.js-grooming').innerText = "Grooming: " + DictBreeds[id].grooming;
    document.querySelector('.js-intelligence').innerText = "Intelligence: " + DictBreeds[id].intelligence;
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
    console.log(breeds[1]);

    // id's van alle rassen in een dict zetten
    const dictId = getDictId(breeds);

    // random id van een ras ophalen
    const randomCat = getRandomBreed(dictId);

    // random kat ophalen
    getCatById(randomCat, breeds);
})
