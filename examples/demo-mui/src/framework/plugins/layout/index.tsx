import { AnyObject, IBlock, IHooks, IPO, TPlugin } from "@spax/core";
import React, { ReactElement, useEffect } from "react";
import { DocumentTitle } from "./components/DocumentTitle";
import { useMatchedList } from "./hooks";

export default [
  "Layout",
  ["Level"],
  ({ parse, render }: IHooks, option: IPO) => {
    parse.tap((current: IBlock, parent: IBlock) => {
      return {
        ...current,
        ...normalizeLayout(current, parent, option),
      };
    });

    render.tap((element: ReactElement) => {
      return (
        <>
          <DocumentTitle fallback={option.siteTitle} />
          {element}
        </>
      );
    });
  },
] as TPlugin;

const StateCollector: React.FC<any> = ({ level, matchedProps }: any) => {
  const [state, setState] = useMatchedList();

  useEffect(() => {
    const newState = state.slice(0, level);
    newState[level - 1] = matchedProps;
    setState(newState);
    // eslint-disable-next-line
  }, [level, matchedProps]);

  return null;
};

const LayoutWrapper: React.FC<any> = ({
  children = null,
  level,
  layout,
  option,
}: any) => {
  if ((level === 1 || layout)) {
    const Layout = layout === "blank"
      ? require("./layouts/Blank").default
      : require("./layouts/Admin").default;

    return (
      <Layout option={option}>
        {children}
      </Layout>
    );
  }

  return children;
};

function normalizeLayout(
  current: IBlock,
  parent: IBlock,
  option: IPO,
): AnyObject {
  const { level, layout, component: C } = current;
  return {
    component: (props: any) => {
      return (
        <>
          <StateCollector level={level} matchedProps={props} />
          <LayoutWrapper level={level} layout={layout} option={option}>
            <C {...props} />
          </LayoutWrapper>
        </>
      );
    },
  };
}