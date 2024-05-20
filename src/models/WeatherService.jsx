export default class WeatherService{
    static baseUrl = "https://api.weatherapi.com/v1/current.json?key=81caf41e3d924f5086a150502211108&"
    static async  getWeathers(){
        const cities = [
            "Yaounde", "Trois-Rivieres", "Paris", "Shangai", "Moscou", "New York", "Kinshasa", "Bruxelles", "Pekin",
            "Sydney",        // Australie
            "Tokyo",         // Japon
            "Cape Town",     // Afrique du Sud
            "Buenos Aires",  // Argentine
            "Rio de Janeiro",// Brésil
            "London",        // Royaume-Uni
            "Berlin",        // Allemagne
            "Mumbai",        // Inde
            "Toronto",       // Canada
            "Cairo",         // Égypte
            "Istanbul",      // Turquie
            "Mexico City",   // Mexique
            "Seoul",         // Corée du Sud
            "Lagos",         // Nigéria
            "Los Angeles",   // États-Unis
            "Rome",          // Italie
            "Bangkok"        // Thaïlande
        ];
        
        let result = []
        for await (let city of cities){
            let response = await fetch(`${this.baseUrl}q=${city}`)
            let json = await response.json()
            result.push(json)
        }
        return result
  
 
    }
    static async getWather(city){
        let response = await fetch(`${this.baseUrl}q=${city}`)
        return await response.json()
    }

}