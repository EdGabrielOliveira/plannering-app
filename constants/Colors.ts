/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#00898b";
const tintColorDark = "#d1cfd2";

const primaryColor = "#00898b";
const secondaryColor = "#d1cfd2";

export const Colors = {
  light: {
    text: primaryColor,
    background: secondaryColor,
    tint: tintColorLight,
    icon: primaryColor + 10,
    tabIconDefault: primaryColor + 20,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: secondaryColor,
    background: "#002829ff",
    tint: tintColorDark,
    icon: secondaryColor + 10,
    tabIconDefault: secondaryColor + 20,
    tabIconSelected: tintColorDark,
  },
};
