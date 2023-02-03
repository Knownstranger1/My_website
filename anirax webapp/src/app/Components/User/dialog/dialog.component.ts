import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ApiServiceService } from '../../../service/Api/api-service.service';
import { backend_api } from '../../../../environments/api_url';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  public p: number = 1
  public movie:any;
  public genre = ['action', 'adventure', 'cars', 'comedy',
   'crime', 'dementia', 'demons', 'drama', 'dub', 'ecchi',
    'family', 'fantasy', 'game', 'harem', 'gourmet', 'hentai',
     'historical', 'horror', 'josei', 'kids', 'magic', 'martial-arts',
      'mecha', 'military', 'mystery', 'parody', 'police',
       'psychological', 'romance', 'samurai', 'school', 'sci-fi',
   'seinen', 'shoujo', 'shoujo-ai', 'shounen', 'shounen-ai',
   , 'space', 'sports', 'super-power', 'supernatural', 'suspense']
  constructor(public dialogRef: MatDialogRef<ToolbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ApiServiceService,
    private router: Router
  ) {

  }
  genreget(i: any) {
    localStorage.setItem('genre',i)
    if(i =="hentai"){
      localStorage.removeItem('genre')
    console.log('cool');
    alert('Your Data has been Sent to the FBI -_- nigga')
    return
    }
    let url = backend_api.base_genre
    this.service.genreget(`${url}?genre=${i}`).then(r => {
      let data = [JSON.stringify(r)]
      this.dialogRef.close()
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
  moviesearch(){
    console.log(this.movie);
    let url = backend_api.base_movie
    localStorage.setItem('movie',`${this.movie}`)
    this.service.movieget(`${url}?movie=${this.movie}`).then(r=>{
      let data = [JSON.stringify(r)]
      this.dialogRef.close()
      this.router.navigate(['Dashboard/search'], {
        skipLocationChange: true,
        queryParams: {
          genre: data
        }
      })
    }).catch(e=>{
      console.log(e);
    })
  }
}
