import { Injectable, Renderer2 } from '@angular/core';

// works for SSR and browser-rendering

@Injectable({
  providedIn: 'root',
})
export class DomUtils {
 

  removeClasses(elem: HTMLElement, classes: string | string[], renderer: Renderer2){
    if (typeof classes == "string") classes = [classes]

    for (let c of classes){
      renderer.removeClass(elem, c)
    }
  }

  addClasses(elem: HTMLElement, classes: string | string[], renderer: Renderer2){
    if (typeof classes == "string") classes = [classes]
    

    for (let c of classes){
      renderer.addClass(elem, c)
    }
  }
  
}
