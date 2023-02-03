import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/Api/api-service.service';
import { YourComponent } from 'src/app/service/notification/notification.service';
import { backend_api } from 'src/environments/api_url';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent {
  @Output()
  selectedIndexChange: EventEmitter<number> | undefined
  public animedata:any;
  public p:number = 1;
  public dp:number = 1;
  public loader:boolean = true;
  public itemsperpage:number | undefined;
  constructor(private service: ApiServiceService, private noti: YourComponent, private router: Router) {

  }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ngOnInit(): void {
    this.dashboardget()
    this.newanime()
  }

  dashboardget(){
    let url = backend_api.base_dashboard
    this.service.dashboardget(`${url}`).then(res=>{
    this.noti.showSuccess('Welcome','Enjoy the Anime')
    }).catch(e=>{
      this.noti.showError('Session Expired','Try again')
      this.router.navigate(['login'])
    })
  }

  tabchange(event: any) {
    console.log(event);
    switch (event) {
      case 0:
         this.newanime();
        break;
      case 1:
        this.newanimedub()
        break;
      case 2:

      break;
    }
  }


Watch(name: any){
  let url = backend_api.base_watch
  this.service.animesearch(`${url}?id=${name}`).then(r=>{
    let navigationextra={
      queryParams:{
        data:JSON.stringify(r)
      }
    }
   this.router.navigate(['Dashboard/watch'],navigationextra)
  }).catch(e=>{
    
  })
}

newanimedub(){
  this.loader = true
  let url = backend_api.base_anime
  this.service.newanimes(`${url}?lang=2&page=${this.dp}`).then(r=>{
    this.animedata = JSON.parse(JSON.stringify(r)).data  
    this.loader = false
  }).catch(e=>{

  })
}

  newanime(){
    let url = backend_api.base_anime
    this.loader = true
    this.service.newanimes(`${url}?lang=1&page=${this.p}`).then(r=>{
      this.animedata = JSON.parse(JSON.stringify(r)).data
      this.loader = false     
    }).catch(e=>{

    })
  } 
  next(){
    this.p =this.p + 1
    let url = backend_api.base_anime
    this.loader = true
    this.service.newanimes(`${url}?lang=1&page=${this.p}`).then(r=>{
      this.animedata = JSON.parse(JSON.stringify(r)).data  
      this.loader = false   
    }).catch(e=>{

    })
  }
  Previous(){
    this.loader = true
   if(this.p == 1){
    this.p = 1
    let url = backend_api.base_anime
    this.service.newanimes(`${url}?lang=1&page=${this.p}`).then(r=>{
      this.animedata = JSON.parse(JSON.stringify(r)).data     
      this.loader = false
    })
   }else{
    this.p = this.p - 1
    let url = backend_api.base_anime
    this.service.newanimes(`${url}?lang=1&page=${this.p}`).then(r=>{
      this.animedata = JSON.parse(JSON.stringify(r)).data
      this.loader = false     
    }).catch(e=>{

    })
  }
}

Dubnext(){
  this.loader = true
  this.dp =this.dp + 1
    let url = backend_api.base_anime
    this.service.newanimes(`${url}?lang=1&page=${this.dp}`).then(r=>{
      this.animedata = JSON.parse(JSON.stringify(r)).data     
      this.loader = false
    }).catch(e=>{

    })
}

DubPrevious(){
  this.loader = true
  if(this.dp == 1){
    this.dp = 1
   }else{
    this.dp = this.dp - 1
    let url = backend_api.base_anime
    this.service.newanimes(`${url}?lang=1&page=${this.dp}`).then(r=>{
      this.animedata = JSON.parse(JSON.stringify(r)).data     
      this.loader = false
    }).catch(e=>{

    })
  }
}

}
