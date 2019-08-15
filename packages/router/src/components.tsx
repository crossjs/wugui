import { usePathname } from "@spax/history";
import pathToRegexp from "path-to-regexp";
import React from "react";
import { useChild } from "./hooks";
import { CarrierProps, LinkProps, RouterProps, SwitchProps } from "./types";
import { getMatched } from "./utils";

export const Router: React.FC<RouterProps> = ({ children, scope, modules }: RouterProps): any => {
  const [pathname] = usePathname();
  // 为了外部能够第一时间获得匹配到的顶级模块
  const matchedState = getMatched(scope, pathname, 1, modules);
  return matchedState ? children : null;
};

export const Switch: React.FC<SwitchProps> = ({
  level,
  modules,
  scope,
  loose = false,
  useAuth = () => true,
  Pending = () => null,
  NotFound = () => null,
  Forbidden = () => null,
  children = null,
}: SwitchProps): any => {
  const [pathname] = usePathname();
  const matchedState = getMatched(scope, pathname, level, modules, loose);
  const authed = useAuth(matchedState ? matchedState[0] : undefined);

  if (matchedState) {
    if (authed) {
      // tslint:disable-next-line: no-shadowed-variable
      const { component: Matched, data } = matchedState[0];
      return (
        <Matched
          {...data}
          {...matchedState[1]}
          $$meta={matchedState[0]}
          $$scope={scope}
          $$useAuth={useAuth}
          $$NotFound={NotFound}
          $$Forbidden={Forbidden}
        />
      );
    }
    // pending
    if (authed === undefined) {
      return <Pending />;
    }
    return <Forbidden />;
  }

  // 宽松模式，不显示 404
  if (loose) {
    return children;
  }

  return <NotFound />;
};

export const Carrier: React.FC<CarrierProps> = ({children = null, ...props}: CarrierProps) => {
  const MatchedChild = useChild(props);
  return <MatchedChild>{children}</MatchedChild>;
};

/**
 * @example
 * <Link to="/login?rv=1">Login</Link>
 * <Link to={{pathname: "/login", search: {rv: 1}}}>Login</Link>
 * // <a href="/#/login?rv=1">Login</a>
 */
export const Link: React.FC<LinkProps> = ({children, to, as: As, component: Cp, ...props}: LinkProps) => {
  if (typeof to === "boolean") {
    return <a {...props}>{children}</a>;
  }
  if (typeof to === "string") {
    to = {
      pathname: to,
    };
  }
  if (!to.pathname) {
    to.pathname = "/";
  } else if (to.pathname.charAt(0) !== "/") {
    to.pathname = `/${to.pathname}`;
  }
  const url = pathToRegexp.compile(to.pathname)(to.params || {});
  return (
    As
    ? <As {...props} href={`/#${url}`}>{children}</As>
    : Cp
    ? <Cp {...props} href={`/#${url}`}>{children}</Cp>
    : <a {...props} href={`/#${url}`}>{children}</a>
  );
};
