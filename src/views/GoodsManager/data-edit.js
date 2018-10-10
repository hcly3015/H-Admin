var data = {
  'name': 'goodsManager',
  'forms': [
    {
      'name': 'goods_code',
      'title': '商品编码',
      'type': 'string',
      'width': '240'
    },
    {
      'name': 'goods_name',
      'title': '商品名称',
      'type': 'string',
      'width': '240'
    },
    {
      'name': 'mnemonic_code',
      'title': '助记码',
      'type': 'string',
      'width': '240'
    },
    {
      'name': 'remark',
      'title': '备注',
      'type': 'textarea',
      'width': '240'
    },
    {
      'name': 'goods_picture',
      'title': '图片',
      'type': 'picture'
    }
  ],
  'grid': {
    'column': [
      {
        'name': 'purchase_price',
        'title': '商品进价',
        'type': 'number',
        'width': '140',
        'template': ''
      },
      {
        'name': 'sales_price',
        'title': '销售单价',
        'type': 'number',
        'width': '140',
        'template': ''
      },
      {
        'name': 'minimum_price',
        'title': '最低售价',
        'type': 'number',
        'width': '140',
        'template': ''
      },
      {
        'name': 'inventory_quantity',
        'title': '库存数量',
        'type': 'number',
        'width': '140',
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
        'name': 'goods_size',
        'title': '尺码',
        'type': 'number',
        'width': '100',
        'template': ''
      },
      {
        'name': 'remark',
        'title': '备注',
        'type': 'string',
        'width': 'auto',
        'template': ''
      }
    ]
  }
}

export default data
