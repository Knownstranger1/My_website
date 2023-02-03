import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticlesConfig } from './particle';
import { backend_api } from '../../../../environments/api_url';
import { ApiServiceService } from '../../../service/Api/api-service.service';


declare let particlesJS: any;
@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})

export class WatchComponent implements OnInit {
  public animedata: any;
  public p: string|number =1;
  
  constructor(private activeroute: ActivatedRoute,private router:Router,private service:ApiServiceService) {
   
  }
  ngOnInit(): void {
    this.anime()
    this.invokeParticles();
  }

  anime(){
    this.activeroute.queryParams.subscribe(params => {
      let data = params['data']
      this.animedata = JSON.parse(data).data
    })
  }
  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function() {});
  }
  stream(i: any){
  let url = backend_api.base_stream
  this.service.animestream(`${url}?id=${i}`).then(r=>{
    document.location.href = `${JSON.parse(JSON.stringify(r)).data.Referer}`
  })
  }
}
