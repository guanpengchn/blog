---
title: Hyperleger-Fabric调用SDK的各种报错和解决方案
date: 2018-08-10
tag: 笔记
cover: https://imgkr.cn-bj.ufileos.com/9bda0377-12ca-417b-a8c9-380e48834ade.png
---

## 1.创建用户报错SSL

### 问题描述

大概上周一周的时间都在调这个bug，今天总算知道原因了，先把情况列出来，首先是使用了Fabric官网的Node SDK例子[balance\_transfer](https://github.com/hyperledger/fabric-samples/tree/release-1.1/balance-transfer)，在第一步发请求注册的时候出现的问题

* 发送请求

```bash
$ curl -s -X POST http://localhost:4000/users -H "content-type: application/x-www-form-urlencoded" -d 'username=Jim&orgName=Org1'
```

* 报错

```bash
{"success":false,"message":"failed Error: Calling enrollment endpoint failed with error [Error: write EPROTO 140735804384128:error:140770FC:SSL routines:SSL23_GET_SERVER_HELLO:unknown protocol:../deps/openssl/openssl/ssl/s23_clnt.c:827:\n]"}%
```

* 使用单步调试，最终错误定位到了`/balance-transfer/node_modules/fabric-ca-client/lib/FabricCAClientImpl.js`的844行代码上，代码段如下：

```javascript
var request = self._httpClient.request(requestOptions, function (response) {
    const responseBody = [];
    response.on('data', function (chunk) {
        responseBody.push(chunk);
    });

    response.on('end', function () {

        var payload = responseBody.join('');

        if (!payload) {
            reject(new Error(
                util.format('Enrollment failed with HTTP status code ', response.statusCode)));
        }
        //response should be JSON
        try {
            var res = JSON.parse(payload);
            if (res.success) {
                //we want the result field which is Base64-encoded PEM
                var enrollResponse = new Object();
                // Cert field is Base64-encoded PEM
                enrollResponse.enrollmentCert = Buffer.from(res.result.Cert, 'base64').toString();
                enrollResponse.caCertChain = Buffer.from(res.result.ServerInfo.CAChain, 'base64').toString();
                return resolve(enrollResponse);
            } else {
                return reject(new Error(
                    util.format('Enrollment failed with errors [%s]', JSON.stringify(res.errors))));
            }

        } catch (err) {
            reject(new Error(
                util.format('Could not parse enrollment response [%s] as JSON due to error [%s]', payload, err)));
        }
    });
});

request.on('error', function (err) {
reject(new Error(util.format('Calling enrollment endpoint failed with error [%s]', err)));
});

let body = JSON.stringify(enrollRequest);
request.write(body);
request.end();
```

* 其中`_httpClient`值为`https`，也就是nodejs自带的模块，通过`require('https')`引入的，也就是相当于在发送https请求的时候报错

* 该错误在网上搜了很久，也用了github上很多人提到的解决方案，但是并不奏效，最后发现是在fabric的基本docker-compose.yaml配置文件和base.yaml配置文件中有相关配置

* 也就是`TLS_ENABLED`相关字段的配置，被配置成了false，尤其是CA部分的，会导致存在https无法请求的问题，换成http就成功了

### 解决方案

* 修改[network\_config.yaml](https://github.com/hyperledger/fabric-samples/blob/release-1.1/balance-transfer/artifacts/network-config.yaml)文件

* 将`certificateAuthories`处的ca都由`https`配置成`http`的，并且打开`httpOptions`配置为`true`，配置修改如下

```yaml
certificateAuthorities:
  ca0.chainplaza.com:
    url: http://localhost:7054
    # the properties specified under this object are passed to the 'http' client verbatim when
    # making the request to the Fabric-CA server
    httpOptions:
      verify: true
    tlsCACerts:
      path: ../network/crypto-config/peerOrganizations/org0.chainplaza.com/ca/ca.org0.chainplaza.com-cert.pem

    # Fabric-CA supports dynamic user enrollment via REST APIs. A "root" user, a.k.a registrar, is
    # needed to enroll and invoke new users.
    registrar:
      - enrollId: admin
        enrollSecret: adminpw
    # [Optional] The optional name of the CA.
    caName: ca0.chainplaza.com

  ca1.chainplaza.com:
    url: http://localhost:8054
    httpOptions:
      verify: true
    tlsCACerts:
      path: ../network/crypto-config/peerOrganizations/org1.chainplaza.com/ca/ca.org1.chainplaza.com-cert.pem
    registrar:
      - enrollId: admin
        enrollSecret: adminpw
    # [Optional] The optional name of the CA.
    caName: ca1.chainplaza.com

  ca2.chainplaza.com:
    url: http://localhost:9054
    httpOptions:
      verify: true
    tlsCACerts:
      path: ../network/crypto-config/peerOrganizations/org2.chainplaza.com/ca/ca.org2.chainplaza.com-cert.pem
    registrar:
      - enrollId: admin
        enrollSecret: adminpw
    # [Optional] The optional name of the CA.
    caName: ca2.chainplaza.com
```

## 2.创建channel报错SSL

### 问题描述

* 首先基于第一步成功注册用户，获取token，执行

```bash
$ token=<put JSON Web Token here>
```

* 发送请求

```bash
$ curl -s -X POST \
  http://localhost:4000/channels \
  -H "authorization: Bearer $token" \
  -H "content-type: application/json" \
  -d '{
    "channelName":"mychannel",
    "channelConfigPath":"../artifacts/channel/mychannel.tx"
}'
```

* 报错

```bash
E0702 16:48:37.113124000 140735804384128 ssl_transport_security.c:921] Handshake failed with fatal error SSL_ERROR_SSL: error:1408F10B:SSL routines:SSL3_GET_RECORD:wrong version number.
E0702 16:48:37.117412000 140735804384128 ssl_transport_security.c:921] Handshake failed with fatal error SSL_ERROR_SSL: error:1408F10B:SSL routines:SSL3_GET_RECORD:wrong version number.
error: [Orderer.js]: sendBroadcast - on error: "Error: Connect Failed\n    at ClientDuplexStream._emitStatusIfDone (/Users/guanpengchn/Code/chain_plaza/balance-transfer/node_modules/grpc/src/node/src/client.js:255:19)\n    at ClientDuplexStream._readsDone (/Users/guanpengchn/Code/chain_plaza/balance-transfer/node_modules/grpc/src/node/src/client.js:221:8)\n    at readCallback (/Users/guanpengchn/Code/chain_plaza/balance-transfer/node_modules/grpc/src/node/src/client.js:283:12)"
[2018-07-02 16:48:37.124] [ERROR] Create-Channel - Error: SERVICE_UNAVAILABLE
    at ClientDuplexStream.<anonymous> (/Users/guanpengchn/Code/chain_plaza/balance-transfer/node_modules/fabric-client/lib/Orderer.js:136:21)
    at emitOne (events.js:116:13)
    at ClientDuplexStream.emit (events.js:211:7)
    at ClientDuplexStream._emitStatusIfDone (/Users/guanpengchn/Code/chain_plaza/balance-transfer/node_modules/grpc/src/node/src/client.js:258:12)
    at ClientDuplexStream._readsDone (/Users/guanpengchn/Code/chain_plaza/balance-transfer/node_modules/grpc/src/node/src/client.js:221:8)
    at readCallback (/Users/guanpengchn/Code/chain_plaza/balance-transfer/node_modules/grpc/src/node/src/client.js:283:12)
(node:28483) UnhandledPromiseRejectionWarning: Error: Failed to initialize the channel: Error: SERVICE_UNAVAILABLE
    at Object.createChannel (/Users/guanpengchn/Code/chain_plaza/balance-transfer/app/create-channel.js:65:9)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
(node:28483) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing insideof an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 2)
(node:28483) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
E0702 16:48:57.113731000 140735804384128 ssl_transport_security.c:921] Handshake failed with fatal error SSL_ERROR_SSL: error:1408F10B:SSL routines:SSL3_GET_RECORD:wrong version number.
E0702 16:48:57.120118000 140735804384128 ssl_transport_security.c:921] Handshake failed with fatal error SSL_ERROR_SSL: error:1408F10B:SSL routines:SSL3_GET_RECORD:wrong version number.
```

* 将错误定位到了orderer节点的broadcast的函数上，根据错误提示，其实本质上也是由于协议错误导致的，根据github上的一个[回答](https://github.com/hyperledger-archives/caliper/issues/40)，使用http协议时不要用grpcs，而要用grpc

### 解决方案

* 修改[network\_config.yaml](https://github.com/hyperledger/fabric-samples/blob/release-1.1/balance-transfer/artifacts/network-config.yaml)文件

* 将所有`grpcs`配置成`grpc`然后创建channel就成功了

## 3.创建用户报错Failed to get Affiliation

### 问题描述

* 注册用户发送请求

```bash
$ curl -s -X POST http://localhost:4000/users -H "content-type: application/x-www-form-urlencoded" -d 'username=Jim&orgName=Org0'
```

* 报错

```bash
{"success":false,"message":"failed Error: fabric-ca request register failed with errors [[{\"code\":63,\"message\":\"Failed to get Affiliation: sql: no rows in result set\"}]]"}%
```

* 获取到[资料](https://stackoverflow.com/questions/48836728/unable-to-enroll-user-in-new-org-added-to-balance-transfer-sample?rq=1)表示说，fabric-ca只有`org1.department1` `org1.department2` `org2.department1`，所以此处使用Org0报错

### 解决方案

* 在命令行执行如下语句，其中`fabric-ca-client`在`fabric-samples/bin`中，其中7054是ca0的端口，相对应关系

```bash
$ fabric-ca-client enroll -u http://admin:adminpw@localhost:7054
2018/07/02 17:51:00 [INFO] Created a default configuration file at /Users/guanpengchn/.fabric-ca-client/fabric-ca-client-config.yaml
2018/07/02 17:51:00 [INFO] generating key: &{A:ecdsa S:256}
2018/07/02 17:51:00 [INFO] encoded CSR
2018/07/02 17:51:00 [INFO] Stored client certificate at /Users/guanpengchn/.fabric-ca-client/msp/signcerts/cert.pem
2018/07/02 17:51:00 [INFO] Stored root CA certificate at /Users/guanpengchn/.fabric-ca-client/msp/cacerts/localhost-7054.pem
2018/07/02 17:51:00 [INFO] Stored intermediate CA certificates at /Users/guanpengchn/.fabric-ca-client/msp/intermediatecerts/localhost-7054.pem

$ fabric-ca-client affiliation add org0
2018/07/02 17:51:09 [INFO] Configuration file location: /Users/guanpengchn/.fabric-ca-client/fabric-ca-client-config.yaml
Successfully added affiliation: org0

$ fabric-ca-client affiliation add org0.department1
2018/07/02 17:51:15 [INFO] Configuration file location: /Users/guanpengchn/.fabric-ca-client/fabric-ca-client-config.yaml
Successfully added affiliation: org0.department1
```

这时候再注册就成功了

## 4、create Affiliation的rest接口实现

### 问题描述

* 之前通过命令行的方式能够成功添加affiliation，但是并不方便有缺陷，balance\_transfer中的例子又没有做相关工作，倒是在fabcar中有使用，但虽然目的一样，实际上实现有很大差别，无法使用

### 解决方案

* 于是通过debug后发现`helper.js`的`getRegisteredUser`函数中，在enroll了admin之后的caClient变量有newAffiliationService函数

* 仿照fabcar中的调用方式和helper.js的`getRegisteredUser`函数写法，做了如下实现

`helper.js`添加代码如下

```javascript
var createAffiliation = async function(affiliationName) {
    try {
        var client = await getClientForOrg(affiliationName);
        logger.debug('Successfully initialized the credential stores');
        var admins = hfc.getConfigSetting('admins');
        let adminUserObj = await client.setUserContext({username: admins[0].username, password: admins[0].secret});
        let caClient = client.getCertificateAuthority();
        let tmp = await caClient.newAffiliationService().create({ name: affiliationName }, adminUserObj );
        logger.debug('Successfully create affiliation');
        var response = {
            success: true,
            message: affiliationName + ' create Successfully',
        };
        return response;
    } catch(error) {
        logger.error('Failed to create affiliation with error: %s', error.toString());
        logger.error(error.stack.toString());
        return 'failed '+error.toString();
    }

};
```

`app.js`中添加代码如下

```javascript
// Create Affiliation
app.post('/affiliations', async function(req, res) {
    logger.info('<<<<<<<<<<<<<<<<< C R E A T E  A F F I L I A T I O N >>>>>>>>>>>>>>>>>');
    logger.debug('End point : /affiliation');
    var orgName = req.body.orgName;
    logger.debug('Affiliation name : ' + orgName);
    if (!orgName) {
        res.json(getErrorMessage('\'orgName\''));
        return;
    }

    let response = await helper.createAffiliation(orgName);

    if (response && typeof response !== 'string') {
        logger.debug('Successfully create affiliation %s ',orgName);
        res.json(response);
    } else {
        logger.debug('Failed to create affiliation %s with::%s',orgName,response);
        res.json({success: false, message: response});
    }
});
```

这样实现了rest接口，能够create affiliation，执行

```bash
$ fabric-ca-client affiliation list
```

即可看添加结果，最后一行

![](/assets/19-1.png)

## 5、使用balance-transfer遇到无效网络配置

### 问题描述

```bash
Error: Invalid network configuration due to missing configuration data
```

### 解决方案

- 原因就是在artifacts下的yaml文件缺失，所以找不到，涉及到的文件为`artifacts/network-config.yaml`,`artifacts/org1.yaml`,`artifacts/org2.yaml`等，文件所在[目录](https://github.com/hyperledger/fabric-samples/tree/release-1.2/balance-transfer/artifacts)

- 其中在config.js文件中配有文件查询的[代码](https://github.com/hyperledger/fabric-samples/blob/release-1.2/balance-transfer/config.js)

```javascript
var util = require('util');
var path = require('path');
var hfc = require('fabric-client');

var file = 'network-config%s.yaml';

var env = process.env.TARGET_NETWORK;
if (env)
	file = util.format(file, '-' + env);
else
	file = util.format(file, '');
// indicate to the application where the setup file is located so it able
// to have the hfc load it to initalize the fabric client instance
hfc.setConfigSetting('network-connection-profile-path',path.join(__dirname, 'artifacts' ,file));
hfc.setConfigSetting('Org1-connection-profile-path',path.join(__dirname, 'artifacts', 'org1.yaml'));
hfc.setConfigSetting('Org2-connection-profile-path',path.join(__dirname, 'artifacts', 'org2.yaml'));
// some other settings the application might need to know
hfc.addConfigFile(path.join(__dirname, 'config.json'));

```

- 其中要特别指出的是，在所有rest接口传入的orgName的变量都是根据`'Org1-connection-profile-path'`中的前面`Org1`来做文件查找的，在代码里体现就是

[代码位置](https://github.com/hyperledger/fabric-samples/blob/release-1.2/balance-transfer/app/helper.js#L40-L44)

```javascript
// get a fabric client loaded with a connection profile for this org
let config = '-connection-profile-path';
    
// build a client context and load it with a connection profile
// lets only load the network settings and save the client for later
let client = hfc.loadFromConfig(hfc.getConfigSetting('network'+config));
    
```

## 6、create Affiliation后依然报错Failed to get Affiliation

### 问题描述

- 在添加好上述rest接口之后，做了rest请求并且成功添加了org0，但是下一步注册依然报错

### 解决方案

- 原因在于在注册时被代码字符串连接了一个department1，所以只添加了org0是无法注册的，要添加org0.department1才可以，但是rest方式无法做到，所以我就删掉了后面的字符串拼接，[原代码](https://github.com/hyperledger/fabric-samples/blob/release-1.2/balance-transfer/app/helper.js#L89-L92)

```javascript
let secret = await caClient.register({
    enrollmentID: username,
    affiliation: userOrg.toLowerCase() + '.department1'
}, adminUserObj);
```

修改后的代码

```javascript
let secret = await caClient.register({
enrollmentID: username,
affiliation: userOrg.toLowerCase()
}, adminUserObj);
```

## 7、instantiate chaincode时args参数为空报错

### 问题描述

- 在发instantiate chaincode的http请求中包含如下参数

```bash
{
    "peers": ["peer4.org2.chainplaza.com"],
    "chaincodeName":"hospital2",
    "chaincodeVersion":"0",
    "chaincodeType": "golang",
    "args": []
}
```

其中args:[]这里参数为空，结果报错

```bash
"Incorrect arguments. Expecting no initial arguments"
```


### 解决方案

- 该错误是我们写的chaincode中的报错，代码如下：

```golang
args := stub.GetStringArgs()
if len(args) != 0 {
    return shim.Error("Incorrect arguments. Expecting no initial arguments")
}
```

- 注释掉fabric-sdk-node中Channel.js的[一行代码](https://github.com/hyperledger/fabric-sdk-node/blob/release-1.1/fabric-client/lib/Channel.js#L1363)

```javascript
const args = [];
//args.push(Buffer.from(request.fcn ? request.fcn : 'init', 'utf8'));
```

- 不注释掉就会导致chaincode一侧需要0个参数，而存在LSCC操作在真正的instantiate前面，但LSCC因为上面那行代码却有一个参数，故而报错，代操作代码如下

```javascript
        /*
	 * Internal method to handle both chaincode calls
	 */
	_sendChaincodeProposal(request, command, timeout) {
		let errorMsg = null;

		//validate the incoming request
		if (!errorMsg) errorMsg = clientUtils.checkProposalRequest(request);
		if (!errorMsg) errorMsg = clientUtils.checkInstallRequest(request);
		if (errorMsg) {
			logger.error('sendChainCodeProposal error ' + errorMsg);
			return Promise.reject(new Error(errorMsg));
		}
		const peers = this._getTargets(request.targets, Constants.NetworkConfig.ENDORSING_PEER_ROLE);

		// args is optional because some chaincode may not need any input parameters during initialization
		if (!request.args) {
			request.args = [];
		}

		// step 1: construct a ChaincodeSpec
		const args = [];
		//args.push(Buffer.from(request.fcn ? request.fcn : 'init', 'utf8'));

		for (let arg of request.args)
			args.push(Buffer.from(arg, 'utf8'));

		const ccSpec = {
			type: clientUtils.translateCCType(request.chaincodeType),
			chaincode_id: {
				name: request.chaincodeId,
				version: request.chaincodeVersion
			},
			input: {
				args: args
			}
		};

		// step 2: construct the ChaincodeDeploymentSpec
		const chaincodeDeploymentSpec = new _ccProto.ChaincodeDeploymentSpec();
		chaincodeDeploymentSpec.setChaincodeSpec(ccSpec);

		const signer = this._clientContext._getSigningIdentity(request.txId.isAdmin());
		const lcccSpec_args = [
			Buffer.from(command),
			Buffer.from(this._name),
			chaincodeDeploymentSpec.toBuffer()
		];
		if (request['endorsement-policy']) {
			lcccSpec_args[3] = this._buildEndorsementPolicy(request['endorsement-policy']);
		}

		const lcccSpec = {
			// type: _ccProto.ChaincodeSpec.Type.GOLANG,
			type: clientUtils.translateCCType(request.chaincodeType),
			chaincode_id: { name: Constants.LSCC },
			input: { args: lcccSpec_args }
		};

		const channelHeader = clientUtils.buildChannelHeader(
			_commonProto.HeaderType.ENDORSER_TRANSACTION,
			this._name,
			request.txId.getTransactionID(),
			null,
			Constants.LSCC,
			clientUtils.buildCurrentTimestamp(),
			peers[0].getClientCertHash()
		);
		const header = clientUtils.buildHeader(signer, channelHeader, request.txId.getNonce());
		const proposal = clientUtils.buildProposal(lcccSpec, header, request.transientMap);
		const signed_proposal = clientUtils.signProposal(signer, proposal);

		return clientUtils.sendPeersProposal(peers, signed_proposal, timeout)
			.then(
				function (responses) {
					return [responses, proposal];
				}
			);
	}
```