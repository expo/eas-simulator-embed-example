import { DeviceClientProvider, type DevicePlatform } from '@expo/hub-client';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { DeviceScreenOnly } from '@/components/DeviceScreenOnly';
import { PageOrigin } from '@/components/PageOrigin';
import { SessionForm, type SessionInput } from '@/components/SessionForm';
import { page } from '@/components/styles';

/** Android sessions run expo-device-hub, which mounts its emulator backend under this path. */
const HUB_SERVE_EMU_PATH = '/vendor/serve-emu';

function baseUrlFor(url: string, platform: DevicePlatform): string {
  const trimmed = url.replace(/\/+$/, '');
  return platform === 'android' ? `${trimmed}${HUB_SERVE_EMU_PATH}` : trimmed;
}

export default function HubClientPage() {
  const params = useLocalSearchParams<{ url?: string; token?: string; platform?: string }>();
  const [session, setSession] = useState<SessionInput | null>(null);

  return (
    <main style={page}>
      <h1>Render the screen with @expo/hub-client</h1>
      <p>
        The page calls the preview host API from its own scripts, so the session must allow this
        origin with <code>--cors-origin &lt;origin&gt;</code>. The token goes to the provider as{' '}
        <code>options.token</code>.
      </p>
      <PageOrigin />
      <SessionForm
        initialUrl={params.url}
        initialToken={params.token}
        initialPlatform={params.platform === 'android' ? 'android' : 'ios'}
        showPlatform
        submitLabel="Connect"
        onSubmit={setSession}
      />
      {session && (
        <DeviceClientProvider
          key={`${session.platform}:${session.url}`}
          platform={session.platform}
          options={{
            baseUrl: baseUrlFor(session.url, session.platform),
            token: session.token || null,
            streamMode: 'webrtc',
          }}>
          <DeviceScreenOnly />
        </DeviceClientProvider>
      )}
    </main>
  );
}
