import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  dataset:any;
  filterName: string = "";
  input: any;
  cnt =0;
  constructor(private http: HttpClient) { }
  values = Array<string>();
  ngOnInit(){
    this.http.get("../assets/intents.json").subscribe((data:any) => {
      console.log(data);
      this.dataset = data;
  })
  }

  addInput(event: any){
    
    console.log(this.dataset.intents)
    console.log(event.target.value);
    let pre = this.values.length;
    this.dataset.intents.forEach((element:any) => {
      element.patterns.forEach((el:any) => {
        if(event.target.value.toLowerCase().includes(el.toLowerCase())){
          console.log(el.toLowerCase() , "?" , element.responses[Math.floor(Math.random()*element.responses.length)]);
          this.values.push(element.responses[Math.floor(Math.random()*element.responses.length)]);
          
        }else if (el.toLowerCase().includes(event.target.value.toLowerCase())){
          this.values.push(element.responses[Math.floor(Math.random()*element.responses.length)]);
         
        }

      });
    });
    if(pre == this.values.length){
      this.values.push("Sorry, Alvi didnt teach me this")
    }
    event.target.value = ""
  }
}
