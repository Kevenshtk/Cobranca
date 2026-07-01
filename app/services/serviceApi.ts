import axios from "axios";
import apiN8N from "./api";

import type {
  ServicesApiResponse,
  ServiceApiResponse,
  HistoryApiResponse,
  ApiResponse,
} from "../types/api.types";

import type {
  ServiceError,
  GetServicesResponse,
  CreateServiceRequest,
  GetServiceResponse,
  GetHistoryResponse,
  ActionResponse
} from "../types/service.types";

const handleError = (error: unknown): ServiceError => {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      message:
        error.response?.data?.message ?? "Erro ao comunicar com o servidor",
    };
  }

  return {
    success: false,
    message: "Erro inesperado",
  };
};

const validateApiResponse = (response: ApiResponse) => {
  if (!response.success) {
    throw new Error(response.message);
  }
};

const getServices = async (): Promise<GetServicesResponse> => {
  try {
    const response = await apiN8N.get<ServicesApiResponse>("get");

    validateApiResponse(response.data);

    return { success: true, data: response.data.services };
  } catch (error) {
    return handleError(error);
  }
};

const getServiceById = async (id: number): Promise<GetServiceResponse> => {
  try {
    const response = await apiN8N.get<ServiceApiResponse>(`getById?id=${id}`);

    validateApiResponse(response.data);

    return { success: true, data: response.data.service };
  } catch (error) {
    return handleError(error);
  }
};

const getHistoryMessages = async (): Promise<GetHistoryResponse> => {
  try {
    const response = await apiN8N.get<HistoryApiResponse>("getShoppingHistory");

    validateApiResponse(response.data);

    return { success: true, data: response.data.history };
  } catch (error) {
    return handleError(error);
  }
};

const addService = async (
  data: CreateServiceRequest,
): Promise<ActionResponse> => {
  try {
    const response = await apiN8N.post<ServiceApiResponse>("add", {
      name_cli: data.name_cli,
      value: data.value,
      phone: data.phone,
      desc_service: data.desc_service,
      date_pay: data.date_pay,
      pay: data.pay,
    });

    validateApiResponse(response.data);

    return { success: true, message: response.data.message };
  } catch (error) {
    return handleError(error);
  }
};

const updateService = async (
  id: number,
  data: CreateServiceRequest,
): Promise<ActionResponse> => {
  try {
    const response = await apiN8N.put<ServiceApiResponse>("update", {
      id: id,
      name_cli: data.name_cli,
      value: data.value,
      phone: data.phone,
      desc_service: data.desc_service,
      date_pay: data.date_pay,
      pay: data.pay,
    });

    validateApiResponse(response.data);

    return { success: true, message: response.data.message };
  } catch (error) {
    return handleError(error);
  }
};

const deleteService = async (
  id: number,
): Promise<ActionResponse> => {
  try {
    const response = await apiN8N.delete<ApiResponse>(`del?id=${id}`);

    validateApiResponse(response.data);

    return { success: true, message: response.data.message };
  } catch (error) {
    return handleError(error);
  }
};

const serviceApi = {
  get: getServices,
  getLogs: getHistoryMessages,
  getById: getServiceById,
  add: addService,
  update: updateService,
  del: deleteService,
};

export default serviceApi;
