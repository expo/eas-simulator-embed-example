import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const readOrigin = () => window.location.origin;
// The static export has no window; the real origin fills in after hydration.
const readServerOrigin = () => '…';

/** The origin of this page, which is the value to pass to --frame-ancestor or --cors-origin. */
export function PageOrigin() {
  const origin = useSyncExternalStore(subscribe, readOrigin, readServerOrigin);
  return (
    <p>
      Origin of this page: <code>{origin}</code>
    </p>
  );
}
