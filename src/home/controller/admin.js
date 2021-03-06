'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    //return this.success(this.http.header())
    let adminInfo = await this.session("adminInfo");
    if(!adminInfo || !adminInfo.id){
        this.assign({
            title:"未登陆!",
        }) 
        return this.display('index/index')
    }

    this.assign({
        title:"老司机网 | 后台管理",
        adminInfo:adminInfo,
    })
    
    let model = this.model("ad_to_audit");
    let data = await model.where({}).count();
    
    model = this.model("advertiser_login_record");
    let numberOfAdver = await model.getToday();
    
    model = this.model("income_and_expense");
    let income = await model.getToday();
    let incomeMoney = 0;
    income.forEach(function(item,index){
        incomeMoney += new Number(item.amount);
    })
    
    //return this.success(incomeMoney);
    
    this.assign({
        numberOfAd : data,
        numberOfAdver:numberOfAdver.length,
        numberOfIncome:incomeMoney,
    })
    return this.display();
  }
  
  
  async loginAction(){
    let adminInfo = await this.session("adminInfo");
    if(!adminInfo || !adminInfo.admin_id){
        this.assign({
            title:"管理员登陆",
        })
        return this.display("admin/login");
    } 
    
    this.assign({
        title:'欢迎'
    })
    
    return this.redirect("/admin/index");


    
  }
  
  async showAction(){
      let data = await this.session("token");
      //let data = this.http.headers;
      this.success(data);
  }
  
  async reviewAction(){
    let adminInfo = await this.session("adminInfo");
    if(!adminInfo || !adminInfo.admin_id){
        this.assign({
            title:"广告审核",
        });
        
        let page = this.get("page") || 1;
        
        let model = this.model("ad_to_audit");
        let data = await model.getByPage(page);
        this.assign({
            all:data,
        });
        
        //return this.success(data);
        
        
        return this.display();
    } 
    
    this.assign({
        title:'您尚未登录!'
    });
    return this.redirect("/index/index");
  }
  
  async moneyAction(){
    let adminInfo = await this.session("adminInfo");
    if(!adminInfo || !adminInfo.admin_id){
        this.assign({
            title:"进账管理",
        });
        let page = this.get("page") || 1;
        
        let model = this.model("income_and_expense");
        let data = await model.getByPage(page);
        this.assign({
            all:data,
        });
        //return this.success(data);
        return this.display();
    } 
    
    this.assign({
        title:'您尚未登录!'
    });
    return this.redirect("/index/index");
  }
  
  
}