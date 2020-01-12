---
title: HTTP状态码
date: 2018-09-02
tag: 笔记
cover: https://imgkr.cn-bj.ufileos.com/9bda0377-12ca-417b-a8c9-380e48834ade.png
---

## 概括

|状态码|类别|原因短语|
|-|-|-|
|1XX|Informational(信息性状态码)|接收的请求正在处理|
|2XX|Success(成功状态码)|请求正常处理完毕|
|3XX|Redirection(重定向状态码)|需要进行附加操作以完成请求|
|4XX|Client Error(客户端错误状态码)|服务器无法处理请求|
|5XX|Server Error(服务器错误状态码)|服务器处理请求出错|


## 2XX

- 200 OK
- 204 No Content
- 206 Partial Content 返回一部分数据，Content-Range字段

## 3XX

- 301 Moved Permanently 永久性重定向
- 302 Found 临时性重定向
- 303 See Other 和302一致，但是希望采用GET方式
- 304 Not Modified 该状态码表示客户端发送附带条件的请求 2 时，服务器端允许请求访问资源，但未满足条件的情况
- 307 Temporary Redirect 和302一致

## 4XX

- 400 Bad Request 请求报文存在语法错误
- 401 Unauthorized 需要认证或者认证失败
- 403 Forbidden 拒绝资源访问
- 404 Not Found 找不到请求的资源

## 5XX

- 500 Internal Server Error 服务器执行错误
- 503 Service Unavailable 服务器超负载或者停机维护，无法处理请求

