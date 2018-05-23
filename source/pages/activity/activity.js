// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { ActivityApi } from '../../apis/activity.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    super.onLoad(options);
  }
  onShow() {
    var that = this;
    if (super.onShow() == true) {
      var api = new ActivityApi();
      api.info({id:this.Base.options.id}, (info) => {
        this.Base.setMyData(info);
      });
    }
  }
  gotoBuy(){
    var id=this.Base.getMyData().id;
    wx.navigateTo({
      url: '/pages/activitybuyticket/activitybuyticket?id='+id,
    })
  }

  onShareAppMessage(options) {
    var data = this.Base.getMyData();
    return {
      title: data.title,
      imageUrl: data.uploadpath + "activity/" + data.cover,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onShow = content.onShow; 
body.gotoBuy = content.gotoBuy;
body.onShareAppMessage = content.onShareAppMessage;
Page(body)