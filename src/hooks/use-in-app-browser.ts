"use client";

import {
  detectInAppBrowser,
  inAppBrowserLabel,
  type InAppBrowserApp,
} from "@/lib/in-app-browser";
import { useLayoutEffect, useState } from "react";

type InAppBrowserState = {
  checked: boolean;
  isInApp: boolean;
  app: InAppBrowserApp | null;
  appName: string | null;
};

const initialState: InAppBrowserState = {
  checked: false,
  isInApp: false,
  app: null,
  appName: null,
};

export function useInAppBrowser(): InAppBrowserState {
  const [state, setState] = useState<InAppBrowserState>(initialState);

  useLayoutEffect(() => {
    const { isInApp, app } = detectInAppBrowser(navigator.userAgent);
    setState({
      checked: true,
      isInApp,
      app,
      appName: isInApp ? inAppBrowserLabel(app) : null,
    });
  }, []);

  return state;
}
