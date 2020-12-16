
export const routerConfig =
[
  {
      "key": "/Charts",
      "path": "Charts",
      "name": "总览",
      "icon": "smile",
      "component": "./Charts",
      "authority": [
          "admin",
      ]
  },
  {
    "key": "/Signalr",
    "path": "Signalr",
    "name": "Signalr",
    "icon": "smile",
    "component": "./Signalr",
    "authority": [
        "admin",
    ]
},
  {
      "key": "/WorkTicketView",
      "path": "WorkTicketView",
      "name": "订单详情",
      "icon": "smile",
      "component": "./WorkTicketView",
      "authority": [
          "admin",
      ],
      "hideInMenu": true
  },
  {
      "key": "/WorkTicket",
      "path": "WorkTicket",
      "name": "订单管理",
      "icon": "smile",
      "authority": [
          "admin",
      ],
      "routes": [
          {
              "key": "/WorkTicketList",
              "path": "WorkTicketList",
              "name": "全部工单",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin",
              ]
          },
          {
              "key": "/WorkTicketGrant",
              "path": "WorkTicketGrant",
              "name": "待采购",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin"
              ]
          },
          {
              "key": "/WorkTicketReceive",
              "path": "WorkTicketReceive",
              "name": "待付款",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin"
              ]
          },
          {
              "key": "/WorkTicketLoad",
              "path": "WorkTicketLoad",
              "name": "物流查询",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin",
              ]
          },
          {
              "key": "/WorkTicketUnLoad",
              "path": "WorkTicketUnLoad",
              "name": "待开票",
              "icon": "smile",
              "component": "./WorkTicket",
              "authority": [
                  "admin",
              ]
          }
      ]
  },
  {
    "key": "/Customer",
    "path": "Customer",
    "name": "客户管理",
    "icon": "smile",
    "component": "./Customer",
    "authority": [
        "admin",
    ]  
  },
  {
      "key": "/Supplier",
      "path": "Supplier",
      "name": "供应商管理",
      "icon": "smile",
      "component": "./Supplier",
      "authority": [
          "admin"
      ]
  },
  {
      "key": "/Goods",
      "path": "Goods",
      "name": "商品管理",
      "icon": "smile",
      "component": "./Goods",
      "authority": [
          "admin"
      ]
  },
  {
    "key": "/Company",
    "path": "Company",
    "name": "执行公司管理",
    "icon": "smile",
    "component": "./Company",
    "authority": [
        "admin"
    ]
  },
  {
      "key": "/Reports",
      "path": "Reports",
      "name": "报表",
      "icon": "smile",
      "component": "./Reports",
      "authority": [
          "admin",
      ]
  },
  {
      "key": "/SystemManagement",
      "path": "/SystemManagement",
      "name": "系统管理",
      "icon": "crown",
      "routes": [
          {
              "key": "/SystemManagement/users",
              "path": "users",
              "name": "用户管理",
              "icon": "smile",
              "component": "./user",
              "authority": [
                  "admin"
              ]
          },
          {
              "key": "/SystemManagement/roles",
              "path": "roles",
              "name": "角色管理",
              "icon": "smile",
              "component": "./role",
              "authority": [
                  "admin"
              ]
          }
      ],
      "authority": [
          "admin"
      ]
  },
  {
      "key": "/",
      "path": "/",
      "redirect": "/Charts"
  },
  {
      "key": "/index.html",
      "path": "/index.html",
      "redirect": "/user/login"
  }
];