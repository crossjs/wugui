# 路由插件 RouterPlugin

基于 React hooks 的简单而强大的路由。

![npm (scoped)](https://img.shields.io/npm/v/@spax/plugin-router?color=4caf50)

## 源码 Code

[@spax/plugin-router](https://github.com/crossjs/spax/tree/master/packages/plugin-router)

## 选项

```typescript
{
  NotFound: ReactComponent;
  Forbidden: ReactComponent;
  useAuth: (current: IBlock) => boolean | undefined;
}
```