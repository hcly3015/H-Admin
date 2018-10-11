var data = {
  'name': 'goodsManager',
  'search': [
    {
      'name': 'goods_code',
      'title': '商品编码',
      'type': 'string'
    },
    {
      'name': 'goods_name',
      'title': '商品名称',
      'type': 'string'
    },
    {
      'name': 'mnemonic_code',
      'title': '助记码',
      'type': 'string'
    },
    {
      'name': 'createtime',
      'title': '时间',
      'type': 'datetime'
    }
  ],
  'grid': {
    'toolbar': ['add', 'refresh'],
    'column': [
      {
        'name': 'goods_picture',
        'title': '图片',
        'type': 'string',
        'width': '120',
        'template': 'img'
      }, {
        'name': 'goods_code',
        'title': '商品编码',
        'type': 'string',
        'width': '150',
        'template': ''
      },
      {
        'name': 'goods_name',
        'title': '商品名称',
        'type': 'string',
        'width': '150',
        'template': ''
      },
      {
        'name': 'mnemonic_code',
        'title': '助记码',
        'type': 'string',
        'width': '150',
        'template': ''
      },
      {
        'name': 'createtime',
        'title': '创建日期',
        'type': 'datetime',
        'width': '120',
        'template': ''
      },
      {
        'name': 'remark',
        'title': '备注',
        'type': 'string',
        'width': 'auto',
        'template': ''
      }
    ],
    'operation': [
      {
        'name': 'edit',
        'type': 'text'
      },
      {
        'name': 'delete',
        'type': 'text'
      }
    ]
  }
}

export default data
