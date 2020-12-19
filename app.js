const {
	argv
} = require('./config/yargs')

const {
	getPlace,
	sendGet
} = require('./logica/get-info-place')

const {
	getTemperatureByGeoCoordinates
} = require('./logica/get-temp-place')

/* sendGet(argv.direccion)
	.then(res => {
		console.log(res)
	})
	.catch()
 */

async function getCoordWeather(direccion) {

	try {
		let coord_place = await getPlace(direccion)

		let temp_place = await getTemperatureByGeoCoordinates(coord_place.longitud, coord_place.latitud)


		return {
			place_name: coord_place.place_name,
			place_lat: coord_place.latitud,
			place_longi: coord_place.longitud,
			weather: temp_place.weather.main,
			temperature: temp_place.temperatures.temp
		}
	} catch (error) {
		return error
	}


	/* await getPlace(argv.direccion)
	.then(res=>{
		await getTemperatureByGeoCoordinates(res.longitud, res.latitud, 'metric')
	}) */

}

getCoordWeather(argv.direccion)
	.then(res => {
		console.log('-----------------------------------------------------')
		console.log(`El tiempo de ${res.place_name} es: ${res.weather}`)
		console.log(`La latitud es ${res.place_lat}`)
		console.log(`La longitud es ${res.place_longi}`)
		console.log(`Y su temperatura de ${res.temperature} grados`)
	})
	.catch(err => {
		console.log(err)
	})