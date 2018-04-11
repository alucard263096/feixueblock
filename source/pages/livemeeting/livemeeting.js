// pages/content/content.js
import { AppBase } from "../../app/AppBase";
import { ApiConfig } from "../../apis/apiconfig";
var WxParse = require('../../wxParse/wxParse');
import { LivemeetingApi } from '../../apis/livemeeting.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    //options.id=1;
    if(options.id==undefined){
      options.id=1;
    }
    this.Base.Page = this;
    super.onLoad(options);
    this.Base.setMyData({ currenttab: 0, currentrtmp: 0, comments: [], infullscreen: false, currentrtmpurl:"" });
    var that=this;


    setInterval(function () {
      var comments = that.Base.getMyData().comments;
      var comment_time_from = "1970-1-1";
      if (comments.length > 0) {
        comment_time_from = comments[0].comment_time;
        comment_time_from = comment_time_from + ".1";
      }
      console.log(comment_time_from);
      var liveapi = new LivemeetingApi();
      liveapi.commentlist({ comment_time_from: comment_time_from, livemeeting_id: that.Base.options.id }, (ret) => {
        if (ret.commentlist.length > 0) {
          var n = ret.commentlist.concat(comments);
          if (n.length > 255) {
            n = n.slice(0, 255);
          }
          that.Base.setMyData({ comments: n });
        }
        that.Base.setMyData({ viewcount: ret.viewcount, upcount: ret.upcount, commentcount: ret.commentcount, });
      }, false);
    }, 2000);
  }
  onShow() {
    var that = this;
    super.onShow();
    var liveapi = new LivemeetingApi();
    liveapi.info({id:this.Base.options.id},(ret)=>{
      this.Base.setMyData({info:ret});
      wx.setNavigationBarTitle({
        title: ret.title
      });
      liveplayer=wx.createLivePlayerContext("liveplayer", this);
      var currentrtmpurl = that.Base.getMyData().currentrtmpurl;
      if (ret.rtmps.length>0&&currentrtmpurl==""){
        this.Base.setMyData({ currentrtmpurl: ret.rtmps[0] });
      }
    });
  }
  changeCurrentTab(e){
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
  }
  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id});
  }
  focusus(){
   /* var info=this.Base.getMyData().info;
    wx.navigateTo({
      url: '../webview/webview?url='+JSON.stringify(info.flowurl),
    })*/
  }
  sendComment(e){
    console.log(e);
    if(e.detail.value.comment.trim()==""){
      wx.showToast({
        title: '不能发空消息',
      })
      return;
    } 
    var comment = e.detail.value.comment.trim();
    this.Base.setMyData({ comment: "" });
    var liveapi = new LivemeetingApi();
    liveapi.comment({ livemeeting_id: this.Base.options.id, comment: comment }, (ret) => {
      if(ret.code==0){
        wx.showToast({
          title: '发送成功'
        })
      }
    });
  }
  changeCurrentrtmp(e){
    this.Base.setMyData({ currentrtmp: e.detail.current });
  }
  sendNotify(e){
    var formid = e.detail.formId;
    var liveapi = new LivemeetingApi();
    liveapi.sendnotify({ livemeeting_id: this.Base.options.id, formid: formid }, (ret) => {
      if(ret.code==0){
        var info = this.Base.getMyData().info;
        info.notifyme = true;
        this.Base.setMyData({ info: info });
      }
    });
  }
  onHide(){
    this.Base.setMyData({ info: null });
  }
  onShareAppMessage(options){
    var data=this.Base.getMyData();
    var info=data.info;
    return {
      title: info.title,
      imageUrl: data.uploadpath + "livemeeting/" + info.sharecover,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
  upThis(){
    var data = this.Base.getMyData();
    var info = data.info;
    if(info.uped==true){
      return;
    }
    info.uped=true;
    
    this.Base.setMyData({info:info});
    var liveapi = new LivemeetingApi();
    liveapi.up({ livemeeting_id: this.Base.options.id}, (ret) => {
      
    },false);
  }
  changeToFullScreen(){
    liveplayer.requestFullScreen({ direction: 90 });
  }
  playLive(e){
    var id=Number(e.currentTarget.id);
    console.log(id);
    var currentrtmpurl = this.Base.getMyData().info.rtmps[id];

    this.Base.setMyData({ currentrtmp: id, currentrtmpurl: currentrtmpurl });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onShow = content.onShow; 
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab; 
body.gotoFlowurl = content.gotoFlowurl; 
body.sendComment = content.sendComment;
body.changeCurrentrtmp = content.changeCurrentrtmp; 
body.sendNotify = content.sendNotify; 
body.focusus = content.focusus; 
body.changeToFullScreen = content.changeToFullScreen;
body.playLive = content.playLive;

var liveplayer=null;
//打开这个隐藏就会听不见
//body.onHide = content.onHide;
body.onShareAppMessage = content.onShareAppMessage;
body.upThis = content.upThis;
Page(body)