import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  //send the control to search/keyword which is product component
  doSearch(value:String){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

}
