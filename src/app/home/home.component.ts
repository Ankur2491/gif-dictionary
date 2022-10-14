import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GifService } from '../gif.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchQuery = "";
  idArr: Array<any> = [];
  constructor(private gifService: GifService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  prepareData(dataObj: any) {
    this.idArr = [];
    let dataArr = dataObj['data'];
    for (let ele of dataArr) {
      let obj = { 'id': ele.id, 'url': `https://media.giphy.com/media/${ele.id}/giphy.gif` }
      this.idArr.push(obj);
    }
    console.log(this.idArr);
  }
  searchGif() {
    this.gifService.searchGifs(this.searchQuery).subscribe(res => {
      this.prepareData(res);
    })
  }
  openSnackBar(message: string) { 
      this._snackBar.open(message,'Dismiss',{duration:2000});
  }
  copyGif() {
    this.openSnackBar("gif copied!!");
  }
}
