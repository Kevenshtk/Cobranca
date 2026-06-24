import type { ServiceApi, HistoryApiDetails } from "../types/api.types";

export interface ServiceError {
  success: false;
  message: string;
}

export type ServiceResponse<T> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      message: string;
    };

export interface ServiceRequest {
  id?: number;
  name_cli: string;
  value: number;
  phone: string;
  desc_service: string;
  date_pay: string;
  pay: boolean;
}

export type ActionResponse =
  | {
      success: true;
      message?: string;
    }
  | {
      success: false;
      message: string;
    };

export type GetServicesResponse = ServiceResponse<ServiceApi[]>;
export type GetServiceResponse = ServiceResponse<ServiceApi>;
export type GetHistoryResponse = ServiceResponse<HistoryApiDetails[]>;
