# DB大作业 web部分
> 简单实现一下 AI 大作业的web部分，使用 flask 框架实现。
>
>实现了部分功能，代码仅供参考。
>
> 实现功能：
>   - 在左侧画板上绘画
>   - 每次绘画一笔，会在右侧显示预测的分数和红色突出显示预测结果
>   - 清空画布
>   - 简单的 About 页面
>
>主要是提供一个在线地址用于浏览代码和项目:P
## 项目结构
```
back/                              #项目文件夹名
    myvenv/                         #虚拟环境，用于管理依赖
    static/							#存放静态文件如：CSS，JS等代码
    templates/                      #模板文件夹
        index.html                      #主页模板
        macros.html                     #宏，模板函数，可以重复利用模板
    requirements.txt                #依赖文件
    .flaskenv                       #flask环境变量
    .gitignore                      #不提交到git的文件
    README.md                       #项目自述/介绍文件
```
## 如何使用本项目
1. 下载项目文件
    ```
    点击中间偏右侧的 绿色code按钮 下载zip文件或者使用命令下载
    git clone https://github.com/plusmultiply0/HWDR.git （需要先安装好Git）
    ```
2. 安装虚拟环境(back目录下的命令行)
    ```bash
    python -m venv myvenv     #创建虚拟环境，需要提前在系统上安装配置好 Python
    myvenv\scripts\activate   #激活虚拟环境 in cmd
    ```
3. 初始化项目(激活虚拟环境后，在back目录下)
    ```bash
    pip install -r requirements.txt #根据依赖表安装，建议安装前切换国内镜像源
    ```
5. 运行项目
    ```bash
    # 运行项目于 http://127.0.0.1:5000/（打开浏览器输入此地址，就可以看到）
    flask run
    ```
## 最后
按照此 README 的操作指示，应该是能成功跑起来的;)

有问题欢迎提 [issue](https://github.com/plusmultiply0/db-big-assignment/issues) 或者 [email](kimzhou36@foxmail.com)

觉得做的还可以的话，麻烦右上角点一下star:star:
