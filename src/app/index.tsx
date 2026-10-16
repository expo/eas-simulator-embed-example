import { Link } from 'expo-router';

import { PageOrigin } from '@/components/PageOrigin';
import { page } from '@/components/styles';

export default function HomePage() {
  return (
    <main style={page}>
      <h1>EAS Simulator embed example</h1>
      <p>
        Two ways to show an EAS Simulator session on your own page. Both need the preview host
        URL and the session token. Get them from <code>eas simulator:start --json</code> or from
        the <code>remoteConfig</code> of the session in the Expo API.
      </p>
      <ol>
        <li>
          <Link href="/iframe">Embed the preview page in an iframe</Link>. Start the session with{' '}
          <code>--frame-ancestor</code> set to the origin of this page.
        </li>
        <li>
          <Link href="/hub-client">Render the screen with @expo/hub-client</Link>. Start the
          session with <code>--cors-origin</code> set to the origin of this page.
        </li>
      </ol>
      <PageOrigin />
    </main>
  );
}
