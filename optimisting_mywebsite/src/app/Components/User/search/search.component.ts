import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { backend_api } from 'src/environments/api_url';
import { ApiServiceService } from '../../../service/Api/api-service.service';
import { YourComponent } from '../../../service/notification/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public animedata: any;
  public p: number = 1;
  public page: number = 1
  public search: String = "";
  public animedata1: any;
  constructor(private activeroute: ActivatedRoute, private router: Router, private service: ApiServiceService, private noti: YourComponent) {
    this.activeroute.queryParams.subscribe(params => {
      let data = params['Animedata'] == undefined ? params['genre'] : params['Animedata']
      this.animedata = JSON.parse(data).data
    })
  }
  ngOnInit(): void {

  }
  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }

  AnimeSearch() {
    let url = backend_api.base_anime_search
    let data = this.search
    this.service.animesearch(`${url}?name=${data}&page=1`).then(r => {
      if (JSON.parse(JSON.stringify(r)).data.length == 0) {
        this.noti.showError("No Anime exist of such name", "Try again")
        return
      }
      this.animedata = JSON.parse(JSON.stringify(r)).data
      console.log(this.animedata);

    }).catch(e => {
      this.noti.showError(e.error.message, 'Try again')
    })
  }
  watch(name: any) {
    let url = backend_api.base_watch
    this.service.animesearch(`${url}?id=${name}`).then(r => {
      let navigationextra = {
        queryParams: {
          data: JSON.stringify(r)
        }
      }
      this.router.navigate(['Dashboard/watch'], navigationextra)
    }).catch(e => {

    })
  }
  genreget(t: string) {
    if (t == 'n') {
      this.page = this.page + 1
      let i = localStorage.getItem('genre')
      let movie = localStorage.getItem('movie')
      let popular = localStorage.getItem('popular')
      console.log(popular);
      if (popular == 'popular') {
        let url = backend_api.base_popular
        this.service.popular(`${url}?page=${this.page}`).then(r => {
          let data = [JSON.stringify(r)]
          this.router.navigate(['Dashboard/search'], {
            skipLocationChange: true,
            queryParams: {
              Animedata: data
            }
          })
        }).catch(e => {
          console.log(e);
        })
        return
      }
      if (i != null) {
        let url = backend_api.base_genre
        this.service.genreget(`${url}?genre=${i}&page=${this.page}`).then(r => {
          let data = [JSON.stringify(r)]
          this.router.navigate(['Dashboard/search'], {
            skipLocationChange: true,
            queryParams: {
              genre: data
            }
          })
        }).catch(e => {
          console.log(e)
        })
        return
      }
      else {
        let url = backend_api.base_movie
        this.service.movieget(`${url}?movie=${movie}&page=${this.page}`).then(r => {
          let data = [JSON.stringify(r)]
          this.router.navigate(['Dashboard/search'], {
            skipLocationChange: true,
            queryParams: {
              genre: data
            }
          })
        }).catch(e => {
          console.log(e);
        })
      }

    }
    if (t == 'p') {
      if (this.page == 1) {
        this.page = 1;
        return
      } else {
        this.page = this.page - 1
        let i = localStorage.getItem('genre')
        let movie = localStorage.getItem('movie')
        if (i != null) {
          let url = backend_api.base_genre
          this.service.genreget(`${url}?genre=${i}&page=${this.page}`).then(r => {
            let data = [JSON.stringify(r)]
            this.router.navigate(['Dashboard/search'], {
              skipLocationChange: true,
              queryParams: {
                genre: data
              }
            })
          }).catch(e => {
            console.log(e);
          })
        }
        else {
          let url = backend_api.base_movie
          this.service.movieget(`${url}?movie=${movie}&page=${this.page}`).then(r => {
            let data = [JSON.stringify(r)]
            this.router.navigate(['Dashboard/search'], {
              skipLocationChange: true,
              queryParams: {
                genre: data
              }
            })
          }).catch(e => {
            console.log(e);
          })
        }
      }
    }

  }
}
