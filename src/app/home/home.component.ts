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
  shareId: string="";
  loading = false;
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
    this.idArr = [];
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
  async copyGif(id: string, url: string) {
    this.shareId = id;
    this.loading = true;
    console.log(this.shareId, this.loading);
    let mainData: any = {files: []};
    const options = { type: "image/gif" };
    this.http.get(url,{ responseType: 'arraybuffer' }).subscribe(async resp=>{
      const imgFile = new File([resp], `${id}.gif`, options);   
      this.loading = false;
      mainData.files.push(imgFile);
      await navigator.share(
        mainData
      )
    })
  }
    // this.openSnackBar("gif copied!!");
  
}
