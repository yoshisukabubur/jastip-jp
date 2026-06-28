export type InAppBrowserApp =
  | "line"
  | "instagram"
  | "facebook"
  | "twitter"
  | "wechat"
  | "kakaotalk"
  | "other";

export function detectInAppBrowser(userAgent: string): {
  isInApp: boolean;
  app: InAppBrowserApp | null;
} {
  const ua = userAgent;

  // LINE: Android `Line/26.8.0/IAB`, iOS `Safari Line/12.18.0`
  if (/\bLine\//i.test(ua)) return { isInApp: true, app: "line" };
  if (/Instagram/i.test(ua)) return { isInApp: true, app: "instagram" };
  if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua)) {
    return { isInApp: true, app: "facebook" };
  }
  if (/Twitter/i.test(ua)) return { isInApp: true, app: "twitter" };
  if (/MicroMessenger/i.test(ua)) return { isInApp: true, app: "wechat" };
  if (/KAKAOTALK/i.test(ua)) return { isInApp: true, app: "kakaotalk" };

  // Generic Android WebView (LINE/Facebook etc. often include `; wv)`)
  if (/;\s*wv\)/i.test(ua) && /Android/i.test(ua)) {
    return { isInApp: true, app: "other" };
  }

  return { isInApp: false, app: null };
}

export function inAppBrowserLabel(app: InAppBrowserApp | null): string {
  switch (app) {
    case "line":
      return "LINE";
    case "instagram":
      return "Instagram";
    case "facebook":
      return "Facebook";
    case "twitter":
      return "X (Twitter)";
    case "wechat":
      return "WeChat";
    case "kakaotalk":
      return "KakaoTalk";
    default:
      return "aplikasi ini / このアプリ";
  }
}
