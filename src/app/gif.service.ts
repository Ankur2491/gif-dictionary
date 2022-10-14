import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifService {

  api_key=`eioUmJo2dgte1YjIwyy5249KubB4W7ZQ`;
  constructor(private http: HttpClient) { }

  searchGifs(query: string){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.api_key}&q=${query}`);
  }

}
