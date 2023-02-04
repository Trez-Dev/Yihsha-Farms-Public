import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  };

  // postBlog(blog: any){
  //   let url = "http://localhost:3000/blogs";
  //   return this.http.post(url, blog, this.httpOptions);
  // }

  public getPokiData(): Observable<any>{
    let pokiUrl = "https://pokeapi.co/api/v2/pokedex";
    let params = new HttpParams().set('count','248')
    return this.http.get(pokiUrl,{params})
  }
}
