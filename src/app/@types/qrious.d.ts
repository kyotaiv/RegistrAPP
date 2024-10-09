declare module 'qrious' {
  export default class QRious {
    constructor(options?: {
      element?: HTMLCanvasElement;
      value?: string;
      size?: number;
      level?: 'L' | 'M' | 'Q' | 'H';
    });
  }
}
