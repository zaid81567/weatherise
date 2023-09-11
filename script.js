const api_key = 'a4349d9cec784e9c8ec200021230509'
const base_url = 'https://api.weatherapi.com/v1/current.json?'
let is_dark_mode = false


const body_el = document.body
const header_el = document.getElementsByTagName('header')[0]
const dark_mode_toggle = document.getElementById('dark-mode-icon')
const search_bar_el = document.getElementById('search-bar')
const condition_el = document.getElementsByClassName('condition-info')[0]
const degree_el = document.getElementsByClassName('degree')[0]
const response_location_el = document.getElementsByClassName('location')[0]
const feels_like_el = document.getElementById('feels-like')
const humidity_el = document.getElementById('humidity')
const wind_el = document.getElementById('wind-speed')




// -------------------Function---------------------

function render_data(data_dict){
    // search_bar_el.value = ''
    condition_el.textContent = data_dict.condition
    degree_el.textContent = data_dict.current_temp
    response_location_el.textContent = data_dict.location
    feels_like_el.textContent = data_dict.feels_like
    humidity_el.textContent = data_dict.humidity
    wind_el.textContent = data_dict.wind_speed
}

function unpack_data(data){
    //location data
    let data_dict = {}
    console.log(data.current.condition.text.toLowerCase())
    let city = data.location.name
    let country = data.location.country

    data_dict.condition = data.current.condition.text.toLowerCase()
    data_dict.current_temp = Math.floor(data.current.temp_c)
    data_dict.location = `${city} - ${country}`
    data_dict.feels_like = data.current.feelslike_c
    data_dict.humidity = data.current.humidity
    data_dict.wind_speed = data.current.wind_kph
    
    render_data(data_dict)
}

function getJson(url){
    fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error('Response not ok!')
            }

            return response.json()
        })
        .then(data =>{
            unpack_data(data)
        })
        .catch(error =>{
            console.log('Fetch Error: ',error)
        })
}


function getCurrentWeather(location){
    // let location = search_location.value 
    let url =  `${base_url}key=${api_key}&q=${location}`
    getJson(url)
}


//first search
getCurrentWeather('kolkata')




// ---------------------event-listeners-------------

document.body.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter' || e.key == 'Return'){
        let location = search_bar_el.value
        getCurrentWeather(location)
    }
})


dark_mode_toggle.addEventListener('click', function(e){

    // icon from iconify
    // "fxemoji:whitesun" - sun icon
    // "iconamoon:mode-dark-fill" - moon icon
    is_dark_mode = !is_dark_mode
    

    let toggleDarkModeIcon = function(is_dark_mode){
        if(is_dark_mode){
            e.target.setAttribute('icon',"fxemoji:whitesun")
            return
        }

        e.target.setAttribute('icon',"iconamoon:mode-dark-fill")
    }


    body_el.classList.toggle('dark-mode')
    header_el.classList.toggle('header-dark-mode')

    toggleDarkModeIcon(is_dark_mode)

})