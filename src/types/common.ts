export type CommonResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};
