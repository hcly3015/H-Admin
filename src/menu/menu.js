var menu = [
  {
    'id': 1,
    'cn_title': '首页',
    'ft_title': '首頁',
    'en_title': 'Home',
    'path': '/dashboard',
    'icon': 'fa fa-dashboard',
    'sort': 1,
    'parentId': 0
  },
  {
    'id': 2,
    'cn_title': '用户管理',
    'ft_title': '用戶管理',
    'en_title': 'User Manager',
    'path': 'usermanager',
    'icon': 'fa fa-user-circle-o',
    'sort': 2,
    'parentId': 0,
    'children': [
      {
        'id': 21,
        'cn_title': '用户列表',
        'ft_title': '用戶列表',
        'en_title': 'User List',
        'path': '/userlist',
        'icon': 'is-children fa fa-list-alt',
        'sort': 1,
        'parentId': 2
      }
    ]
  },
  {
    'id': 3,
    'cn_title': '商品管理',
    'ft_title': '商品管理',
    'en_title': 'Goods Manager',
    'path': 'goodsmanager',
    'icon': 'fa fa-product-hunt',
    'sort': 1,
    'parentId': 0,
    'children': [
      {
        'id': 31,
        'cn_title': '商品列表',
        'ft_title': '商品列表',
        'en_title': 'Goods List',
        'path': '/goods/goodslist',
        'icon': 'is-children fa fa-list-alt',
        'sort': 1,
        'parentId': 3
      }
    ]
  },
  {
    'id': 4,
    'cn_title': '库存管理',
    'ft_title': '庫存管理',
    'en_title': 'Stock Manager',
    'path': 'stockmanager',
    'icon': 'fa fa-product-hunt',
    'sort': 1,
    'parentId': 0,
    'children': [
      {
        'id': 41,
        'cn_title': '商品盘点',
        'ft_title': '商品盤點',
        'en_title': 'Goods Check',
        'path': '/goods/goodscheck',
        'icon': 'is-children fa fa-list-alt',
        'sort': 1,
        'parentId': 4
      }
    ]
  },
  {
    'id': 100,
    'cn_title': '系统管理',
    'ft_title': '系統管理',
    'en_title': 'System Manager',
    'path': 'systemmanager',
    'icon': 'fa fa-key',
    'sort': 1,
    'parentId': 0,
    'children': [
      {
        'id': 1001,
        'cn_title': '权限设置',
        'ft_title': '權限設置',
        'en_title': 'Permission Setting',
        'path': '/permssetting',
        'icon': 'is-children fa fa-list-alt',
        'sort': 1,
        'parentId': 100
      },
      {
        'id': 1002,
        'cn_title': '角色设置',
        'ft_title': '角色設置',
        'en_title': 'Role Setting',
        'path': '/rolesetting',
        'icon': 'is-children fa fa-list-alt',
        'sort': 2,
        'parentId': 100
      }
    ]
  }
]

export default menu
