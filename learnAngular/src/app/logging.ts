import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logging {
  logging(value: any){
    console.log(value)
  }
}
