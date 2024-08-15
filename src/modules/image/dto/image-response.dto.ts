export interface ImageResponse {
  successful: Array<{
    fileName: string;
    index: number;
  }>;
  failed: Array<{
    fileName: string;
    index: number;
    error: any;
  }>;
}
