# Mno, just another ghost theme

## 总览

`Mno` 是一个从 [Dale Anthony 的 Uno](https://github.com/daleanthony/uno) 、[Onevcat 的 Vno](https://github.com/onevcat/vno) 派生出的双栏 Ghost 主题，同时借鉴了[Litten 的 Yillia](https://github.com/litten/hexo-theme-yilia) hexo 主题的样式，希望能做到简洁、易配、高效。

## Demo

可以参考我自己的[博客](https://blog.mythsman.com)，和我帮女朋友搭[博客](https://mikito.mythsman.com)。

## 特性

#### 响应式设计和动画

Mno 遵循响应式设计，所以应该能在各种设备（PC、Mobile）上都表现良好。很多事件是由动画驱动的，这要感谢 [Animate.css](https://animate.style/) 的帮助。

#### 代码高亮&MathJax

使用了 [highlight.js](http://highlightjs.org) 插件，并以[tomorrow-night](https://highlightjs.org/static/demo/)作为主题的代码高亮引擎。您可以在您的技术博客上以简洁优美的形式呈现您的代码。同时按需集成了[MathJax](https://www.mathjax.org/)，帮助您方便地呈现数学公式。

#### Ghost自定义配置

所有配置都可以直接通过 Ghost 的[后台自定义配置](https://ghost.org/docs/themes/custom-settings/)完成，几乎不用直接修改代码。

#### 简约封面&社交按钮

博客主页采用一个精简的背景封面和多个可选的社交链接，目前支持集成Github、Douban、QQ、Bilibili、Netease、Steam、Rss、Email等图标。这得感谢[iconfont 矢量库](https://www.iconfont.cn/)。

#### 无限下拉的首页

这里借鉴了Ghost官方的 [Casper](https://github.com/TryGhost/Casper/blob/main/assets/js/infinite-scroll.js) 主题，集成了首屏无限下拉的功能，免去了总是要点“下一页”的烦恼。

#### 集成了归档页和标签云

为了方便快速检索所有文章标题，支持了archives页面，同时利用[jqcloud](https://github.com/lucaong/jQCloud) 集成了基于词频的标签云。

#### 支持集成Disqus评论

思考再三还是集成了Disqus评论，不过由于大陆内地被GFW封的比较厉害，因此增加了一个GFW检测功能，只有当前用户能访问外网时、才会在 post 底部弹出Disqus评论框。

## 配置

#### 安装

您应该已经建立了一个可用的 [ghost 博客](https://ghost.org) (version > 4.0.0 )。如果您还没有准备好，请参考[官方的安装页面](http://docs.ghost.org/installation/)来配置一个属于您自己的 ghost 博客。

一旦您准备就绪，只需要将这个 repo clone 到您博客的主题文件夹下：`content/themes/`，然后重启 ghost，您应该就能在博客的设定面板中看到 `Mno` 了。

#### Ghost后台配置
TODO

#### 导航栏配置

也在 `partials/side-panel.hbs` 文件中定义。不要忘了把它们换成您自己的链接。您不应该更改或者至少保留 `/#blog` 链接，因为这个链接将触发一个转场到您的博客主页面的动画。

#### 动态路由配置
TODO

#### MathJax配置
TODO
主题内部集成了MathJax，您只需要在发布文章时，增加一个 "MathJax" 标签，即可让该文章支持 LaTeX 语法。


## 开发

为了简单地对主题进行修改和开发，您需要安装 sass 编译器。如果您在本地有 ghost 环境的话，这些应该已经安装好了，因为 ghost 运行是需要这些部件的。

您可以在终端中进行一些检查，来看看是否已经安装完成。如果没有问题的话，您应该可以在命令行后看到对应的工具的版本号。

#### SASS

Vno 是基于 SASS 创建的，但是如果您不再希望继续维护可扩展性，您也可以忽略这个再开发的流程。不过如果您懂一些 HTML 和 CSS 的话，对现有主题做出修改是轻而易举的。

如果 SASS 没有能正确安装的话，请参见 [Sass 安装页面](http://sass-lang.com/install)进行安装。

#### 开始开发

使用 sass 的命令行工具来监视文件夹中的 scss 文件的改动，并自动重新编译了。

```bash
pwd
> In the mno theme root folder: {blog_path}/content/themes/mno

sass --watch assets/scss/mno.scss:assets/mno.css
>>>> Sass is watching for changes. Press Ctrl-C to stop.
```

现在，任何对于 scss 文件的改动都将自动反映到最终的 `mno.css` 文件中了。

#### 祝你好运

玩得开心，也请记得给我反馈。如果您发现了什么 bug (我刚入门 web 开发，这简直是必然的)，请直接指出，如果还能附带一个 pull request 修正的话，那真的感激万分！

如果您觉得这个主题还不错的话，欢迎加颗星星或者 follow 我一下以示支持，这将对我和我的项目的发展提供不可估量的帮助。再次感谢。

## 许可

Mno 遵循 Uno 的要求按照 [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/) 进行授权。点击上面的链接可以了解到更多信息。
