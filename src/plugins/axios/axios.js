import axios from 'axios'
import router from '../router'
import { _tools } from "@/libs/tools";
import {getToken, setToken} from "@/libs/util";
import {MessageBox, Message } from 'element-ui';
let cancelToken = axios.CancelToken;

class HttpRequest {
	constructor(baseUrl = baseURL) {
		this.baseUrl = baseUrl;
		this.queue = {};
		this.requestArr = [];
		this.logoutStatus = false;
		this.neglectArr = ['/upload_base64_image/','/staff/uploads', '/alliance/orders/return_excel'];
		this.neglecttransKeyArr = ['/alliance/framework/upload', '/alliance/shop/upload_user', '/alliance/orders/return_excel',
			'/alliance/orders/jump_commission_excel', '/alliance/common/upload-project-file'];
	};
	removePending (config) {
		for(let p in this.requestArr){
			if(this.requestArr[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
				this.requestArr[p].f('取消请求'); //执行取消操作
				this.requestArr.splice(p, 1);
			}
		}
	};
	getInsideConfig() {
		const config = {
			baseURL: this.baseUrl,
			headers: {
				ContentType: 'application/json',
				Accept: 'application/json',
				Authorization: ''
			},
			timeout: 40000
		};
		return config
	};

	destroy(url) {
		delete this.queue[url]
		if (!Object.keys(this.queue).length) {
			return true;
		}
	};
	interceptors(instance, url) {
		// 请求拦截
		instance.interceptors.request.use(config => {
			config.headers.Authorization = 'Bearer ' + getToken('token');
			if (this.neglectArr.indexOf(config.url) !== -1) {
				this.removePending(config); //在一个axios发送前执行一下取消操作
				config.cancelToken = new cancelToken((c) => {
					// 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
					this.requestArr.push({ u: config.url + '&' + config.method, f: c });
				});
			}
			if(this.neglecttransKeyArr.indexOf(config.url) > -1) {
				return config;
			}
			config.params = _tools.transKeyName('underline', config.params);
			config.data = _tools.transKeyName('underline', config.data);
			this.queue[url] = true;
			return config;
		}, error => {
			return Promise.reject(error)
		});
		// 响应拦截
		instance.interceptors.response.use(response => {
			this.removePending(response.config);  //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
			let status = this.destroy(response.config.url.replace(/\/api\//, '\/'));
			response.data = _tools.transKeyName('camel', response.data);
			response.data.state = response.data.state || {code: false, msg: '服务器繁忙'};
			if (response.data.state.code == '10401') {
				if (router.currentRoute.name !== 'login' && !!!this.logoutStatus) {
					this.logoutStatus = true;
					MessageBox.confirm('当前登录已失效,请先登录', '请先登录', {
						confirmButtonText: '确定',
						type: 'warning',
						center: true,
						showClose: false,
						showCancelButton: false,
					}).then((res) => {
						setToken('', 'token');
						this.logoutStatus = false;
						router.replace({
							name: 'login',
						})
					}).catch((err) => {
						setToken('', 'token');
						this.logoutStatus = false;
						router.replace({
							name: 'login'
						});
					});
				}else{
					router.replace({
						name: 'login'
					});
				}
			};
			return response;
		}, error => {
			if(error.message === '取消请求') {
			}else{

			};
			return Promise.reject(error);
		});
	}

	request(options) {
		const instance = axios.create()
		options = Object.assign(this.getInsideConfig(), options);
		this.interceptors(instance, options.url);
		return instance(options)
	}
}

export default HttpRequest
