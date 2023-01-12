// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  Signup:'http://localhost:3000/signup',
  Login:'http://localhost:3000/login',
  ResetPass:'http://localhost:3000/login/reset',
  otp:'http://localhost:3000/login/otp',
  updatepass:'http://localhost:3000/login/updatepassword',
  dasboard:'http://localhost:3000/dashboard',
  thumbgallery:'http://localhost:3000/dashboard/thumbgallery',
  newAnime:'http://localhost:3000/dashboard/cards',
  AnimeSearch:'http://localhost:3000/dashboard/search',
  watch:'http://localhost:3000/dashboard/watch',
  stream:'http://localhost:3000/dashboard/stream',
  genre:'http://localhost:3000/dashboard/genre',
  movie:'http://localhost:3000/dashboard/movie',
  popular:'http://localhost:3000/dashboard/popular'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
