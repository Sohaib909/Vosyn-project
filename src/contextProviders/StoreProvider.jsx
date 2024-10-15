"use client";

import React from "react";
import { Provider } from "react-redux";

import store from "../../store";

/**
 *
 * @param {*} children - Children elements
 *
 * @returns - Children elements wrapped in a provider
 */
const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
