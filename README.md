# popup-footnote

This is a javascript file for epub

epub弹窗注释脚本，适用于桌面端epub阅读器，鼠标指针移动到注释链接上弹出注释窗口，部分阅读器不支持JavaScript脚本或与软件功能相冲突则无法使用。

# 使用方法

将popup-footnote.js导入Misc文件夹

在```<head>```标签下添加```<script type="text/javascript" src="../Misc/popup-footnote.min.js"></script>```

在注释链接中添加```class="footnote-link"```

在注释图标中添加```class="footnote-image"```

在css中添加
```css
/* footnote */

.footnote-link {
    position: relative;
	display: inline-flex;
	top: -0.3em;
}

.footnote-image {
	height: 1em;
	width: 1em;
	pointer-events: none;
}

p.popup {
	text-indent: 0em;
	font-size: 0.8em;
	line-height: 1.5em;
	margin: 0.5em;
    display: none;
	visibility: hidden;
	position: fixed;
    background-color: rgba(36, 41, 46, 0.8);
    padding: 10px;
    overflow: auto;
	width: max-content;
    max-width: 30em;
    max-height: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	pointer-events: none;
	color: white;
	border-radius: 8px;
}

section {
	display: none;
}

aside p {
	text-indent: 0em;
	font-size: 0.8em;
	margin: 0.2em;
	line-height: 1.5em;
	
}

.popup.is-shown {
  display: block;
  visibility: visible;
}

.popup.is-hiding {
  display: block;
  visibility: visible;
  animation: fade 0.3s 1 forwards;
  -webkit-animation: fade 0.3s 1 forwards;
}

.popup.is-visible {
  animation: show 0.3s 1 forwards;
  -webkit-animation: show 0.3s 1 forwards;
}

@-webkit-keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.9;
    }
}

@-webkit-keyframes fade {
    0% {
        opacity: 0.9;
    }

    100% {
        opacity: 0;
    }
}

@keyframes show {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 0.9;
    }
}

@keyframes fade {
    0% {
        opacity: 0.9;
    }

    100% {
        opacity: 0;
    }
}
```
