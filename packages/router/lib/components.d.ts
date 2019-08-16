import React from "react";
import { CarrierProps, LinkProps, RouterProps, SwitchProps } from "./types";
export declare const Router: React.FC<RouterProps>;
export declare const Switch: React.FC<SwitchProps>;
export declare const Carrier: React.FC<CarrierProps>;
/**
 * @example
 * <Link to="/login?rv=1">Login</Link>
 * <Link to={{pathname: "/login", search: {rv: 1}}}>Login</Link>
 * // <a href="/#/login?rv=1">Login</a>
 */
export declare const Link: React.FC<LinkProps>;
