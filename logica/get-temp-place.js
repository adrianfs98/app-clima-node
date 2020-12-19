const axios = require('axios').default


const getTemperatureByGeoCoordinates = async (longitud, latitud, units) => {

    //?sino nos meten el parametro metrics, por defecto a grados centigrados
    if (units == undefined) {
        units = 'metric'
    }
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=de8ccdc79fee5cb43f070e07861a9108&units=${units}`)

    // console.log(resp)
    //console.log(resp.data.weather[0])
    //console.log(resp.data.main)

    return {
        weather: resp.data.weather[0],
        temperatures: resp.data.main
    }
}

module.exports = {
    getTemperatureByGeoCoordinates
}