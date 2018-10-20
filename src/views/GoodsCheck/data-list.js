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
        'name': 'goods_code',
        'title': '商品编码',
        'type': 'string',
        'width': '130',
        'template': '',
        'formatter': ''
      },
      {
        'name': 'goods_name',
        'title': '商品名称',
        'type': 'string',
        'width': '130',
        'template': '',
        'formatter': ''
      },
      {
        'name': 'goods_category',
        'title': '商品类别',
        'type': 'string',
        'width': '130',
        'template': '',
        'formatter': ''
      },
      {
        'name': 'goods_unit',
        'title': '商品单位',
        'type': 'string',
        'width': '110',
        'template': '',
        'formatter': ''
      },
      {
        'name': 'goods_spec',
        'title': '商品规格',
        'type': 'string',
        'width': '150',
        'template': '',
        'formatter': ''
      },
      {
        'name': 'inventory_quantity',
        'title': '库存数量',
        'type': 'number',
        'width': '100',
        'template': ''
      },
      {
        'name': 'goods_size',
        'title': '尺码',
        'type': 'number',
        'width': '100',
        'template': ''
      },
      {
        'name': 'goods_color',
        'title': '颜色',
        'type': 'string',
        'width': '100',
        'template': ''
      },
      {
        'name': 'createtime',
        'title': '创建日期',
        'type': 'datetime',
        'width': '150',
        'template': '',
        'formatter': 'dateFormatter'
      },
      {
        'name': 'remark',
        'title': '备注',
        'type': 'string',
        'width': 'auto',
        'template': '',
        'formatter': ''
      }
    ],
    'operation': [
      {
        'name': 'stocknumber',
        'type': 'text'
      },
      {
        'name': 'stockrecord',
        'type': 'text'
      }
    ]
  }
}

export default data
