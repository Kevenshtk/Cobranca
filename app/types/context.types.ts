import { ServiceApi, HistoryApiDetails } from "./api.types";
import { CreateServiceRequest, UpdateServiceRequest } from "./service.types";

export interface ServiceContextType {
    loadServices: () => Promise<void>;
    services: ServiceApi[];
    loading: boolean;
    loadService: (id: number) => Promise<void>;
    handleAdd: (data: CreateServiceRequest) => Promise<void>;
    handleUpdate: (id:number, data: CreateServiceRequest) => Promise<void>;
    handleMarkAsPaid: (data: UpdateServiceRequest) => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
    service: ServiceApi | null;
    clearService: () => void;
    loadHistory: () => Promise<void>;
    history: HistoryApiDetails[];
}

export interface ServiceProviderProps {
    children: React.ReactNode;
}