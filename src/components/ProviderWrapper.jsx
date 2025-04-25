"use client";

import { store } from "@/app/store/store";
import React from "react";
import { Provider } from "react-redux";

const ProviderWrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ProviderWrapper;
