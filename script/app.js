const getData = (endpoint) => {
    return fetch(endpoint)
        .then(response => response.json())
        .catch(error => console.log(error));
}


document.addEventListener('DOMContentLoaded', async function() {
    const endpoint = `https://api.thecatapi.com/v1/breeds?limit=60&page=0`
    // live_Hg2ermC9eGWh1KaZGfDE3hg191cnT6d9YfitnJKQRO18gpFShChaqADfjZ6ANKJc
    console.info(await getData(endpoint))
})