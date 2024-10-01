
const flagsContainer = document.querySelector('.flagsContainer');
const search = document.getElementById('search');
const chooseCountry = document.getElementById('chooseCountry');

fetch(`https://restcountries.com/v3.1/all`)
.then((response)=>response.json())
.then(data => displayflags(data));


function displayflags(data){
    flagsContainer.innerHTML = "";
    data.forEach(country => {
        const display = document.createElement('div')
        //display.classList.add('.flagsContainer')

    display.innerHTML = `
        <div class="country-flagImage">
            <img src="${country.flags.svg}">
        </div>

        <div class="country-info">
            <h1>${country.name.common}</h1>
            <p><strong>Population:</strong>  ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong>  ${country.region}</p>
             <p><strong>Capital:</strong>  ${country.capital? country.capital[0]: 'No capital found'}</p>
        </div>


    `
    flagsContainer.appendChild(display);
    }); 
    
}

function countryData(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data =>displayflags(data))
    .catch(error=> {
        console.error('error fetching data:', error)
        flagsContainer.innerHTML='<p>No country found. Please try again.</p>';
    })
}

search.addEventListener('input', ()=>{
    const country = search.value.trim();
    if(country){
        countryData(country);
    }else{
        flagsContainer.innerHTML="";
    }
})

function regionData(region){
    fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(response => response.json())
    .then(data=> displayflags(data))
    .catch(error, ()=>{
        console.error(`error in fetching region:`, error)
        flagsContainer.innerHTML= '<p>region not found</p>'
    })
}

chooseCountry.addEventListener('change', ()=>{
    const region = chooseCountry.value;
    if(region){
        regionData(region)
    }else{
        flagsContainer.innerHTML="";
    }
})





