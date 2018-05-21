// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { LivemeetingApi } from '../../apis/livemeeting.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.setNavigationBarTitle({
      title: options.title,
    });

    this.Base.setMyData({ currenttab: 0 });
  }
  onShow() {
    var that = this;
    if (super.onShow() == true) {
      var livemeetingapi = new LivemeetingApi();
      livemeetingapi.allbycategory({category_id:this.Base.options.id}, (list) => {
        var latest=[];
        for(var i=0;i<list.length;i++){
          latest.push(list[i]);
        }
        latest.sort(function(a,b){
          return a.start_date>b.start_date?-1:1;
        });
        var hotest = list.sort(function (a, b) {
          return a.hotpoint > b.hotpoint ? -1 : 1;
        });
        that.Base.setMyData({ latest: latest, hotest: hotest });
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