export interface ServiceApi {
  id: number;
  name_cli: string;
  value: number;
  phone: string;
  desc_service: string;
  date_pay: string;
  pay: boolean;
}

export interface HistoryApiDetails {
  data: string;
  id: number;
  name_cli: string;
  phone: string;
  desc_service: string;
  type_msg: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
}

export interface ServicesApiResponse extends ApiResponse {
  services: ServiceApi[];
}

export interface ServiceApiResponse extends ApiResponse {
  service: ServiceApi;
}

export interface HistoryApiResponse extends ApiResponse {
  history: HistoryApiDetails[];
}
