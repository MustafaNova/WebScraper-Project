
export class EvtManager{

  static ready = import("./listenerRegistration.js")


  // original elements, functions will be added here
  // look at listenerRegistration.js
  static menuListeners = {}



  static build(listener, wrappedHandler){
    if ("elements" in listener){

      listener.elements.forEach(elem => {
        elem.addEventListener(listener.type, wrappedHandler)
      })
      
    }
    else{
      listener.element.addEventListener(listener.type,wrappedHandler)
    }
  }

  
  // building listeners with no flag
  static defaultBuilding(listener){

    // save original function to remove listener later
    const wrappedHandler = () => { listener.handler(...(listener.params || [])) }
    listener.wrappedhandler = wrappedHandler

    this.build(listener, wrappedHandler)
    
  }


  // include event object as param 
  static includeEventBuilding(listener){

    // save original function to remove listener later
    const wrappedHandler = (e) => { listener.handler(e,...(listener.params || [])) }
    listener.wrappedhandler = wrappedHandler

    this.build(listener, wrappedHandler)

  }


  // every element building with the matching param. only one param per element
  // this flag only occurs for elements, not possible for element
  static paramPerElemBuilding(listener){
    listener.wrappedhandler = []  // save functions to remove them later

    listener.elements.forEach((elem,index) => {

      const wrappedHandler = (e) => listener.handler(listener.params[index])
      listener.wrappedhandler.push(wrappedHandler)
      elem.addEventListener(listener.type, wrappedHandler)
    })



  }

  // builds mutation observer
  static observerBuilding(listener){

    const wrappedHandler = () => { listener.handler(...(listener.params || [])) }
    const observer = new MutationObserver(wrappedHandler)
    listener.curObserver = observer
    observer.observe(listener.element, listener.param[0])

  }


  // add listeners
  static async attachListener(id){
    await this.ready  // wait for completion of listenerRegistration
    this.menuListeners[id].forEach(this.buildListener.bind(this))

  }


  // 1 listener can be attached by given list id and index of it
  // detachOneListener function have to create, if using this
  static attachOneListener(id, index){
    const listener = this.menuListeners[id][index]
    this.buildListener(listener)
  }



  // removes eventlistener which have no flag
  static defaultDetach(listener){
    if ("elements" in listener){
      listener["elements"].forEach(elem => {
        elem.removeEventListener(listener.type,listener.wrappedhandler)
      })     
    }
    else{
      listener.element.removeEventListener(listener.type,listener.wrappedhandler)
    }

  }

  static buildListener(listener){
    switch(listener.flag){
        case "useParamPerElement":
          this.paramPerElemBuilding(listener)
          break
        
        case "includeEvent":
          this.includeEventBuilding(listener)
          break
        
        case "observer":
          this.observerBuilding(listener)
          break
        
        default:
          this.defaultBuilding(listener)
    }
  }

  static paramPerElemDetach(listener){
    listener.elements.forEach((elem,index) => {
      elem.removeEventListener(listener.type, listener.wrappedhandler[index])
    })
  }

  static observerDetach(listener){
    listener.curObserver.disconnect()
  }

  // remove listeners of closing menu
  static detachListener(menu){

    if (!(menu in this.menuListeners)){
      return
    }

    this.menuListeners[menu].forEach(listener=>{

      switch(listener.flag){
        case "useParamPerElement":
          this.paramPerElemDetach(listener)
          break
        
        case "observer":
          this.observerDetach(listener)
          break
        
        default:
          this.defaultDetach(listener)
      }
      
    })

    
  }



}


