# 表结构

# 用户表 users

|名称|数据类型|注释|
|-----|-----|-----|
|uid|INT|用户id|
|avatar|varchar|头像url|
|user_name|var|用户名字|
|user_sign|var|个性签名|
|email|var|电子邮件|
|password|var|密码|
|follows|INT|关注数量|
|follow_shops|INT|关注店铺数量|
|fans|INT|粉丝数量|
|shop_id|INT|店铺id(如果有的话)|
|money|DOUBLE|余额|
|inb|INT|硬币数量|

# 店铺表 shops

|名称|数据类型|注释|
|-----|-----|-----|
|shop_id|INT|店铺id|
|uid|INT|拥有者id|
|shop_name|VAR|店铺名字|
|shop_sign|VAR|店铺个性签名|
|shop_fans|INT|店铺粉丝|

# 商品表 commodities

|名称|数据类型|注释|
|-----|-----|-----|
|community_id|INT|商品id|
|shop_id|INT|商铺id|
|cover_img_src|VAR|封面图片地址|
|content_img_src|VAR|内容图片地址，中间以#分割|
|details_img_src|VAR|商品详情图片地址,中间以#分割|
|commodity_name|VAR|商品名字|
|commodity_price|DOUBLE|商品价格|
|pay_person|INT|付款人数|


# 用户关注表 follow_user

|名称|数据类型|注释|
|-----|-----|-----|
|follow_user_table_id|INT|用户关注表id|
|uid|INT|当前用户id|
|follow_uid|INT|关注的人id|

# 关注店铺表 follow_shop

|名称|数据类型|注释|
|-----|-----|-----|
|follow_shop_table_id|INT|用户关注店铺表id|
|uid|INT|当前用户id|
|shop_id|INT|店铺id|

# 用户商品表 

# 用户订单表
