import Main from '@/components/Main'
import MainView from '@/view/Common/MainView'
/**
 * meta: {
 *  title: { String|Number|Function }
 *         标签栏的文字 可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在菜单栏
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 * }
 */

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录',
        },
        component: () => import('@/view/Login/Login.vue')
    },
    {
        path: '/',
        redirect: {
            name: 'home'
        },
        component: Main,
        name: 'main',
        meta: {
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                },
                component: () => import('@/view/Home/Home'),
            },
            {
                path: '/Organization/:name',
                name: 'Organization',
                meta: {
                    title: '组织架构',
                },
                component: () => import('@/view/Organization'),
            },
            {
                path: 'RankingList',
                meta: {
                    title: '排行数据',
                },
                component: MainView,
                children: [
                    {
                        path: '/RankingList/StoreRankingList',
                        name: 'StoreRankingList',
                        meta: {
                            title: '门店排行',
                        },
                        component: () => import('@/view/RankingList/StoreRankingList')
                    },
                    {
                        path: '/RankingList/BuildingRankingList',
                        name: 'BuildingRankingList',
                        meta: {
                            title: '楼盘排行榜',
                        },
                        component: () => import('@/view/RankingList/BuildingRankingList')
                    },
                    {
                        path: '/RankingList/RankingOrderList',
                        name: 'RankingOrderList',
                        meta: {
                            title: '新房订单',
                        },
                        component: () => import('@/view/RankingList/RankingOrderList')
                    }
                ]
            },
            {
                path: '/Order',
                meta: {
                    title: '订单管理',
                },
                name: 'Order',
                redirect: {
                    name: 'OrderList'
                },
                component: MainView,
                children: [
                    {
                        path: '/Order/OrderList',
                        name: 'OrderList',
                        meta: {
                            title: '订单列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Order/OrderList')
                    },
                    {
                        path: '/Order/OrderDetail/:id',
                        name: 'OrderDetail',
                        meta: {
                            title: '订单详情'
                        },
                        component: () => import('@/view/Order/OrderDetail')
                    },
                ]
            },
            {
                path: '/Building',
                meta: {
                    title: '楼盘管理',
                },
                name: 'Building',
                redirect: {
                    name: 'BuildingList'
                },
                component: MainView,
                children: [
                    {
                        path: '/Building/BuildingList',
                        name: 'BuildingList',
                        meta: {
                            title: '楼盘列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Building/BuildingList')
                    },
                    {
                        path: '/Building/BuildingDetail/:id',
                        name: 'BuildingDetail',
                        meta: {
                            title: '楼盘详情'
                        },
                        props: true,
                        component: () => import('@/view/Building/BuildingDetail')
                    },
                    {
                        path: '/Building/AddBuilding',
                        name: 'AddBuilding',
                        meta: {
                            title: '上架盘源'
                        },
                        component: () => import('@/view/Building/AddBuilding')
                    },
                ]
            },
            {
                path: '/CommissionPolicy',
                meta: {
                    title: '佣金政策审核列表',
                },
                name: 'CommissionPolicy',
                redirect: {
                    name: 'CommissionPolicyList'
                },
                component: MainView,
                children: [
                    {
                        path: '/CommissionPolicy/CommissionPolicyList',
                        name: 'CommissionPolicyList',
                        meta: {
                            title: '佣金政策审核列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Commission/CommissionPolicy/CommissionPolicyList'),
                    },
                    {
                        path: '/CommissionPolicy/CommissionPolicyDetail/:id',
                        name: 'CommissionPolicyDetail',
                        meta: {
                            title: '佣金政策详情'
                        },
                        component: () => import('@/view/Commission/CommissionPolicy/CommissionPolicyDetail')
                    }
                ]
            },
            {
                path: '/KnotCommission',
                meta: {
                    title: '结佣列表',
                },
                name: 'KnotCommission',
                redirect: {
                    name: 'KnotCommissionList'
                },
                component: MainView,
                children: [
                    {
                        path: '/KnotCommission/KnotCommissionList',
                        name: 'KnotCommissionList',
                        meta: {
                            title: '结佣列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Commission/KnotCommission/KnotCommissionList'),
                    },
                    {
                        path: '/KnotCommission/KnotCommissionDetail/:id',
                        name: 'KnotCommissionDetail',
                        meta: {
                            title: '结佣详情'
                        },
                        component: () => import('@/view/Commission/KnotCommission/KnotCommissionDetail')
                    }
                ]
            },
            {
                path: '/TaxSource',
                meta: {
                    title: '灵活用工',
                },
                name: 'TaxSource',
                redirect: {
                    name: 'Contracted'
                },
                component: MainView,
                children: [
                    {
                        path: '/TaxSource/Contracted',
                        name: 'Contracted',
                        meta: {
                            title: '税源地管理',
                        },
                        component: () => import('@/view/TaxSource/Contracted'),
                    },
                    {
                        path: '/TaxSource/Management',
                        name: 'Management',
                        meta: {
                            title: '签约人员'
                        },
                        component: () => import('@/view/TaxSource/Management')
                    }
                ]
            },
            {
                path: '/Withdraw',
                meta: {
                    title: '提现管理',
                },
                name: 'Withdraw',
                redirect: {
                    name: 'WithdrawList'
                },
                component: MainView,
                children: [
                    {
                        path: '/Withdraw/WithdrawList',
                        name: 'WithdrawList',
                        meta: {
                            title: '提现管理',
                            isHidden: true,
                        },
                        component: () => import('@/view/Withdraw/WithdrawList'),
                    },
                    {
                        path: '/Withdraw/WithdrawDetail/:id',
                        name: 'WithdrawDetail',
                        meta: {
                            title: '提现详情'
                        },
                        component: () => import('@/view/Withdraw/WithdrawDetail')
                    }
                ]
            },
            {
                path: '/JumpCommission',
                meta: {
                    title: '跳点佣管理',
                },
                name: 'JumpCommission',
                redirect: {
                    name: 'JumpCommissionList'
                },
                component: MainView,
                children: [
                    {
                        path: '/JumpCommission/JumpCommissionList',
                        name: 'JumpCommissionList',
                        meta: {
                            title: '跳点佣列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Commission/JumpCommission/JumpCommissionList'),
                    }
                ]
            },
            {
                path: '/ReturnedMoney',
                meta: {
                    title: '回款管理',
                },
                name: 'ReturnedMoney',
                redirect: {
                    name: 'ReturnedMoneyList'
                },
                component: MainView,
                children: [
                    {
                        path: '/ReturnedMoney/ReturnedMoneyList',
                        name: 'ReturnedMoneyList',
                        meta: {
                            title: '回款列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/ReturnedMoney/ReturnedMoneyList'),
                    },
                    {
                        path: '/ReturnedMoney/ReturnedMoneyDetail/:id',
                        name: 'ReturnedMoneyDetail',
                        meta: {
                            title: '回款详情'
                        },
                        component: () => import('@/view/ReturnedMoney/ReturnedMoneyDetail')
                    }
                ]
            },
            {
                path: '/UnReturnedCommissionsMoney',
                meta: {
                    title: '垫佣未回款管理',
                },
                name: 'UnReturnedCommissionsMoney',
                redirect: {
                    name: 'UnReturnedComMoneyList'
                },
                component: MainView,
                children: [
                    {
                        path: '/UnReturnedCommissionsMoney/UnReturnedComMoneyList',
                        name: 'UnReturnedComMoneyList',
                        meta: {
                            title: '垫佣未回款管理',
                            isHidden: true,
                        },
                        component: () => import('@/view/UnReturnedCommissionsMoney/UnReturnedComMoneyList'),
                    },
                    {
                        path: '/UnReturnedCommissionsMoney/UnReturnedCommissionsDetail/:commissionId',
                        name: 'UnReturnedCommissionsDetail',
                        meta: {
                            title: '垫佣详情',
                        },
                        component: () => import('@/view/UnReturnedCommissionsMoney/UnReturnedCommissionsDetail'),
                        // children:[
                        //     {
                        //         path: '/UnReturnedCommissionsMoney/UnReturnedCommissionsDetail/:commissionId',
                        //         name: 'UnReturnedCommissionsDetail',
                        //         meta: {
                        //             title: '垫佣详情',
                        //             isHidden: true,
                        //         },
                        //         component: () => import('@/view/UnReturnedCommissionsMoney/UnReturnedCommissionsDetail'),
                        //     },
                        //     {
                        //         path: '/UnReturnedCommissionsMoney/UnReturnedCommissionsDetail/OrderDetail/:id',
                        //         name: 'UnReturnedComOrderDetail',
                        //         meta: {
                        //             title: '订单详情'
                        //         },
                        //         component: () => import('@/view/Order/OrderDetail')
                        //     },
                        //     {
                        //         path: '/UnReturnedCommissionsMoney/UnReturnedCommissionsDetail/CommissionManagerDetail/:id',
                        //         name: 'UnReturnedComCommissionDetail',
                        //         meta: {
                        //             title: '佣金详情',
                        //         },
                        //         component: () => import('@/view/CommissionManager/CommissionManagerDetail'),
                        //     }
                        // ]
                    },
                    {
                        path: '/UnReturnedCommissionsMoney/OrderDetail/:id',
                        name: 'UnReturnedComOrderDetail',
                        meta: {
                            title: '订单详情'
                        },
                        component: () => import('@/view/Order/OrderDetail')
                    },
                    {
                        path: '/UnReturnedCommissionsMoney/CommissionManagerDetail/:id',
                        name: 'UnReturnedComCommissionDetail',
                        meta: {
                            title: '佣金详情',
                        },
                        component: () => import('@/view/CommissionManager/CommissionManagerDetail'),
                    }
                ]
            },
            {
                path: '/CardStock',
                meta: {
                    title: '卡劵管理',
                    isHidden: true,
                },
                name: 'CardStock',
                redirect: {
                    name: 'CardStockList'
                },
                component: MainView,
                children: [
                    {
                        path: '/CardStock/CardStockList',
                        name: 'CardStockList',
                        meta: {
                            title: '卡劵管理',
                        },
                        component: () => import('@/view/CardStock/CardStockList'),
                    },
                    {
                        path: '/CardStock/CardStockLog',
                        name: 'CardStockLog',
                        meta: {
                            title: '客户卡券领取记录',
                        },
                        component: () => import('@/view/CardStock/CardStockLog'),
                    },
                    {
                        path: '/CardStock/TalkCardStockLog',
                        name: 'TalkCardStockLog',
                        meta: {
                            title: '经纪人卡劵拓客管理',
                        },
                        component: () => import('@/view/CardStock/TalkCardStockLog'),
                    },
                ]
            },
            {
                path: '/TicketCompany',
                meta: {
                    title: '票务公司',
                },
                name: 'TicketCompany',
                redirect: {
                    name: 'TicketCompanyList'
                },
                component: MainView,
                children: [
                    {
                        path: '/TicketCompany/TicketCompanyList',
                        name: 'TicketCompanyList',
                        meta: {
                            title: '票务公司列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/TicketCompany/TicketCompanyList'),
                    }
                ]
            },
            {
                path: '/OnSite',
                meta: {
                    title: '驻场管理',
                },
                name: 'OnSite',
                redirect: {
                    name: 'OnSiteList'
                },
                component: MainView,
                children: [
                    {
                        path: '/OnSite/OnSiteList',
                        name: 'OnSiteList',
                        meta: {
                            title: '驻场列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/OnSite/OnSiteList'),
                    }
                ]
            },
            {
                path: '/BusinessProcess',
                meta: {
                    title: '流水业务管理',
                },
                name: 'BusinessProcess',
                redirect: {
                    name: 'BusinessProcessList'
                },
                component: MainView,
                children: [
                    {
                        path: '/BusinessProcess/BusinessProcessList',
                        name: 'BusinessProcessList',
                        meta: {
                            title: '流水业务管理',
                            isHidden: true,
                        },
                        component: () => import('@/view/BusinessProcess/BusinessProcessList'),
                    },
                    {
                        path: '/BusinessProcess/BusinessProcessOrder',
                        name: 'BusinessProcessOrder',
                        meta: {
                            title: '流水订单',
                        },
                        component: () => import('@/view/BusinessProcess/BusinessProcessOrder'),
                    },
                ]
            },
            {
                path: '/KojiPolicy',
                meta: {
                    title: '奖金提成管理',
                },
                name: 'KojiPolicy',
                redirect: {
                    name: 'KojiPolicyList'
                },
                component: MainView,
                children: [
                    {
                        path: '/KojiPolicy/KojiPolicyList',
                        name: 'KojiPolicyList',
                        meta: {
                            title: '奖金提成列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Koji/KojiPolicy/KojiPolicyList'),
                    },
                    {
                        path: '/KojiPolicy/KojiPolicyDetail',
                        name: 'KojiPolicyDetail',
                        meta: {
                            title: '奖金提成详情',
                        },
                        component: () => import('@/view/Koji/KojiPolicy/KojiPolicyDetail'),
                    },
                    {
                        path: '/KojiPolicy/AddKojiPolicy',
                        name: 'AddKojiPolicy',
                        meta: {
                            title: '新增奖金提成',
                        },
                        component: () => import('@/view/Koji/KojiPolicy/KojiPolicyDetail'),
                    },
                    {
                        path: '/KojiPolicy/EditKojiPolicy',
                        name: 'EditKojiPolicy',
                        meta: {
                            title: '编辑奖金提成',
                        },
                        component: () => import('@/view/Koji/KojiPolicy/KojiPolicyDetail'),
                    }
                ]
            },
            {
                path: '/KojiPerformance',
                meta: {
                    title: '提成结算',
                },
                name: 'KojiPerformance',
                redirect: {
                    name: 'KojiPerformanceList'
                },
                component: MainView,
                children: [
                    {
                        path: '/KojiPerformance/KojiPerformanceList',
                        name: 'KojiPerformanceList',
                        meta: {
                            title: '提成结算列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Koji/KojiPerformance/KojiPerformanceList'),
                    },
                    {
                        path: '/KojiPerformance/KojiPerformanceDetail/:id',
                        name: 'KojiPerformanceDetail',
                        meta: {
                            title: '提成结算详情',
                        },
                        component: () => import('@/view/Koji/KojiPerformance/KojiPerformanceDetail'),
                        props: (route) => ({
                            id: route.params.id
                        })
                    }
                ]
            },
            {
                path: '/Store',
                meta: {
                    title: '门店管理',
                },
                name: 'Store',
                redirect: {
                    name: 'StoreList'
                },
                component: MainView,
                children: [
                    {
                        path: '/Store/StoreList',
                        name: 'StoreList',
                        meta: {
                            title: '门店列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Store/StoreList'),
                    },
                    {
                        path: '/Store/StoreDetail/:id',
                        name: 'StoreDetail',
                        meta: {
                            title: '门店详情',
                        },
                        component: () => import('@/view/Store/StoreDetail'),
                    },
                    {
                        path: '/Store/AddStore',
                        name: 'AddStore',
                        meta: {
                            title: '新增门店',
                        },
                        component: () => import('@/view/Store/AddStore'),
                    },
                ]
            },
            {
                path: '/Alliance',
                meta: {
                    title: '联盟管理',
                },
                name: 'Alliance',
                redirect: {
                    name: 'AllianceList'
                },
                component: MainView,
                children: [
                    {
                        path: '/Alliance/AllianceAudit/AllianceList',
                        name: 'AllianceList',
                        meta: {
                            title: '联盟列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/Alliance/AllianceAudit/AllianceList'),
                    }
                ]
            },
            {
                path: '/AllianceDeduct',
                name: 'AllianceDeduct',
                meta: {
                    title: '联盟提成',
                },
                component: () => import('@/view/Alliance/AllianceDeduct'),
            },
            {
                path: '/NewsManager',
                meta: {
                    title: '消息管理',
                },
                name: 'NewsManager',
                redirect: {
                    name: 'NewsMangerList'
                },
                component: MainView,
                children: [
                    {
                        path: '/NewsManager/NewsMangerList',
                        name: 'NewsMangerList',
                        meta: {
                            title: '消息管理列表',
                            isHidden: true,
                        },
                        component: () => import('@/view/NewsManager/NewsMangerList'),
                    }
                ]
            },
            {
                path: '/ClientSetup',
                name: 'ClientSetup',
                meta: {
                    title: 'APP自定义',
                },
                component: () => import('@/view/ClientSetup'),
            },
            {
                path: '/Application',
                meta: {
                    title: '应用管理',
                    isHidden: true,
                },
                name: 'Application',
                redirect: {
                    name: 'ApplicationSquare'
                },
                component: MainView,
                children: [
                    {
                        path: '/ApplicationSquare',
                        name: 'ApplicationSquare',
                        meta: {
                            title: '应用广场',
                        },
                        component: () => import('@/view/Application/ApplicationSquare'),
                    },
                    {
                        path: '/MyApplicationList',
                        name: 'MyApplicationList',
                        meta: {
                            title: '我的应用',
                        },
                        component: () => import('@/view/Application/MyApplicationList'),
                    },
                ]
            },
            {
                path: '/Union',
                meta: {
                    title: '联盟',
                    isHidden: true,
                },
                name: 'Union',
                redirect: {
                    name: 'UnionAuthentication'
                },
                component: MainView,
                children: [
                    {
                        path: '/UnionAuthentication',
                        name: 'UnionAuthentication',
                        meta: {
                            title: '企业认证提交',
                        },
                        component: () => import('@/view/Union/UnionAuthentication'),
                    }
                ]
            },
            {
                path: '/UnionSetting',
                name: 'UnionSetting',
                meta: {
                    title: '联盟后台设置',
                },
                component: () => import('@/view/UnionSetting'),
            },
            {
                path: '/ContentsWireshark',
                name: 'ContentsWireshark',
                meta: {
                    title: '使用手册',
                },
                component: () => import('@/view/ContentsWireshark'),
            },
            {
                path: '/DeveloperCenter',
                name: 'DeveloperCenter',
                meta: {
                    title: '开发者中心',
                },
                component: () => import('@/view/DeveloperCenter'),
            },
            {
                path: '/DataExport',
                name: 'DataExport',
                meta: {
                    title: '数据导出',
                },
                redirect: {
                    name: 'DataExportPage'
                },
                component: MainView,
                children: [
                    {
                        path: '/DataExport/DataExportPages',
                        name: 'DataExportPage',
                        meta: {
                            title: '数据导出',
                            isHidden: true,
                        },
                        component: () => import('@/view/DataExport'),
                    },
                    {
                        path: '/DataExport/AdvanceOrderDetail/:id',
                        name: 'AdvanceOrderDetail',
                        meta: {
                            title: '垫佣订单详情'
                        },
                        component: () => import('@/view/DataExport/AdvanceOrderDetail')
                    },
                ],
            },
            {
                path: '/CommissionManager',
                name: 'CommissionManager',
				redirect: {
					name: 'CommissionManagerList'
				},
                meta: {
                    title: '佣金管理',
                },
                component: MainView,
                children: [
                    {
                        path: '/CommissionManager/CommissionManagerList',
                        name: 'CommissionManagerList',
                        meta: {
                            title: '佣金管理',
							isHidden: true,
                        },
                        component: () => import('@/view/CommissionManager/CommissionManagerList'),
                    },
                    {
                        path: '/CommissionManager/CommissionManagerDetail/:id',
                        name: 'CommissionManagerDetail',
                        meta: {
                            title: '佣金详情',
                        },
                        component: () => import('@/view/CommissionManager/CommissionManagerDetail'),
                    }
                ]
            }
        ]
    },
    {
        path: '/401',
        name: 'error_401',
        meta: {},
        component: () => import('@/view/error-page/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        meta: {},
        component: () => import('@/view/error-page/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        meta: {},
        component: () => import('@/view/error-page/404.vue')
    }
]
