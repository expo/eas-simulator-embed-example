# EAS Simulator embed example

A small Expo web app that shows two ways to put an EAS Simulator session on your own page.

Live at https://simulator-embed-example.expo.app. Pass that origin to the flags below when you use the deployed site.

- `/iframe` frames the preview host page. The session must allow your origin with `--frame-ancestor`.
- `/hub-client` renders the device screen with `@expo/hub-client` and sends touch and keyboard input back. The session must allow your origin with `--cors-origin`.

Both pages ask for the preview host URL and the session token first.

## Run

```sh
bun install
bun run web
```

The dev server serves the app at `http://localhost:8081`. That is the origin to pass to the flags below.

## Start a session the page may use

```sh
# iframe page
eas simulator:start --platform ios --frame-ancestor http://localhost:8081 --json

# hub-client page
eas simulator:start --platform ios --cors-origin http://localhost:8081 --json
```

Read `remoteConfig.previewApiUrl` from the JSON output. It carries the token as `?token=`. Paste it into the form; the page moves the token into its own field. Without the flags, the output is private and has no token.

Through the API, the same values are `remoteConfig.previewApiUrl` and `remoteConfig.webPreviewToken` (or `previewToken` for web-preview-only sessions) once the session status is `IN_PROGRESS`.

Both pages also accept `?url=...&token=...` in their own URL to prefill the form.

## Notes

- The pages use DOM elements and run on web only.
- `DeviceScreen` from `@expo/hub-client` handles touch, scroll, and keyboard input when it has focus. Click the screen to focus it.
- Android sessions run `expo-device-hub`; the page appends `/vendor/serve-emu` to the URL for them.
