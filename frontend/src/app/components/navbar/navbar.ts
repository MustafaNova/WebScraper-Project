import { Component, ViewChild, Renderer2, ElementRef, OnInit } from '@angular/core';
import { DomUtils } from '../../services/dom-utils';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  constructor(
    private renderer: Renderer2,
    private domUtils: DomUtils,
    private bp: BreakpointObserver
  ) {}
  
  // elements
  @ViewChild("menubar") menubar!: ElementRef
  @ViewChild("leftArr") leftArr!: ElementRef
  @ViewChild("rightArr") rightArr!: ElementRef
  @ViewChild("outermenubar") outermenubar!: ElementRef
  @ViewChild("NB_menubar") NB_menubar!: ElementRef
  @ViewChild("NB_menuBtn") NB_menuBtn!: ElementRef
  @ViewChild("secondLayer") secondLayer!: ElementRef
  @ViewChild("navBar_searchbar") navBar_searchbar!: ElementRef
  @ViewChild("firstLayer") firstLayer!: ElementRef
  @ViewChild("cube_container") cube_container!: ElementRef


  overflowLeft = 0
  leftMove_default = 160

  ngOnInit(){

    this.bp.observe("(max-width: 830px)")
    .subscribe(res => {
      switch(res.matches){
        case true: 
        [this.NB_menubar.nativeElement,this.NB_menuBtn.nativeElement].forEach(el => this.renderer.addClass(el, "d-none"))
        this.renderer.appendChild(this.secondLayer.nativeElement, this.navBar_searchbar.nativeElement)
        break
        
        case false:
        [this.NB_menubar.nativeElement,this.NB_menuBtn.nativeElement].forEach(el => this.renderer.removeClass(el, "d-none"))
        this.renderer.insertBefore(this.firstLayer.nativeElement, this.navBar_searchbar.nativeElement, this.cube_container.nativeElement)
        break
      }

    })

  }


  showMenuBarArr(arrowRef: ElementRef){
    const arrow = arrowRef.nativeElement
    this.domUtils.removeClasses(arrow, ["unvisible", "noPointer"], this.renderer)
    this.domUtils.addClasses(arrow, "visible", this.renderer)  
    this.renderer.removeClass(arrow,"unvisible")  
    this.renderer.removeClass(arrow,"noPointer")  
    this.renderer.addClass(arrow,"visible")
  }
  hideMenuBarArr(arrowRef: ElementRef){
    const arrow = arrowRef.nativeElement
    this.renderer.removeClass(arrow, "visible")
    this.domUtils.addClasses(arrow, ["unvisible", "noPointer"], this.renderer)  
  }


  // click on left arrow of menubar
  moveMenubarRight(){

    this.renderer.removeClass(this.menubar.nativeElement,"moveBarLeft")
    if (this.overflowLeft<=this.leftMove_default){

      this.renderer.setStyle(this.menubar.nativeElement, "transform", "translateX(0px)")
      this.overflowLeft = 0
      this.showMenuBarArr(this.rightArr)
      this.hideMenuBarArr(this.leftArr)
    }

    else{

      const nextTf = this.overflowLeft - this.leftMove_default  //decreasing the negative translateX
      this.renderer.setStyle(this.menubar.nativeElement, "transform", `translateX(-${nextTf}px)`)
      this.overflowLeft -= this.leftMove_default
      this.showMenuBarArr(this.rightArr)
    }
  }



  moveMenubarLeft(){

    // overflow calculation
    const outermenubarWidth = this.outermenubar.nativeElement.clientWidth
    const menubarWidth = 1292
    const overflow = menubarWidth - outermenubarWidth - this.overflowLeft
  
    // reset
    this.renderer.removeClass(this.menubar.nativeElement, "moveBarRight")
    this.renderer.setStyle(this.menubar.nativeElement, "transform", "")

    if (overflow <= this.leftMove_default){
      this.renderer.setStyle(this.menubar.nativeElement, "transform", `translateX(-${this.overflowLeft + overflow}px)`)
      this.overflowLeft += overflow
      this.showMenuBarArr(this.leftArr)
      this.hideMenuBarArr(this.rightArr)

    }
    else{
      this.renderer.setStyle(this.menubar.nativeElement, "transform", `translateX(-${this.overflowLeft + this.leftMove_default}px)`)
      this.overflowLeft+= this.leftMove_default
      this.showMenuBarArr(this.leftArr)
    }
     
  }








}
 