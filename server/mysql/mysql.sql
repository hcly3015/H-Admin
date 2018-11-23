DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` char(50) NOT NULL DEFAULT '' COMMENT '用户帐号',
  `password` char(128) NOT NULL DEFAULT '' COMMENT '用户密码',
  `sex` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '性别 0:男;1:女',
  `nick` char(128) NOT NULL DEFAULT '' COMMENT '昵称',
  `email` char(128) NOT NULL DEFAULT '' COMMENT '邮箱',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `usertype` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '用户类型 0:未审核用户|游客;1:普通用户;2:普通管理员;3:VIP用户;4:超级管理员',
  `loginip` char(15) DEFAULT '' COMMENT '登录IP',
  `lastlogintime` timestamp DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '最后登录时间',
  `createtime` timestamp DEFAULT '0000-00-00 00:00:00' COMMENT '注册时间',
  `remark` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';