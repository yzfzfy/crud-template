# 增删改查模板代码

This project is a template page code based on the React framework and Ant Design (antd) component library. It provides my best practices for developing CRUD (Create, Read, Update, Delete) pages. The key is abstracting common logic for table components in business scenarios, improving development efficiency, and primarily serving as a code base for copying during page development. Currently, the code depends on Ant Design 5.x and Next.js 15.x, but these are not mandatory; please adapt accordingly if using other versions.

本目录代码为增删改查模板代码，根据需要选择编辑模式，熟悉两个模式代码逻辑，复制对应模板代码到目录。

## 出发点

公司的业务大多数都是做后台业务系统，其中存在大量的增删改查页面。在开发中发现不同的人写表格、表单逻辑方式各异，且有各种缺陷。故总结此代码（其实主要是对于业务逻辑如何接入 Modal 组件的思考），规定一种开发模式，统一使用逻辑和降低维护心智，提高效率。

业务中遇到的问题：

1. ProTable 的 API 使用。ProTable 的设置系统内不统一。最常见的对于请求数据其他参数的使用，对应 protable 内的 params props
1. 对于 Modal 组件的 visible 状态维护在哪一层不统一
1. 维护在父组件，且通过 props 传递给子组件，子组件中封装 Modal 组件。modal 组件的点击回调再通知父组件改变 visible。这种方式交互比较复杂。比如在点击确定时，保存接口=>回调刷新表格数据，这就需要有在保存后父组件单独传递一个刷新回调给组件供子组件调用。这样的 props 可以能过多，不好管理，而且父子组件逻辑区分不明显。
1. 维护在父组件但不向下传递。或者在父组件中使用 `visible && <EditModal />`的方式,这种缺点很明显，modal 显隐的动画没有了。
1. 维护在子组件。因为 modal 状态显示还是需要父组件触发，所以这种方式无法避免父组件和子组件中都需维护 visible 状态。
1. 方案：维护在父组件。
1. 对于表单内容应该怎么维护、怎么交互实现不统一。本模板方案：不管是 modal 内表单、表单页面都要当成一个抛出值的统一组件来看。和表单的交互逻辑都是获取表单值、使用表单值。
1. 表单组件与主列表页面的交互方式不统一。本模板方案：规定表单页有几种状态：新增、编辑、查看。都是主列表业务逻辑不同触发传入的，其中编辑和查看模式可能有默认值传入、新增和编辑需要吐出新值等。

此模板好处：

1. 规定了页面需要的接口。复制后只需要修改几个增删改查接口地址即可。
2. 新增、编辑、查看模式统一。只是表单模式状态和传入 orops 不同。模板已尽可能的少定义 state
3. modal 组件使用方式统一且 modal 逻辑与业务逻辑隔离。将 modal 组件的 content 独立为一个组件，只负责展示或抛出表单值，其他业务逻辑在上层维护，这样 modal 内容的开发更通用，上手更快。

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
