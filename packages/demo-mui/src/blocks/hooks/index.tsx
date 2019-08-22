import { DeviceHub } from "@material-ui/icons";
import UI from "./UI";

/**
 * 如果没有 component，直接显示匹配的子模块
 */
export default {
  path: "hooks",
  title: "Hooks",
  icon: DeviceHub,
  description: "一些有用的 React Hooks",
  component: UI,
  blocks: [
    import("./persist"),
    import("./global"),
    import("./search"),
    import("./hash"),
  ],
};