const request = require('request')

const weather = (address,callback) =>{
    const url = 'http://api.weatherapi.com/v1/current.json?key=eaf1d14876884e0190951908220701&q=' + encodeURIComponent(address)
    request({url,json:true},(error,{body}) => {
        if(error){
            callback("Unable to connect to weather service",undefined)
        }
        else if(body.error){
            callback(body.error.message,undefined)
        }
        else{
            callback(undefined,"The temperature is "+body.current.temp_c + " C but it feels like "
            +body.current.feelslike_c + " C")
        }
    })
}

module.exports = weather