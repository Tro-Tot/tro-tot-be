export class ApiResponse {
  public statusCode: number;
  public data: any;
  public message: string;
  public error: any;

  constructor(
    statusCode: number,
    data: any,
    message: string,
    error: any = null,
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.error = error;
  }
}
