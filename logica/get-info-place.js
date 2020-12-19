//?ponemos el .default para que nos salgan los snippets de autocompletados en los metodos del axios
const axios = require('axios').default;

const getPlace = async (direccion) => {
    //?con este if comprobamos si se va a llamar la fucncion con yargs o no
    if (direccion == undefined) {
        direccion = argv.direccion
    }

    //*antes de crear la base Url y pasarle la direccion que nos ha pasad el usuario por yargs, debemos hacer un encode URI ya que esta puede contener espacios en blanco o caracteres especiales y hay veces que no va si no hacemos un encode de la URI

    const encoded_direccion = encodeURI(direccion)

    const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded_direccion}.json`,
        params: {
            'access_token': 'pk.eyJ1IjoiYWRyaWFuc2c5OCIsImEiOiJja2l0aGlwNTAwMHdzMzNtd2tyMjk1aGFqIn0.NwBt9RTpgLOdDniHBWgJPg'
        }
    })

    let response = await instance.get()
    //console.log(response)
    if (response.data.features.length == 0) {
        throw new Error('la api no ha devuelto datos para la direccion ' + direccion)
    } else {

        //*esto de abajo es un array que en cada nodo tiene un objeto con los resultados de los data devuelto por la api segun la direccion que le hemos pasado
        //console.log(response.data.features)
        //*en este caso solo vamos a coger el primer nodo
        let datos_direccion = response.data.features[0]
        let place_name = datos_direccion.place_name
        let longitud = datos_direccion.center[0]
        let latitud = datos_direccion.center[1]

        return {
            place_name: place_name,
            longitud,
            latitud
        }
    }





}


//*simulacion de funcion que va a hacer algo con los datos obtenidos de la api y gracias al await hasta que no se devuelve el resuktado de la api controlamos que no se envien los datos(es el log de im going to send...)
async function sendGet(direccion) {
    await getPlace(direccion)
        .then(res => {
            console.log(res)
            console.log('im going to send this data')
        })
        .catch(err => console.log(err))
}

module.exports = {
    getPlace,
    sendGet,

}