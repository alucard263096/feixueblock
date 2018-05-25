// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { ActivityApi } from '../../apis/activity.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    options.id = 1;
    this.Base.Page = this;
    super.onLoad(options);
    
    wx.hideShareMenu({
      
    })
  }
  onShow() {
    var that = this;
    if (super.onShow() == true) {
      var api=new ActivityApi();
      api.ticketorder({id:this.Base.options.order_id},(info)=>{
        this.Base.setMyData(info);
      });
    }
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onShow = content.onShow;
body.gotoBuy = content.gotoBuy;
body.onShareAppMessage = content.onShareAppMessage;
body.selectTicket = content.selectTicket;
body.updateBuycount = content.updateBuycount;
body.countamount = content.countamount;
body.gotoInfo = content.gotoInfo;
Page(body)