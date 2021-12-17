# 产品介绍

- `sermas` 是一款轻量级的服务器资源管理网站，可以有效的进行一个组织的服务器租用管理
- `sermas` 是 ***完全免运维*** 的，它全部采用serverless架构进行开发
- `sermas` 设计之初就考虑的高并发场景，因为前后端全部采用serverless开发，所以唯一的性能瓶颈在于数据库

## 演示地址
[sermas.top](https://sermas-1257122541.cos-website.ap-guangzhou.myqcloud.com/)

## 技术选型

- 后端框架： 阿里云FC，Python(requests, redis, pymysql, ......)
- 前端框架： Vue2.0 + elementUI
- 数据库： MySql 阿里飞天表格
- 缓存 Redis
- 版本控制： git
- 认证鉴权： Token
- 网关： 阿里云api网关
- 部分需要持续工作的任务（比如监听）： 阿里云 ServerLess 引擎
- 资源存储： 阿里云OSS
- 前端自动化构建： npm， 腾讯serverless工具
- 后端自动化构建： 阿里serverless S 工具
- 前端编辑器： webstorm
- 后端编辑器： vscode， ali Function compute插件


### _下面是前端服务的serverless构建文档，来自阿里云_
# 快速构建 vue-starter

**中文** | [English](./README_EN.md)

## 简介

vue-starter 模板使用 Tencent SCF 组件及其触发器能力，方便的在腾讯云创建，配置和管理一个 vue-starter 应用。

## 快速开始

### 1. 安装

```bash
# 安装 Serverless Framework
npm install -g serverless
```

### 2. 创建

通过如下命令直接下载该例子：

```bash
serverless init vue-starter --name example
cd example
```

### 3. 部署

在 `serverless.yml` 文件所在的项目根目录，运行以下指令，将会弹出二维码，直接扫码授权进行部署：

```bash
serverless deploy
```

> **说明**：如果鉴权失败，请参考 [权限配置](https://cloud.tencent.com/document/product/1154/43006) 进行授权。

### 4. 查看状态

执行以下命令，查看您部署的项目信息：

```bash
serverless info
```

### 5. 移除

可以通过以下命令移除 vue-starter 应用

```bash
serverless remove
```

### 账号配置（可选）

serverless 默认支持扫描二维码登录，用户扫描二维码后会自动生成一个 `.env` 文件并将密钥存入其中.
如您希望配置持久的环境变量/秘钥信息，也可以本地创建 `.env` 文件, 
把从[API 密钥管理](https://console.cloud.tencent.com/cam/capi)中获取的 `SecretId` 和`SecretKey` 填入其中.

> 如果没有腾讯云账号，可以在此[注册新账号](https://cloud.tencent.com/register)。

```bash
# 腾讯云的配置信息
touch .env
```

```
# .env file
TENCENT_SECRET_ID=123
TENCENT_SECRET_KEY=123
```


