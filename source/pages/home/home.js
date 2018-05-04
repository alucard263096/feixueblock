// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { LivemeetingApi } from '../../apis/livemeeting.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);

    this.Base.setMyData({ currenttab: 4});


  }
  onShow() {
    var that = this;
    if (super.onShow()==true){
      that.loaddata();
    }
  }
  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
    this.loaddata();
  }
  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id });
    this.loaddata();
  }
  loaddata(){
    console.log(this.Base.getMyData().currenttab);
    switch (this.Base.getMyData().currenttab) {
      case 0: break;
      case 1: this.load1(); break;
      case 2: this.load2(); break;
      case 3: this.load3(); break;
      case 4: this.load4(); break;
    }
  }
  load1(){
    var that=this;
    var instapi = new InstApi();
    instapi.indexbanner({}, (bannerlist) => {
      that.Base.setMyData({ bannerlist });
    });
    instapi.categories({}, (categories) => {
      that.Base.setMyData({ categories });
    });
    instapi.recommlivemeeting({}, (recommlivemeeting) => {
      that.Base.setMyData({ recommlivemeeting });
    });
  }

  load2() {
    var that = this;
    var api = new LivemeetingApi();
    api.alldonebydate({}, (alldonebydate)=>{
      this.Base.setMyData({ alldonebydate});
    });
  }
  load3() {
    var that = this;
    var api = new LivemeetingApi();
    api.hotrank({}, (hotrank) => {
      this.Base.setMyData({ hotrank });
    });
  }
  load4() {
    var that = this;
    var instapi = new InstApi();
    instapi.categories({}, (categories) => {
      that.Base.setMyData({ categories });
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onShow = content.onShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;
body.load1 = content.load1;
body.load2 = content.load2;
body.load3 = content.load3;
body.load4 = content.load4;
body.loaddata = content.loaddata;
Page(body)