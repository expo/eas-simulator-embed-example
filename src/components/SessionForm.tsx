import type { DevicePlatform } from '@expo/hub-client';
import { useState, type FormEvent } from 'react';

export type SessionInput = {
  /** Preview host URL: `previewApiUrl` from the session's remote config. */
  url: string;
  /** Session token: `webPreviewToken` or `previewToken` from the remote config. */
  token: string;
  platform: DevicePlatform;
};

type Props = {
  initialUrl?: string;
  initialToken?: string;
  initialPlatform?: DevicePlatform;
  showPlatform?: boolean;
  submitLabel: string;
  onSubmit: (input: SessionInput) => void;
};

/** Reads the tunnel URL and the token. A token in the URL's query is moved into its own field. */
export function SessionForm({
  initialUrl = '',
  initialToken = '',
  initialPlatform = 'ios',
  showPlatform = false,
  submitLabel,
  onSubmit,
}: Props) {
  const [url, setUrl] = useState(initialUrl);
  const [token, setToken] = useState(initialToken);
  const [platform, setPlatform] = useState<DevicePlatform>(initialPlatform);
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    let parsed: URL;
    try {
      parsed = new URL(url.trim());
    } catch {
      setError('Enter the full preview host URL, for example https://web-preview-abc.eas-simulator.ngrok.dev');
      return;
    }
    const queryToken = parsed.searchParams.get('token');
    parsed.searchParams.delete('token');
    setError(null);
    onSubmit({ url: parsed.toString(), token: token.trim() || queryToken || '', platform });
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
      <label style={{ display: 'grid', gap: 4 }}>
        Preview host URL (<code>previewApiUrl</code>)
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://web-preview-abc.eas-simulator.ngrok.dev"
          required
          style={{ padding: 8, fontFamily: 'monospace' }}
        />
      </label>
      <label style={{ display: 'grid', gap: 4 }}>
        Session token (<code>webPreviewToken</code>)
        <input
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Leave empty when the URL already carries ?token="
          style={{ padding: 8, fontFamily: 'monospace' }}
        />
      </label>
      {showPlatform && (
        <label style={{ display: 'grid', gap: 4 }}>
          Platform
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value as DevicePlatform)}
            style={{ padding: 8 }}>
            <option value="ios">iOS</option>
            <option value="android">Android</option>
          </select>
        </label>
      )}
      {error && <p style={{ color: '#b00020' }}>{error}</p>}
      <button type="submit" style={{ padding: '8px 16px', justifySelf: 'start' }}>
        {submitLabel}
      </button>
    </form>
  );
}
