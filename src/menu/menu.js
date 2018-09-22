var menu = [
  {
    'id': 1,
    'parentId': 0,
    'sort': 0,
    'cn_title': '首页',
    'ft_title': '首頁',
    'en_title': 'Home',
    'path': '/dashboard',
    'icon': 'fa fa-dashboard'
  },
  {
    'id': 2,
    'parentId': 0,
    'sort': 1,
    'cn_title': '用户管理',
    'ft_title': '用戶管理',
    'en_title': 'User Manager',
    'path': 'usermanage',
    'icon': 'fa fa-user-circle-o',
    'children': [
      {
        'id': 21,
        'parentId': 2,
        'sort': 0,
        'cn_title': '用户列表',
        'ft_title': '用戶列表',
        'en_title': 'User List',
        'path': '/userlist',
        'icon': 'is-children fa fa-list-alt'
      }
    ]
  },
  {
    'id': 3,
    'parentId': 0,
    'sort': 2,
    'cn_title': '权限管理',
    'ft_title': '權限管理',
    'en_title': 'Permission Manager',
    'path': 'permsmanage',
    'icon': 'fa fa-key',
    'children': [
      {
        'id': 31,
        'parentId': 3,
        'sort': 0,
        'cn_title': '权限列表',
        'ft_title': '權限列表',
        'en_title': 'Permission List',
        'path': '/permslist',
        'icon': 'is-children fa fa-list-alt'
      },
      {
        'id': 32,
        'parentId': 3,
        'sort': 1,
        'cn_title': '角色列表',
        'ft_title': '角色列表',
        'en_title': 'Role List',
        'path': '/rolelist',
        'icon': 'is-children fa fa-list-alt'
      }
    ]
  },
  {
    'id': 4,
    'parentId': 0,
    'sort': 3,
    'cn_title': '测试管理',
    'ft_title': '测试管理',
    'en_title': 'Test Manager',
    'path': 'testmanage',
    'icon': 'fa fa-file-text-o',
    'children': [
      {
        'id': 41,
        'parentId': 4,
        'sort': 0,
        'cn_title': '网格列表',
        'ft_title': '網格列表',
        'en_title': 'Grid List',
        'path': '',
        'icon': 'is-children fa fa-database',
        'children': [
          {
            'id': 411,
            'parentId': 41,
            'sort': 0,
            'cn_title': '列表数据',
            'ft_title': '列表數據',
            'en_title': 'Table List',
            'path': '/test/tablelist',
            'icon': 'is-children fa fa-list-alt'
          }
        ]
      }
    ]
  }
]

export default menu
