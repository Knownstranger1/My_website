import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiServiceService } from 'src/app/service/Api/api-service.service';
import SwiperCore, { Pagination, Navigation, Swiper ,Autoplay, FreeMode, Thumbs, EffectCoverflow, Lazy } from "swiper";
import { backend_api } from 'src/environments/api_url';
import { YourComponent } from '../../../service/notification/notification.service';
import { Router } from '@angular/router';
SwiperCore.use([Pagination,Navigation,Autoplay,FreeMode,Thumbs,EffectCoverflow,Lazy]);
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {
  public thumbsSwiper: Swiper | undefined;
  public animedata:any;
  public c = console.log
  constructor(private service:ApiServiceService,private noti:YourComponent,private router: Router ){

  }
ngOnInit(): void {
this.thumbgallery()
}

thumbgallery(){
  let day = new Date().getDay()
  let url = backend_api.base_thumbgallery
  this.service.thumbgallery(`${url}?lang=1&page=${day}`).then(res=>{
   this.animedata = JSON.parse(JSON.stringify(res)).synopsis
  }).catch(error=>{
   this.noti.showError(error.message,'Try again Sometime Later')
  })
}

watch(name:any){
    let navigationextra={
      queryParams:{
        data:JSON.stringify(name)
      }
    }
   this.router.navigate(['Dashboard/watch'],navigationextra)
}
}
