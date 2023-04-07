# Node服务

# 接口文档
- url: 127.0.0.1:5000/api/
## user
- header: user
### 127.0.0.1:5000/api/user/test
- 请求方式 get
测试接口 返回
```json
{
  "name": "蔡徐坤"
}
```

### 127.0.0.1:5000/api/user/register
- 注册接口 使用post传递  
- 请求方式 post
```json
{
  "name": "用户昵称",
  "email": "用户邮箱",
  "password": "用户密码", 
  "avatar": "头像url" 
}
```
```js
// 头像默认 https://cdn.luogu.com.cn/upload/usericon/1.png
```

### 127.0.0.1:5000/api/user/login
- 登录接口
- 请求方式 post
```json
{
  "email": "用户邮箱",
  "password": "用户密码"
}
```

### 127.0.0.1:5000/api/user/infor?uid=
- 获取用户信息
- 请求方式 get
```json
{
  "userData": {
    "uid": 10000000,
    "avatar": "https://cdn.luogu.com.cn/upload/usericon/1.png",
    "user_name": "ybh一号",
    "user_sign": null,
    "email": "ybh@123.com",
    "password": "$2a$10$S/nqzvsxupgaH43azUK60.jOxUaaa1jwmrxnOMRTcXu5CUV/23QZ6",
    "follows": 0,
    "follow_shops": 0,
    "fans": 0,
    "shop_id": 1000000
  }
}
```