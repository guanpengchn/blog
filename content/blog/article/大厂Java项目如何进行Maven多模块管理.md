---
title: 大厂Java项目如何进行Maven多模块管理
date: 2020-05-02
tag: 文章
cover: https://files.mdnice.com/pic/1033c334-3f45-4877-bb91-50f7f6e0fa24.png
---

## 什么是多模块管理

多模块管理简单地理解就是一个 Java 工程项目中不止有一个 pom.xml 文件，会在不同的目录中有多个这样的文件，进而实现 Maven 的多模块管理

## 为什么要使用多模块管理

随着业务的增长，代码会出现以下问题：

- 不同业务之间的代码互相耦合，难以区分且快速定位问题
- 增加开发成本，入手难度增高
- 开发界线模糊，不易定位到具体负责人
- 对于有特殊需求的模块无法拆解，比如：上传 maven 仓库只需要部分代码即可，但由于只有 1 个模块，不得不全部上传

故而拆分模块之后，可以避免上述问题

## 模块拆分方案

通常拆分有 2 种方案

**按照结构拆分**

```
- project
  - project-service
  - project-controller
  - project-dao
```

**按照业务拆分**

```
- project
  - project-order
  - project-account
  - project-pay
```

## 实际项目结构

以一个普通 Spring Boot 项目为例，首先放一张图，看一下整体项目完成后的结构

![](https://files.mdnice.com/pic/1886b48b-fcc2-43ee-9ab0-095ba6970dc3.jpg)

其中目录结构为

```
- detail-page
  - detail-client
  - detail-service
  - detail-start
```

- detail-client 用于放需要打包传到 maven 库的代码
- detail-service 用于放置主要的业务逻辑代码
- detail-start 用于放启动代码

其中需要注意的是 pom.xml 的文件的配置，该配置决定了父子模块之间的关系

**1、detail-page 的 pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.6.RELEASE</version>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <groupId>com.drawcode</groupId>
    <artifactId>detail-page</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>  <!-- 此处必须为pom -->
    <name>detail-page</name>

    <properties>
        <java.version>1.8</java.version>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <!-- modules即为父子关系 -->
    <modules>
        <module>detail-client</module>
        <module>detail-service</module>
        <module>detail-start</module>
    </modules>

    <!-- dependencyManagement非常重要，决定了子pom.xml是否可以直接引用父pom.xml的包 -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter</artifactId>
                <version>2.2.6.RELEASE</version>
            </dependency>

            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-web</artifactId>
                <version>2.2.6.RELEASE</version>
            </dependency>

            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-test</artifactId>
                <scope>test</scope>
                <exclusions>
                    <exclusion>
                        <groupId>org.junit.vintage</groupId>
                        <artifactId>junit-vintage-engine</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>

            <!--注意这个包就是项目本身的模块-->
            <dependency>
                <groupId>com.drawcode</groupId>
                <artifactId>detail-service</artifactId>
                <version>${project.version}</version>
                <!-- 这个版本就表示0.0.1-SNAPSHOT -->
            </dependency>

            <!--注意这个包就是项目本身的模块-->
            <dependency>
                <groupId>com.drawcode</groupId>
                <artifactId>detail-client</artifactId>
                <version>${project.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <!-- 注意此处为空 -->
        </plugins>
    </build>

</project>
```

**2、detail-start 的 pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <!--parent使用的即为父pom.xml的信息-->
    <parent>
        <groupId>com.drawcode</groupId>
        <artifactId>detail-page</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <artifactId>detail-start</artifactId>
    <packaging>jar</packaging> <!-- 注意此处要配置为jar -->
    <name>detail-start</name>

    <!--子pom.xml不必添加dependencyManagement-->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <!--这里可以看到因为父pom.xml已经引用了自身项目的包模块，所以这里可以不加version直接使用-->
        <dependency>
            <groupId>com.drawcode</groupId>
            <artifactId>detail-service</artifactId>
        </dependency>

    </dependencies>


    <build>
        <plugins>
            <!--因为启动类在detail-start中，所以此处必须添加该plugin-->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

**3、detail-service 的 pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <parent>
        <groupId>com.drawcode</groupId>
        <artifactId>detail-page</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath> <!-- lookup parent from repository -->
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <artifactId>detail-service</artifactId>
    <packaging>jar</packaging>
    <name>detail-service</name>

    <!--detail-service依赖于detail-client-->
    <dependencies>
        <dependency>
            <groupId>com.drawcode</groupId>
            <artifactId>detail-client</artifactId>
        </dependency>
    </dependencies>
</project>
```

**4、detail-start 的 pom.xml**

因为 detail-start 没有任何依赖所以比较简单

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <parent>
        <groupId>com.drawcode</groupId>
        <artifactId>detail-page</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath> <!-- lookup parent from repository -->
    </parent>

    <modelVersion>4.0.0</modelVersion>
    <artifactId>detail-client</artifactId>
    <packaging>jar</packaging>
    <name>detail-client</name>

    <dependencies>
    </dependencies>


    <build>
    </build>

</project>
```

通过上述文件我们可以分析出以下关系：

```
- detail-page：父模块
  - detail-client：子模块，无依赖
  - detail-service：子模块，依赖detail-client
  - detail-start：子模块，依赖detail-service
```

> 注意：在依赖引用过程中，千万不可以出现循环依赖，比如 client 引用了 service，service 也引用了 client，如果出现这种情况 maven 在打包的时候会直接报错

其中建议除了各个子模块单独使用的包之外，其他的都要在父模块下的 pom.xml 中配置包信息，这样便于包的版本控制

![](https://files.mdnice.com/pic/e1aa44dd-cd24-41fd-8db3-54547151249f.jpg)

![](https://files.mdnice.com/pic/a3a413a4-cd10-4306-a36a-560a5bf1b15f.jpg)

项目内部存在了包的依赖之后，不同模块之间的代码即可进行使用，比如 detail-service 依赖 detail-client，那么 detail-client 中的 Test2 就可以被 detail-service 使用了

![](https://files.mdnice.com/pic/f18b56bc-79d0-40d8-8666-c6cb988acf0b.jpg)

![](https://files.mdnice.com/pic/efb25b45-84fe-4625-bc80-f2997d24e6fc.jpg)

但是反过来 detail-client 不可以使用 detail-service 中的类，因为依赖是单向的关系

## 如何启动

启动指令如下

```shell
$ mvn clean install && mvn spring-boot:run -pl detail-start
```

其中 spring-boot:run 可以使用就是因为 spring-boot-maven-plugin 的存在

-pl detail-start 则代表的是有 application 启动类的子模块目录

![](https://files.mdnice.com/pic/c68cfa09-f9d1-43fd-b291-8900def61f49.jpg)

## 参考代码

https://github.com/guanpengchn/detail-page/tree/demo1

![](https://files.mdnice.com/pic/c5928799-f819-4460-ac10-bc610ddb3947.jpg)