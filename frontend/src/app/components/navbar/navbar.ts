import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { DomUtils } from '../../services/dom-utils';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  constructor(
    private renderer: Renderer2,
    private domUtils: DomUtils
  ) {}
  
  // elements
  @ViewChild("menubar") menubar!: ElementRef
  @ViewChild("leftArr") leftArr!: ElementRef
  @ViewChild("rightArr") rightArr!: ElementRef

  overflowLeft = 0
  leftMove_default = 160


  showMenuBarArr(arrow: HTMLElement){
    this.domUtils.removeClasses(arrow, ["unvisible", "noPointer"], this.renderer)
    this.domUtils.addClasses(arrow, "visible", this.renderer)  
    this.renderer.removeClass(arrow,"unvisible")  
    this.renderer.removeClass(arrow,"noPointer")  
    this.renderer.addClass(arrow,"visible")
  }
  hideMenuBarArr(arrow: HTMLElement){
    this.domUtils.removeClasses(arrow, "visible", this.renderer)
    this.domUtils.addClasses(arrow, ["unvisible", "noPointer"], this.renderer)  
  }


  // click on left arrow of menubar
  moveMenubarRight(){

    this.renderer.removeClass(this.menubar.nativeElement,"moveBarLeft")
    if (this.overflowLeft<=this.leftMove_default){

      this.renderer.setStyle(this.menubar.nativeElement, "transform", "translateX(0px)")
      this.overflowLeft = 0
      this.showMenuBarArr(this.rightArr.nativeElement)
      this.hideMenuBarArr(this.leftArr.nativeElement)
    }

    else{

      const nextTf = this.overflowLeft - this.leftMove_default  //decreasing the negative translateX
      this.renderer.setStyle(this.menubar.nativeElement, "transform", `translateX(-${nextTf}px)`)
      this.overflowLeft -= this.leftMove_default
      this.showMenuBarArr(this.rightArr.nativeElement)
    }
  }

}
