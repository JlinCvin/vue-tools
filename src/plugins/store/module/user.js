import {
	login,
	logout,
	getUserInfo,
	getPlatformLoginInfo,
	getPlatformInfo

} from '@/api/user'
import {setToken, getToken} from '@/libs/util'

export default {
	state: {
		userName: '',
		userId: '',
		avatarImgPath: '',
		token: getToken('token'),
		userToken: getToken('token'),
		tokenType: '',
		access: '',
		hasGetInfo: false,
		unreadCount: 0,
		userInfo: { // 当前用户信息
			name: '',
			mobile: ''
		},
		allianceInfo: {
			allianceName: '',
			isAuthenticate: '',
			allianceLogo: '',
			allianceId: '',
		},
		isSuperAlliance: '',
		customInfo: ''
	},
	mutations: {
		setRoleInfo(state, roleInfo) {
			state.roleInfo = roleInfo || {};
			window.localStorage.setItem('roleInfo', JSON.stringify(roleInfo));
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo || {};
			window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
		},
		setAllianceInfo(state, allianceInfo) {localStorage
			state.allianceInfo = allianceInfo || {};
			window.localStorage.setItem('allianceInfo', JSON.stringify(allianceInfo));
		},
		setIsSuperAlliance(state, isSuperAlliance) {
			state.isSuperAlliance = isSuperAlliance || '';
		},
		setCustomInfo(state, customInfo) {
			state.customInfo = customInfo || {};
			window.localStorage.setItem('customInfo', JSON.stringify(customInfo));
		},
		setAvatar(state, avatarPath) {
			state.avatarImgPath = avatarPath
		},
		setUserId(state, id) {
			state.userId = id
		},
		setUserName(state, name) {
			state.userName = name
		},
		setAccess(state, access) {
			state.access = access
		},
		setToken(state, token) {
			state.token = token;
			setToken(token,'token')
		},
		setTokenType(state, tokenType) {
			state.tokenType = tokenType;
		},
		setHasGetInfo(state, status) {
			state.hasGetInfo = status
		},

	},
	getters: {},
	actions: {
		// 登录
		handlerLogin({commit, dispatch}, {mobile, code}) {
			return new Promise((resolve, reject) => {
				login({
					mobile,
					code
				}).then(res => {
					if (res.state.code === 10200) {
						const data = res.data;
						if (data.menuArr){
							commit('setRoleInfo',data.menuArr);
						}
						commit('setUserInfo', data.user);
						commit('setAllianceInfo', data.alliance);
						commit('setToken', data.accessToken);
						commit('setIsSuperAlliance', data.alliance.isSuperAlliance);
					}
					resolve(res);
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 退出登录
		handleLogOut({state, commit}) {
			return new Promise((resolve, reject) => {
				// 退出登录
				logout().then((res) => {
					commit('setToken', '');
					commit('setAccess', []);
					resolve(res)
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 获取用户信息s
		getUserInfoData({commit}) {
			return new Promise((resolve, reject) => {
				getUserInfo().then(res => {
					if (res.state.code === 10200) {
						const data = res.data;
						if (data.menuArr){
							commit('setRoleInfo',data.menuArr);
						}
						commit('setUserInfo', data);
						commit('setUserName', data.name);
						commit('setAllianceInfo', {
							allianceName: data.allianceName,
							allianceId: data.allianceId,
							allianceLogo: data.allianceLogo || '',
							isAuthenticate: data.isAuthenticate,
							frameworkId: data.frameworkId,
							isSuperAlliance: data.isSuperAlliance,
							isAllianceMaster: data.isAllianceMaster,
              mobile: data.mobile,
              name: data.name,
              userId: data.userId
						});
						commit('setIsSuperAlliance', data.isSuperAlliance);
					}
					resolve(res);
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 获取未登陆时用户信息
		getPlatformLoginInfo({commit}, { key }) {
			return new Promise((resolve, reject) => {
				getPlatformLoginInfo({
					key
				}).then(res => {
					if (res.state.code === 10200) {
						const data = res.data;
						commit('setCustomInfo', {
							loginLogo: data.loginLogo.imageUrl || '',
							homeLogo: data.logo.imageUrl || '',
							loginBg: data.background.imageUrl || '',
							footerText: data.icon || ''
						});
					}else{
						commit('setCustomInfo', {
							loginLogo: '',
							homeLogo: '',
							loginBg: '',
							footerText: ''
						});
					}
					resolve(res);
				}).catch(err => {
					commit('setCustomInfo', {
						loginLogo: '',
						homeLogo: '',
						loginBg: '',
						footerText: ''
					});
					reject(err)
				})
			})
		},
		// 获取已登录用户的自定义信息
		getPlatformInfo({commit}) {
			return new Promise((resolve, reject) => {
				getPlatformInfo().then(res => {
					if (res.state.code === 10200) {
						const data = res.data;
						commit('setCustomInfo', {
							loginLogo: data.loginLogo.imageUrl || '',
							homeLogo: data.logo.imageUrl || '',
							loginBg: data.background.imageUrl || '',
							footerText: data.icon || ''
						});
					}else{
						commit('setCustomInfo', {
							loginLogo: '',
							homeLogo: '',
							loginBg: '',
							footerText: ''
						});
					}
					resolve(res);
				}).catch(err => {
					commit('setCustomInfo', {
						loginLogo: '',
						homeLogo: '',
						loginBg: '',
						footerText: ''
					});
					reject(err)
				})
			})
		}
	}
}
