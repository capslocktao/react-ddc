/**
 * Created by haita on 2018/1/10 0010.
 */
import axios from 'axios';
import { Toast } from 'antd-mobile';
axios.interceptors.request.use((config)=>{
    Toast.loading("加载中",0);
    let xAuthToken = localStorage.getItem('xAuthToken');
    if(xAuthToken){
        config.headers['token'] = xAuthToken
    }else{

    }
    //携带token
    return config
});
axios.interceptors.response.use((config)=>{
    Toast.hide();
    console.log(config);
    if(config.data.flag === 'SESSION_INVALID'){
        console.log('失效');
        window.location.pathname="/login";
        return
    }

    //获取token,验证，跳转
    return config
})
