interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

interface INetwork {
  count: number;
  next: null | string;
  previous: null | string;
}

export type { QueueItem, INetwork };
