export function createMovieModel(data) {
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
  