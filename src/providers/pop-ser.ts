import {Injectable} from '@angular/core';
import { LoadingController, AlertController, ModalController} from 'ionic-angular';

/**
 * App弹窗服务
 */
@Injectable()
export class PopSer {
    private load:any;
    private loadDIY:any;

    constructor(
                public loadingCtrl:LoadingController,
                public alertCtrl:AlertController,
                public modalCtrl:ModalController) {
        // console.log('Hello PopSer Provider');
    }
    /**
     * alert弹窗---感叹号，一个按钮
     */
    alert(content, callback = ()=> {},noCenter?) {
        let css:string;
       if(noCenter===true){
           css='no-center';
       }
       else{
           css='';
       }
        let alert = this.alertCtrl.create({
            title: '<div class="text-center"><div class="warm_tip text-center"><img src="assets/img/warm.png" class="img"/></div></div>',
            message: '<div class="oT_content"><div class="p_tip">'+content+'</div></div>',
            enableBackdropDismiss:false,
            cssClass:css,
            buttons: [
                {
                    text: "好的",
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (callback != undefined && callback != null && typeof callback == 'function') {
                            callback();
                        }
                    }
                }]
        });
        alert.present();
    }
    /**
     * confirm确认框--感叹号，两个按钮
     */
    confirm(content, ok_callback = ()=> {}) {
        let alert = this.alertCtrl.create({
            title: '<div class="text-center"><div class="warm_tip text-center"><img src="assets/img/warm.png" class="img"/></div></div>',
            message: '<div class="oT_content"><div class="p_tip">'+content+'</div></div>',
            enableBackdropDismiss:false,
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                },
                {
                    text: '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        alert.present();
    }

    /**
     * 自定义alert弹窗---图片凸出
     */
    alertDIY(obj,  ok_callback:any = ()=> {}) {
        let confirm_diy = this.alertCtrl.create({
            title: obj.title ||  '<div class="content_img"><img  src="assets/img/use_over.png" class="img"/></div>',
            subTitle:obj.subTitle,
            cssClass:obj.cssClass,  //如果有单行字，样式为Convex且message为空，否则为ConvexOut
            message: obj.content,
            enableBackdropDismiss:false,
            buttons: [
                {
                    text: obj.okText || '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }
    /**
     * 自定义confirm确认框
     */
    confirmDIY(obj, esc_callback:any = ()=> {}, ok_callback:any = ()=> {}) {
        let confirm_diy = this.alertCtrl.create({
            title: obj.title ||'<div class="content_img"><img  src="assets/img/use_over.png" class="img"/></div>',
            subTitle:obj.subTitle ,
            cssClass:"call",
            message: '<div>'+obj.content+'</div>' ,
            enableBackdropDismiss:false,
            buttons: [
                {
                    text: obj.escText || '取消',
                    handler: () => {
                        if (esc_callback != undefined && esc_callback != null && typeof esc_callback == 'function') {
                            esc_callback();
                        }
                    }
                },
                {
                    text: obj.okText || '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }

    /**
     * 拨打号码弹窗
     */
    callPop(obj, esc_callback:any = ()=> {}, ok_callback:any = ()=> {}) {
        setTimeout(()=> {//延迟几秒可以等html反应，这样获取的高度才准确
            let test=document.getElementsByClassName("pop_btn")[0];
            test.innerHTML="<a href='tel:"+obj.tel+"'> 继续呼叫 </a>";
        }, 3);
        let confirm_diy = this.alertCtrl.create({
            title: obj.title ||'<div class="content_img"><img  src="assets/img/use_over.png" class="img"/></div>',
            subTitle:obj.subTitle ,
            cssClass:"call",
            message: '<div>'+obj.content+'</div>' ,
            enableBackdropDismiss:false,
            buttons: [
                {
                    text: obj.escText || '取消',
                    handler: () => {
                        if (esc_callback != undefined && esc_callback != null && typeof esc_callback == 'function') {
                            esc_callback();
                        }
                    }
                },
                {
                    text: obj.okText || '确定',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }
    /**
     * 版本更新确认框  （两个按钮，非强制更新）
     */
    update(obj, esc_callback:any = ()=> {}, ok_callback:any = ()=> {}) {
        let confirm_diy = this.alertCtrl.create({
            title:  '<div class="setup_img"><img  src="assets/img/setup.png" class="img"/><p class="content">'+obj.appVersionNumber+'版本更新</p></div>',
            subTitle:obj.subTitle  || '更新内容',
            cssClass:"update",
            message: '<ul>'+obj.content+'</ul>' ,
            enableBackdropDismiss:false,
            buttons: [
                {
                    text: obj.escText || '暂不更新',
                    handler: () => {
                        if (esc_callback != undefined && esc_callback != null && typeof esc_callback == 'function') {
                            esc_callback();
                        }
                    }
                },
                {
                    text: obj.okText || '立即更新',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }


    /**
     * 版本更新确认框  (一个按钮，强制更新)
     */
    update_forceUpgrade(obj,ok_callback:any = ()=> {}) {
        let confirm_diy = this.alertCtrl.create({
            title:  '<div class="setup_img"><img  src="assets/img/setup.png" class="img"/><p class="content">'+obj.appVersionNumber+'版本更新</p></div>',
            subTitle:obj.subTitle  || '更新内容',
            cssClass:"update",
            message: '<ul>'+obj.content+'</ul>' ,
            enableBackdropDismiss:false,
            buttons: [
                {
                    text: obj.okText || '立即更新',
                    cssClass: 'pop_btn',
                    handler: () => {
                        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
                            ok_callback();
                        }
                    }
                }
            ]
        });
        confirm_diy.present();
    }

    /**
     * 默认加载动画
     */
    loading(op){
        if(op=='hide'){
            if(this.load){
                this.load.dismiss();
            }
        }else {
            this.load=this.loadingCtrl.create({
                content: 'Please wait...'
            });
            this.load.present();
            setTimeout(() => {
                this.load.dismiss();
            }, 10000);  
        }
    }
    /**
     * 自定义加载
     */
    loadingDIY(op,content:any='',css?:any) {
        if(op=='hide'){
            if(this.loadDIY){
                this.loadDIY.dismiss();
            }
        }else {
            this.loadDIY=this.loadingCtrl.create({
                spinner: 'hide',
                // showBackdrop:false,
                cssClass:css||'',
                // dismissOnPageChange:false,
                content:content || 'Please wait...',
            });
            this.loadDIY.present();
            // setTimeout(() => {
            //     this.loadDIY.dismiss();
            // }, 10000);
        }
        // this.loadDIY.onDidDismiss(() => {
        //     console.log('Dismissed loading');
        // });
    }

    /**
     * 努力加载中页面
     */
    loadOn(op) {
        if(op===true){
            if(this.loadDIY){
                this.loadDIY.dismiss();
            }
        }else {
            this.loadDIY=this.loadingCtrl.create({
                spinner: 'hide',
                cssClass:"load_on",
                content: `  <img src="./assets/img/loading.gif" class="load-gif"/>
                            <div class="load_text">努力加载中<i class="dot"></i></div> `
            });
            this.loadDIY.present();
            /*setTimeout(() => {
                this.loadDIY.dismiss();
            }, 100);*/
        }
        // this.loadDIY.onDidDismiss(() => {
        //     // console.log('Dismissed loading');
        // });
    }




}
