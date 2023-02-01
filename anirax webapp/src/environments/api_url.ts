import { environment } from "./environment";

export const backend_api = {
    production: false,
    base_singup: environment.Signup,
    base_login: environment.Login,
    base_ResetPass: environment.ResetPass,
    base_otp: environment.otp,
    base_update_password: environment.updatepass,
    base_dashboard:environment.dasboard,
    base_thumbgallery:environment.thumbgallery,
    base_anime:environment.newAnime,
    base_anime_search:environment.AnimeSearch,
    base_watch:environment.watch,
    base_stream:environment.stream,
    base_genre:environment.genre,
    base_movie:environment.movie,
    base_popular:environment.popular
  };
