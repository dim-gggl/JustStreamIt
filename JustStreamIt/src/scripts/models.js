/*
class Movie {
    constructor(
        id=0, url="", title="", original_title=""||null, year="", date_published="", duration="", description="", long_description="",
        avg_vote, imdb_score, votes, metascore, budget, budget_currency, usa_gross_income, worldwide_gross_income,
        reviews_from_users="", reviews_from_critics="", image_url="", actors=""||[], directors=""||[], writers=""||[], genres=""||[], countries=""||[], 
        languages=""||[], rated="", company=""||[]) {
            this.id = id,
            this.url = url,
            this.title = title,
            this.original_title = original_title,
            this.year = year,
            this.date_published = date_published, 
            this.duration = duration,
            this.description = description,
            this.long_description = long_description
            this.avg_vote = avg_vote,
            this.imdb_score = imdb_score,
            this.votes = votes,
            this.metascore = metascore,
            this.budget = budget,
            this.budget_currency = budget_currency,
            this.usa_gross_income = usa_gross_income,
            this.worldwide_gross_income = worldwide_gross_income,
            this.reviews_from_users = reviews_from_users,
            this.reviews_from_critics = reviews_from_critics,
            this.image_url = image_url,
            this.actors = actors,
            this.directors = directors,
            this.writers = writers,
            this.gernres = genres,
            this.countries = countries,
            this.languages = languages,
            this.rated = rated,
            this.company = company
        }
}


*/

export const createMovieModel = (data) => {
    return {
        id: data.id || 0,
        url: data.url || "",
        title: data.title || "",
        original_title: data.original_title || data.title || "",
        year: data.year || "",
        date_published: data.date_published || "",
        duration: data.duration || "",
        description: data.description || "", 
        long_description: data.long_description || "", 
        avg_vote: data.avg_vote || "", 
        imdb_score: data.imdb_score || "", 
        votes: data.votes || "", 
        metascore: data.metascore || "", 
        budget: data.budget || "", 
        budget_currency: data.budget_currency || "", 
        usa_gross_income: data.usa_gross_income || "", 
        worldwide_gross_income: data.worldwide_gross_income || "", 
        reviews_from_users: data.reviews_from_users || "", 
        reviews_from_critics: data.reviews_from_critics || "", 
        image_url: data.image_url || "", 
        actors: data.actors || [], 
        directors: data.directors || [], 
        writers: data.writers || "", 
        genres: data.genres || "", 
        countries: data.countries || "", 
        languages: data.languages || "", 
        rated: data.rated || "", 
        company: data.company || ""
    };
}
    