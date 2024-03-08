# popup-footnote

This is a javascript file for epub

epub弹窗注释脚本，适用于桌面端epub阅读器，鼠标指针移动到注释链接上弹出注释窗口，部分阅读器不支持JavaScript脚本或与软件功能相冲突则无法使用。

# 使用方法

将popup-footnote.min.js导入Misc文件夹

在```<head>```标签下添加```<script type="text/javascript" src="../Misc/popup-footnote.min.js"></script>```

在注释链接中添加```class=“footnote-link”```

在css中添加
```css
p.popup {
  text-indent: 0em;
  font-size: 0.8em;
  line-height: 1.5em;
  margin: 0.5em;
  display: none;
  visibility: hidden;
  position: fixed;
  background-color: white;
  padding: 10px;
  overflow: auto;
  width: max-content;
  max-width: 30em;
  max-height: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}
```
