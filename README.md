# 增删改查模板代码

This project is a template page code based on the React framework and Ant Design (antd) component library. It provides my best practices for developing CRUD (Create, Read, Update, Delete) pages. The key is abstracting common logic for table components in business scenarios, improving development efficiency, and primarily serving as a code base for copying during page development. Currently, the code depends on Ant Design 5.x and Next.js 15.x, but these are not mandatory; please adapt accordingly if using other versions.

本目录代码为增删改查模板代码，根据需要选择编辑模式，熟悉两个模式代码逻辑，复制对应模板代码到目录。

## 目录结构

```
├── 📄 README.md                      # 模板使用说明文档
├── 📁 modal-modee/                   # 弹窗模式模板
│   ├── 📄 api.ts                     # API接口定义
│   ├── 📄 columns.tsx                # 表格列配置
│   ├── 📁 form-modal/                # 弹窗表单组件
│   │   ├── 📄 index.tsx              # 弹窗入口文件
│   │   ├── 📄 modal-content.tsx      # 弹窗内容组件
│   │   └── 📄 types.ts               # TypeScript类型定义
│   └── 📄 page.tsx                   # 弹窗模式主页面
└── 📁 page-mode/                     # 页面模式模板
    ├── 📄 api.ts                     # API接口定义
    ├── 📄 columns.tsx                # 表格列配置
    ├── 📁 form-page/                 # 页面表单组件
    │   ├── 📄 page.tsx               # 表单页面
    │   └── 📄 style.ts               # 样式文件
    └── 📄 page.tsx                   # 页面模式主页面
```

## 定义规范

- 操作按钮 编辑、查看、删除
- 操作列最多显示三个操作按钮，多于三个使用下拉菜单展示

## 两种编辑模式

- 打开新页面的编辑模式 form-page
  复制 page-mode 文件夹下代码

- 弹窗编辑模式 form-modal
  复制 modal-mode 文件夹下代码

具体使用哪种模式，根据需求选择。如果需求未特别指定使用哪种模式，建议：
_如果字段过多或表单页结构复杂含有非常规表单样式（如：表格、Tab、Step 等），使用 form-page 模式，其他都使用 form-modal 模式。_
