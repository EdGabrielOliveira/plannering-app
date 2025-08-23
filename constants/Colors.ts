/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0084d1";
const tintColorDark = "#d1cfd2";

export const Colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    tint: tintColorLight,
    icon: "#666666",
    tabIconDefault: "#999999",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ffffff",
    background: "#000000",
    tint: tintColorDark,
    icon: "#999999",
    tabIconDefault: "#666666",
    tabIconSelected: tintColorDark,
  },
};
