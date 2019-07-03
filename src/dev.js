/**
 * webpack-dev-server entry point for debugging.
 * This file is not bundled with the library during the build process.
 */
import React from "react";
import ReactDOM from "react-dom";
import AntdProLayout from "./index.js";

const node = document.getElementById("app");
const BasicLayout=AntdProLayout.BasicLayout;
const DefaultFooter=AntdProLayout.DefaultFooter;

ReactDOM.render(<DefaultFooter />, node);
