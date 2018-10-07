var data = {
  'name': 'goodsManager',
  'search': [{
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
    }
  ],
  'grid': {
    'toolbar': ['add', 'refresh'],
    'column': [{
        'name': 'goods_picture',
        'title': '图片',
        'type': 'string',
        'width': '120',
        'template': 'img'
      }, {
        'name': 'goods_code',
        'title': '商品编码',
        'type': 'string',
        'width': '120',
        'template': ''
      },
      {
        'name': 'goods_name',
        'title': '商品名称',
        'type': 'string',
        'width': '120',
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
        'name': 'purchase_price',
        'title': '商品进价',
        'type': 'number',
        'width': '150',
        'template': ''
      },
      {
        'name': 'sales_price',
        'title': '销售单价',
        'type': 'number',
        'width': '150',
        'template': ''
      },
      {
        'name': 'minimum_price',
        'title': '最低售价',
        'type': 'number',
        'width': '150',
        'template': ''
      },
      {
        'name': 'inventory_quantity',
        'title': '库存数量',
        'type': 'number',
        'width': '150',
        'template': ''
      },
      {
        'name': 'goods_color',
        'title': '颜色',
        'type': 'string',
        'width': '150',
        'template': ''
      },
      {
        'name': 'goods_size',
        'title': '尺码',
        'type': 'number',
        'width': '150',
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
    'operation': [{
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
