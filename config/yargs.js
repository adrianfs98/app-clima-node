const opciones_direccion = {
    alias: 'd',
    desc: "direccion de la ciudad para obtener el clima",
    demand: true
}
//*en principio nuestra app no va a tener un comando como listar o buscar sino que introduciremos directamente direccion "ciudad" "pais al que pertenece"
//?Node nos da la opcion de esto con .option en vez de .command
const argv = require('yargs').options({
        direccion: opciones_direccion
    })
    .help()
    .argv


module.exports = {
    argv: argv,
}