import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }
  ngOnDestroy(): void {

  }
  async signup(body: { name: any; email: any; password: any; }, url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.post(url, body).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async signupget(url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.get(url).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }

  async login(url: string){
    return new Promise(async (resolve,reject)=>{
      this.http.get(url).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }

  async loginpost(url: string,body: { email: any; password: any; }){
    return new Promise(async (resolve,reject)=>{
      this.http.post(url,body).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async resetpassword(url: string,body: { email: any; }){
    return new Promise(async (resolve,reject)=>{
      this.http.post(url,body).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async otpsend(url: string,body: { otp: any; email: string; }){
    return new Promise(async (resolve,reject)=>{
      this.http.post(url,body).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async updatepassword(body: { password: any; email: string; }, url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.put(url, body).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async dashboardget(url: string) {
    let token = localStorage.getItem('token')
    let options:any={
      body:token
    }
    return new Promise(async (resolve,reject) => {
      this.http.get(url,{headers:options}).subscribe({
        next: data =>{
          resolve(data)
        },
        error: err=>{
          reject(err)
        }
      })
    })
  }
  async thumbgallery(url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.get(url).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async newanimes(url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.get(url).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }

  async animesearch(url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.get(url).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async animewatch(url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.get(url).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
  async animestream(url: string) {
    return new Promise(async (resolve,reject) => {
      this.http.get(url).subscribe({
        next: (data: unknown) =>{
          resolve(data)
        },
        error: (err: any)=>{
          reject(err)
        }
      })
    })
  }
async auth(){
    let toker =  localStorage.getItem('token')
    if(toker){
      return true
    }else{
      return false
    }
 }
 async genreget(url: string) {
  return new Promise(async (resolve,reject) => {
    this.http.get(url).subscribe({
      next: (data: unknown) =>{
        resolve(data)
      },
      error: (err: any)=>{
        reject(err)
      }
    })
  })
}
async movieget(url: string) {
  return new Promise(async (resolve,reject) => {
    this.http.get(url).subscribe({
      next: (data: unknown) =>{
        resolve(data)
      },
      error: (err: any)=>{
        reject(err)
      }
    })
  })
}
async popular(url: string) {
  return new Promise(async (resolve,reject) => {
    this.http.get(url).subscribe({
      next: (data: unknown) =>{
        resolve(data)
      },
      error: (err: any)=>{
        reject(err)
      }
    })
  })
}
}
