# 整活用 应急用

## 对应路径

- にじGTA 指名手配: https://mtabbj.github.io/tools/smth

## 记录

- 关于切换路径：
```
    ghpage 是不支持配置 rewrite 规则的, 因此访问一个不存在的目录时, 并不会给我们做重定向的功能, 所以此时就会看到 404 页面，所以在404页面做控制跳转逻辑。
    使用Github Action 提供的workflow配置文件来生成404.html。
```
