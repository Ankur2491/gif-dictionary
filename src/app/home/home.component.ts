import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GifService } from '../gif.service';
const navigator = window.navigator as any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchQuery = "";
  idArr: Array<any> = [];
  giphyData: any;
  tenorData: any;
  
  constructor(private gifService: GifService, private _snackBar: MatSnackBar, private http: HttpClient) { }

  ngOnInit(): void {
  }
  prepareData() {
    this.idArr = [];
    let resArr = this.tenorData['results'];
    for (let ele of resArr) {
      let obj = { 'id': ele.id, 'url': '' }
      if (ele['media_formats']['gif']) {
        obj['url'] = ele['media_formats']['gif']['url'];
      }
      if (obj['url'] != '') {
        this.idArr.push(obj);
      }
    }
    let dataArr = this.giphyData['data'];
    for (let ele of dataArr) {
      let obj = { 'id': ele.id, 'url': `https://media.giphy.com/media/${ele.id}/giphy.gif` }
      this.idArr.push(obj);
    }
  }
  searchGif() {
    this.gifService.searchGifs(this.searchQuery).subscribe(res => {
      this.giphyData = res;
      this.gifService.searchTenor(this.searchQuery).subscribe(tenorRes => {
        this.tenorData = tenorRes;
        this.prepareData();
      });
    })
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', { duration: 2000 });
  }
  async copyGif(url: string) {
    this.http.get(url,{ responseType: 'blob' }).subscribe(async data=>{
      const imgFile: File = new File([data], "img");
      await navigator.share({
        imgFile
      })
    })
  }
    // this.openSnackBar("gif copied!!");
  
}
