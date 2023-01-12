import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { backend_api } from '../../../../environments/api_url'
import { ApiServiceService } from '../../../service/Api/api-service.service';
import { YourComponent } from '../../../service/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(private Router: Router, private service: ApiServiceService, private active: ActivatedRoute, private noti: YourComponent, private dialog: MatDialog) {

  }
  public search: String = "";
  logout() {
    localStorage.removeItem('token')
    this.Router.navigateByUrl('login')
  }

  AnimeSearch() {
    let url = backend_api.base_anime_search
    let data = this.search
    this.service.animesearch(`${url}?name=${data}&page=1`).then(r => {
      if (JSON.parse(JSON.stringify(r)).data.length == 0) {
        this.noti.showError("No Anime exist of such name", "Try again")
        return
      }
      this.Router.navigate(['Dashboard/search'],
        {
          skipLocationChange: true, queryParams: {
            Animedata: JSON.stringify(r)
          }
        })
    }).catch(e => {
      this.noti.showError(e.error.message, 'Try again')
    })
  }
  genre() {
    this.dialog.open(DialogComponent, {
      width: "500px",
      height: "400px",
      autoFocus: true,
      panelClass: 'custom-modalbox',
      data: {
        genre: true
      }
    })
  }

  movie(){
    this.dialog.open(DialogComponent,{
      width:"300px",
      height:"150px",
      autoFocus:true,
      panelClass: 'movie-box',
      data:{
        movie:true
      }
    })
  }
  popular(){
    let url = backend_api.base_popular
    this.service.popular(url).then(r=>{
      localStorage.setItem('popular','popular')
      let data = [JSON.stringify(r)]
      this.Router.navigate(['Dashboard/search'], {
        skipLocationChange: true,
        queryParams: {
          Animedata: data
        }
      })
    }).catch(e=>{
      console.log(e);
    })
  }
}
