// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { ServiceApi } from '../../apis/service.api';
var WxParse = require('../../wxParse/wxParse');

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
      var serviceapi = new ServiceApi();
      serviceapi.detail({ id: this.Base.options.id }, (info) => {

        info.content = that.Base.util.HtmlDecode(info.content);
        WxParse.wxParse('content', 'html', info.content, that, 10);
        wx.setNavigationBarTitle({
          title: info.title,
        })
        that.Base.setMyData({ info });
      });
    }
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onShow = content.onShow;
Page(body)