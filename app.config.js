export default ({ config }) => ({
  ...config,
  expo: {
    ...config.expo,
    extra: {
      apiBaseUrl: process.env.EXPO_API_BASE_URL,
    },
  },
});
