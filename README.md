# Vno, just another ghost theme

## 总览

`Vno` 是一个从 [Dale Anthony 的 Uno](https://github.com/daleanthony/uno) 派生出的 Ghost 主题。它遵从简洁和响应式的设计风格，拥有一个独立的封面，字体图标以及多种颜色。

## 特性

### 封面

主题有一个全屏的带有模糊（和半透明）效果的封面页，您可以选择喜欢的颜色，当然也可以添加您自己喜欢的颜色。您可以在封面页上放置头像，博客名字，简介以及社交网络导航等等。

### 响应式设计和动画

Vno 遵循响应式设计，所以应该能在各种设备上都表现良好。很多事件是由动画驱动的，这要感谢 [Animate.css](http://daneden.github.io/animate.css/) 的帮助。

### SASS

Vno 是基于 SASS 创建的，但是如果您不再希望继续维护可扩展性，您也可以忽略这个再开发的流程。不过如果您懂一些 HTML 和 CSS 的话，对现有主题做出修改是轻而易举的。

### 代码高亮

使用了 [highlight.js](http://highlightjs.org) 作为主题的代码高亮引擎。您可以在您的技术博客上以简洁优美的形式呈现您的代码。

## 使用

### 安装

您应该已经建立了一个可用的 [ghost 博客](https://ghost.org)。如果您还没有准备好，请参考[官方的安装页面](http://docs.ghost.org/installation/)来配置一个属于您自己的 ghost 博客。

一旦您准备就绪，只需要将这个 repo clone 到您博客的主题文件夹下：`content/themes/`，然后重启 ghost，您应该就能在博客的设定面板中看到 `Vno` 了。

### 配置
需要在站点的code injection里增加一些初始化配置，类似这样：
```
<style>
.mno-cover {
  background-color: rgba(37, 104, 163, 0);
  background-image: -webkit-linear-gradient(-410deg, rgba(37, 104, 163, 0.8) 20%, rgba(18, 51, 80, 0.8));
  background-image: linear-gradient(140deg,rgba(37, 104, 163, 0.3) 20%, rgba(18, 51, 80, 0.3)); }
</style>
<script>
 var mno = {
    "disqus": {
        "link": "https://mythsman.disqus.com/embed.js",
        "gfw_check": true
    },
    "copyright": {
        "link": "http://www.beian.miit.gov.cn",
        "name": "苏ICP备15055270号-1"
    },
    "social": {
        "github": {
            "name": "@mythsman",
            "link": "https://github.com/mythsman"
        },
        "douban": {
            "name": "@mythsman",
            "link": "https://www.douban.com/people/mythsman/"
        },
        "qq": {
            "name": "@阿尔卑斯君°",
            "link": "tencent://message/?Menu=yes&uin=1276077732"
        },
        "bilibili": {
            "name": "@mythsman",
            "link": "https://space.bilibili.com/101787792"
        },
        "netease": {
            "name": "@mythsman",
            "link": "https://music.163.com/#/user/home?id=261910312"
        },
        "steam": {
            "name": "@mythsman",
            "link": "https://steamcommunity.com/id/mythsman/"
        },
        "rss": {
            "name": "@mythsman",
            "link": "https://blog.mythsman.com/rss/"
        },
        "mail": {
            "name": "@mythsman",
            "link": "mailto:mythsman@foxmail.com"
        }
    }
}
</script>
```

#### MathJax
主题内部集成了MathJax，您只需要在发布文章时，增加一个 "MathJax" 标签，即可让该文章支持 LaTeX 语法。

#### 导航按钮

也在 `partials/side-panel.hbs` 文件中定义。不要忘了把它们换成您自己的链接。您不应该更改或者至少保留 `/#blog` 链接，因为这个链接将触发一个转场到您的博客主页面的动画。

#### 社交按钮

可以在 `partials/social.hbs` 中按照例子将社交网络的按钮替换成您需要的链接和图标。图标都来自 Font Awesome，您可以访问它们的[网站](http://fontawesome.io/icons/)来查看您能使用的所有图标。

### 代码高亮主题

Vno 使用经典的 [tomorrow](http://jmblog.github.io/color-themes-for-highlightjs/tomorrow/) 主题作为默认的代码高亮配色。您也可以选择和使用您最喜欢的配色，将配色文件直接放到 `assets/css` 文件夹下， 然后将 `default.hbs` 中的 `css/tomorrow.css` 改为您的文件来使配置生效。想要更多的配色方案的话，可以看看这个[站点](http://jmblog.github.com/color-themes-for-highlightjs/)。

## 开发

为了简单地对主题进行修改和开发，您需要安装 sass 编译器以及 bourbon。如果您在本地有 ghost 环境的话，这些应该已经安装好了，因为 ghost 运行是需要这些部件的。

您可以在终端中进行一些检查，来看看是否已经安装完成。如果没有问题的话，您应该可以在命令行后看到对应的工具的版本号。

### SASS

```bash
sass -v
> Sass 3.3.6 (Maptastic Maple)
```

如果 SASS 没有能正确安装的话，请参见 [Sass 安装页面](http://sass-lang.com/install)进行安装。

### Bourbon

```bash
bourbon version
> Bourbon 4.0.1
```

如果 Bourbon 没有能正确安装的话，请参见 [Bourbon 的网站](http://bourbon.io)进行安装。

### 开始开发

验证安装后就可以开始开发了。首先我们要将 bourbon 加载到 `scss` 文件夹里。

在主题文件夹下执行 `bourbon install` 来加载 bourbon：

```bash
bourbon install --path assets/scss
> bourbon files installed to assets/scss/bourbon/
//Or "Bourbon files already installed, doing nothing." if you already installed it.
```

然后就可以使用 sass 的命令行工具来监视文件夹中的 scss 文件的改动，并自动重新编译了。

```bash
pwd
> In the vno theme root folder: {blog_path}/content/themes/vno

sass --watch assets/scss/vno.scss:assets/css/vno.css
>>>> Sass is watching for changes. Press Ctrl-C to stop.
```

现在，任何对于 scss 文件的改动都将自动反映到最终的 `/css/vno.css` 文件中了。

### 祝你好运

玩得开心，也请记得给我反馈。如果您发现了什么 bug (我刚入门 web 开发，这简直是必然的)，请直接指出，如果还能附带一个 pull request 修正的话，那真的感激万分！

如果您觉得这个主题还不错的话，欢迎加颗星星或者 follow 我一下以示支持，这将对我和我的项目的发展提供不可估量的帮助。再次感谢。

## 许可

非常感谢 [Dale Anthony](https://github.com/daleanthony) 和他的 [Uno](https://github.com/daleanthony/uno)。Vno 是一个基于 Uno 大量工作的主题，我在页面布局，动画，字体以及其他一些我也不记得了的地方做出了不少改动。

Vno 遵循 Uno 的要求按照 [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/) 进行授权。点击上面的链接可以了解到更多信息。
