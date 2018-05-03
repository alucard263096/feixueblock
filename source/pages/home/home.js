// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import {InstApi} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({ currenttab: 1});


  }
  onShow() {
    var that = this;
    if (that.Base.SuperShowed!=true){
      super.onShow();
    }
    if (that.Base.SuperShowed==true){
      var instapi=new InstApi();
      instapi.indexbanner({},(bannerlist)=>{
        that.Base.setMyData({bannerlist});
      }); 
      instapi.categories({}, (categories) => {
        that.Base.setMyData({ categories });
      });
      instapi.recommlivemeeting({}, (recommlivemeeting) => {
        that.Base.setMyData({ recommlivemeeting });
      });
    }
  }
  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
  }
  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onShow = content.onShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
Page(body)