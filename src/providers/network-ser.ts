import {Injectable} from '@angular/core';
import {PopSer} from './pop-ser';
import {Network} from '@ionic-native/network';
import {Platform, ToastController} from 'ionic-angular';
import {Events} from 'ionic-angular';
/**
 * App网络监测服务
 */
@Injectable()
export class NetworkSer {

    constructor(public popser:PopSer,
                public toastCtrl:ToastController,
                public network:Network,
                public events:Events) {
        // console.log('Hello NetWork Provider');
        // this.test();

    }
    /**
     * 提示网络类型
     */
    checkNetwork() {
        this.popser.loadingDIY('show', '网络检测中...');
        setTimeout(() => {
            this.popser.loadingDIY('hide');
            this.showNetworkStatus();
        }, 1000);
    }
    /**
     * 网络类型
     * unknown, ethernet, wifi, 2g, 3g, 4g, cellular, none
     */
    showNetworkStatus() {
        if (this.network.type == 'unknown') {
            // this.popser.alert('This is a unknown network!');
        } else if (this.network.type == 'none') {
            // this.popser.alert('none network!');
            this.toastCtrl.create({
                message: '网络异常，不能连接到服务器',
                duration: 2000,
                position: 'top'
            }).present();
        } else {
            // this.popser.alert('当前网络类型：'+Network.type);
            this.toastCtrl.create({
                message: '当前网络类型：'+this.network.type,
                duration: 2000,
                position: 'top'
            }).present();
        }
    }

    isConnected:boolean=true;
    disconnectSubscription:any;
    connectSubscription:any;
    /**
     * 开启网络监测
     */
    startNetDetect() {
        // 断网检测 （当前网络断开时触发）
        this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
            this.isConnected=false;
            // this.popser.alert('网络断开了');
            this.events.publish('netError');
            this.toastCtrl.create({
                message: '网络断开了',
                duration: 2000,
                position: 'top'
            }).present();
        });
        // （停止断网检测）
        // disconnectSubscription.unsubscribe();

        // 联网检测  （当前网络变得可用时触发）
        this.connectSubscription = this.network.onConnect().subscribe(() => {
            // console.log('network connected!');
            this.isConnected=true;
            setTimeout(() => {
                this.events.publish('netError');
                this.showNetworkStatus();
            }, 1000);
        });
        // （停止联网检测）
        // connectSubscription.unsubscribe();
    }
    /**
     * 关闭网络监测
     */
    stopNetDetect(){
        this.disconnectSubscription.unsubscribe();
        this.connectSubscription.unsubscribe();
    }

    test(){

        setTimeout(() => {
            this.isConnected=!this.isConnected;
            this.events.publish('alerted11');
        }, 5000);
    }


}
