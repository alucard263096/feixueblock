// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
import { LivemeetingApi } from '../../apis/livemeeting.api';
import { InstApi } from '../../apis/inst.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      inputShowed: false,
      inputVal: ""
    });
  }
  onShow() {
    var that = this;
    if (super.onShow() == true) {
      var instapi = new InstApi();
      instapi.searchkeyword({},(ret)=>{
        that.Base.setMyData({ history: ret.history, hotest: ret.hotest});
      });
      
    }
  }

  showInput() {
    this.Base.setMyData({
      inputShowed: true
    });
  }
  hideInput() {
    this.Base.setMyData({
      inputVal: "",
      inputShowed: false, searchresult: []
    });
  }
  clearInput() {
    this.Base.setMyData({
      inputVal: "", searchresult:[]
    });
    
  }
  inputTyping(e) {
    this.Base.setMyData({
      inputVal: e.detail.value
    });
  }
  search(){
    var inputVal = this.Base.getMyData().inputVal;
    var api=new LivemeetingApi();
    api.search({keyword:inputVal},(searchresult)=>{
      this.Base.setMyData({ searchresult});
    });
  }
  searchKeyword(e){
    var val=e.currentTarget.id;
    this.Base.setMyData({
      inputVal: val, inputShowed: true
    });
    this.search();
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onShow = content.onShow;
body.showInput = content.showInput;
body.hideInput = content.hideInput;
body.clearInput = content.clearInput; 
body.inputTyping = content.inputTyping; 
body.search = content.search;
body.searchKeyword = content.searchKeyword;
Page(body)