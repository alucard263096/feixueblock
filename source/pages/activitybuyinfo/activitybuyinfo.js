// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { ActivityApi } from '../../apis/activity.api';
import { MemberApi } from "../../apis/member.api";

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
      api.info({ id: this.Base.options.activity_id }, (info) => {
        this.Base.setMyData(info);
      });
      var memberApi = new MemberApi();
      memberApi.info({}, (memberinfo) => {
        if (memberinfo != null) {
          this.Base.setMyData({ memberinfo: memberinfo });
        }
      });
    }
  }
  submitForm(e){
    console.log(e);
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onShow = content.onShow;
body.submitForm = content.submitForm;
Page(body)