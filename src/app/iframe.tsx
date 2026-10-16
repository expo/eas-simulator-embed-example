import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { PageOrigin } from '@/components/PageOrigin';
import { SessionForm, type SessionInput } from '@/components/SessionForm';
import { content, page } from '@/components/styles';

/**
 * The preview host serves its own page at the tunnel root. With `?token=` the host swaps the
 * token for a cookie, so the frame needs the token in the URL once.
 */
function embedUrl({ url, token }: SessionInput): string {
  const framed = new URL(url);
  if (token) {
    framed.searchParams.set('token', token);
  }
  return framed.toString();
}

export default function IframePage() {
  const params = useLocalSearchParams<{ url?: string; token?: string }>();
  const [session, setSession] = useState<SessionInput | null>(null);

  return (
    <main style={page}>
      <div style={content}>
        <h1>Embed the preview page in an iframe</h1>
        <p>
          The session must allow this page to frame it. Start it with{' '}
          <code>--frame-ancestor &lt;origin&gt;</code>, where the origin is the one below.
        </p>
        <PageOrigin />
        <SessionForm
          initialUrl={params.url}
          initialToken={params.token}
          submitLabel="Load in iframe"
          onSubmit={setSession}
        />
        {session && (
          <>
            <p>
              Framing <code>{embedUrl(session)}</code>
            </p>
            <iframe
              key={embedUrl(session)}
              src={embedUrl(session)}
              title="EAS Simulator preview"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              allow="clipboard-read; clipboard-write; fullscreen"
              style={{ width: '100%', height: '80vh', border: '1px solid #ccc', borderRadius: 8 }}
            />
          </>
        )}
      </div>
    </main>
  );
}
