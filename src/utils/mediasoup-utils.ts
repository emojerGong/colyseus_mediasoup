import { createWorker } from 'mediasoup';
import { Router } from 'mediasoup/node/lib/types';

export async function setupWorker() {
  const worker = await createWorker();
  const router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
      },
    ],
  });
  return router;
}

export async function createTransport(router: Router) {
  const transport = await router.createWebRtcTransport({
    listenIps: [{ ip: '0.0.0.0', announcedIp: 'your.external.ip.address' }],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  });
  return {
    transport,
    transportParams: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
}
