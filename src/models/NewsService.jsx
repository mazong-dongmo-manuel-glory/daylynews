export default class NewsService{
    static key = "b0c01e49a67e437b8a134183c9610640"
    static baseUrl = "https://newsapi.org/v2/"

    static async getHeadline(){
        let response = await fetch(`${this.baseUrl}/top-headlines?apikey=${this.key}&country=us&category=technology&pageSize=30`)
        return await response.json()

    }
}