import { DeviceScreen, displayScreen, useDeviceScreenClient } from '@expo/hub-client';

/**
 * The device screen and nothing else. DeviceScreen paints the stream and sends touch, scroll
 * and keyboard input back to the device when it has focus. Click it to focus.
 */
export function DeviceScreenOnly() {
  const client = useDeviceScreenClient();
  const screen = displayScreen(client.screen);
  const aspectRatio = screen ? `${screen.width} / ${screen.height}` : '9 / 19.5';

  return (
    <section>
      <p>
        Status: <code>{client.status}</code>
        {client.status === 'error' && ' (check the URL, the token, and the --cors-origin value)'}
      </p>
      <div
        style={{
          position: 'relative',
          width: 'min(100%, 390px)',
          aspectRatio,
          background: '#000',
          borderRadius: 24,
          overflow: 'hidden',
        }}>
        <DeviceScreen client={client} />
      </div>
    </section>
  );
}
