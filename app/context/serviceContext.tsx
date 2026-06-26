"use client";

import { createContext, useState, useCallback } from "react";

import type {
  ServiceContextType,
  ServiceProviderProps,
} from "@/app/types/context.types";
import type {
  CreateServiceRequest,
  UpdateServiceRequest,
  ServiceResponse,
  ActionResponse
} from "@/app/types/service.types";
import type { ServiceApi, HistoryApiDetails } from "@/app/types/api.types";

import serviceApi from "../services/serviceApi";
import alert from "../utils/alerts";

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceContextProvider = ({ children }: ServiceProviderProps) => {
  const [services, setServices] = useState<ServiceApi[]>([]);
  const [service, setService] = useState<ServiceApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoryApiDetails[]>([]);

  const handleActionLoads = useCallback(
    async <T, R>(
      action: () => Promise<ServiceResponse<T>>,
      setState: (value: R) => void,
      mapper: (data: T) => R,
    ) => {
      try {
        setLoading(true);

        const result = await action();

        if (!result.success) {
          alert.error(result.message);
          return;
        }

        setState(mapper(result.data));
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearService = useCallback(() => {
    setService(null);
  }, []);

  const loadServices = useCallback(async () => {
    await handleActionLoads(serviceApi.get, setServices, (data) =>
      Array.isArray(data) ? data : [],
    );
  }, [handleActionLoads]);

  const loadService = useCallback(
    async (id: number) => {
      await handleActionLoads(
        () => serviceApi.getById(id),
        setService,
        (data) => data,
      );
    },
    [handleActionLoads],
  );

  const loadHistory = useCallback(async () => {
    await handleActionLoads(serviceApi.getLogs, setHistory, (data) =>
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    );
  }, [handleActionLoads]);

  const handleActionAddDelUpt = async (
    action: () => Promise<ActionResponse>,
    loader?: () => Promise<void>,
  ) => {
    const result = await action();

    if (!result.success) {
      alert.error(result.message);
      return;
    }

    alert.success(result.message);

    if (loader) {
      await loader();
    }
  };

  const handleAdd = async (data: CreateServiceRequest) => {
    await handleActionAddDelUpt(() => serviceApi.add(data));
  };

  const handleMarkAsPaid = async (data: UpdateServiceRequest) => {
    const updatedService = { ...data, pay: true };
    await handleActionAddDelUpt(
      () => serviceApi.update(data.id, updatedService),
      loadServices,
    );
  };

  const handleUpdate = async (id: number, data: CreateServiceRequest) => {
    await handleActionAddDelUpt(() => serviceApi.update(id, data));
  };

  const handleDelete = async (id: number) => {
    alert.del("Deseja excluir este serviço?", async () => {
      await handleActionAddDelUpt(() => serviceApi.del(id), loadServices);
    });
  };

  return (
    <ServiceContext.Provider
      value={{
        loadServices,
        services,
        loading,
        loadService,
        handleAdd,
        handleUpdate,
        handleMarkAsPaid,
        handleDelete,
        service,
        clearService,
        loadHistory,
        history,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
