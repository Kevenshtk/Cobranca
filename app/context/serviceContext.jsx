"use client";

import { createContext, useState, useCallback } from "react";

import serviceApi from "../services/serviceApi";
import alert from "../utils/alerts";

export const ServiceContext = createContext();

export const ServiceContextProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const handleActionLoads = useCallback(async (action, setState, mapper) => {
    try {
      setLoading(true);

      const result = await action();

      if (!result.success) {
        alert.error(result.message);
        return;
      }

      setState(mapper(result));
    } finally {
      setLoading(false);
    }
  }, []);

  const clearService = useCallback(() => {
    setService(null);
  }, []);

  const loadServices = useCallback(async () => {
    await handleActionLoads(serviceApi.get, setServices, (result) =>
      Array.isArray(result.data) ? result.data : [],
    );
  }, [handleActionLoads]);

  const loadService = useCallback(
    async (id) => {
      await handleActionLoads(
        () => serviceApi.getById(id),
        setService,
        (result) => result.data,
      );
    },
    [handleActionLoads],
  );

  const loadHistory = useCallback(async () => {
    await handleActionLoads(serviceApi.getLogs, setHistory, (result) =>
      result.data.sort((a, b) => new Date(b.date) - new Date(a.date)),
    );
  }, [handleActionLoads]);

  const handleActionAddDelUpt = async (action, loader) => {
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

  const handleAdd = async (data) => {
    await handleActionAddDelUpt(() => serviceApi.add(data));
  };

  const handleMarkAsPaid = async (data) => {
    const updatedService = { ...data, pay: true };
    await handleActionAddDelUpt(
      () => serviceApi.update(data.id, updatedService),
      loadServices,
    );
  };

  const handleUpdate = async (id, data) => {
    await handleActionAddDelUpt(() => serviceApi.update(id, data));
  };

  const handleDelete = async (id) => {
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
