'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){

    this.assign({
        title:"老司机网 | 快速承接广告，发布广告"
    });
    
    return this.display();
    

  }
  
  async loginAction(){
    let advertiserInfo = await this.session("advertiserInfo");
    if(advertiserInfo && advertiserInfo.id){
        return this.redirect('/adver/index');
    }
    
    this.assign({
        title:"广告商登陆"
    })
    return this.display("index/login");
    
  }
  
  async downloadAction(){
    this.assign({
        title:"APP下载"
    })
    return this.display("index/download");
    
  }
  
  async login2Action(){

    this.assign({
        title:"车主登陆"
    })
    return this.display("index/login2");
    
  }
  
  async signAction(){

    this.assign({
        title:"广告商注册"
    })
    return this.display("index/sign");
    
  }
  
  async sign2Action(){

    this.assign({
        title:"车主注册"
    })
    return this.display("index/sign2");
    
  }
  
  
}