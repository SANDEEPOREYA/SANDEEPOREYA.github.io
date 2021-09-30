//Rendering Map
let lat = document.getElementById('latitude').placeholder
let long = document.getElementById('longitude').placeholder

renderMap(lat, long)

document.getElementById('search').addEventListener('click', function(e) {
    e.preventDefault()

    // console.log('working...')
    let div = document.getElementById('map')
    div.remove()

    let lat = document.getElementById('latitude').value
    let long = document.getElementById('longitude').value

    let div1 = document.createElement('div')
    let container = document.getElementById('fs-1')
    div1.id = 'map'
    container.append(div1)

    renderMap(lat, long)
})

function renderMap(lat, long) {
    let map = L.map('map').setView([Number(lat), Number(long)], 10)

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=875NVdJ6zis6NU6q7RJF', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(map)

    let marker = L.marker([Number(lat), Number(long)])
    marker.addTo(map)
}

//Calculate Water Quality Index
let inputs = document.querySelectorAll('#fs-2 input[type="text"]')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let standard_values = [8.5, 300, 1, 500, 5, 5, 4.5, 200, 200, 200, 250, 0.5, 45, 300, 200]
    let ideal_values = [7, 0, 0, 0, 14.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let k = 0
    let unit_weight_values = []
    let quality_rating_values = []
    let sum_unit_weight = 0
    let sum_quality_unit_weight = 0
    let waterQualityIndex = 0

    //Calculating proportionate constant(k) value
    for(let i = 0; i < standard_values.length; i++) {
        k += (1/standard_values[i])
    }

    /*Calculating unit weight of each parameter using standard values
    and storing it in unit_weight_values array */
    for(let i = 0; i < standard_values.length; i++) {
        let temp = (k/standard_values[i])
        unit_weight_values.push(temp)
    }

    for(let i = 0; i < inputs.length; i++) {
        let temp = ((inputs[i].value - ideal_values[i])/(standard_values[i] - ideal_values[i])) * 100
        quality_rating_values.push(temp)
    }

    for(let i = 0; i < inputs.length; i++) {
        sum_quality_unit_weight += quality_rating_values[i] * unit_weight_values[i]
        sum_unit_weight += unit_weight_values[i]
    }
    waterQualityIndex = (sum_quality_unit_weight/sum_unit_weight)

    //assigning quality rating using DOM
    let spans = document.querySelectorAll('table tr td span')
    for(let i = 0; i < spans.length; i++) {
        spans[i].innerHTML = quality_rating_values[i].toFixed(0)
    }

    let wqi = document.getElementById('WQI_span')
    wqi.innerHTML = waterQualityIndex.toFixed(2)
})