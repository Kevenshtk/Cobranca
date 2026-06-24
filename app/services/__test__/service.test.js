import axios from "axios";
import apiN8N from "../api";
import serviceApi from "../serviceApi";

jest.mock("../api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    getById: jest.fn(),
    getLogs: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();

  jest
    .spyOn(axios, "isAxiosError")
    .mockImplementation((error) => error?.isAxiosError === true);
});

describe("Service API", () => {
  const serviceDataGlogal = {
    name_cli: "Teste",
    value: 60,
    phone: "14981585105",
    desc_service: "testando o projeto",
    date_pay: "16/06/2026",
    pay: true,
  };

  const returnError = {
    success: false,
    message: "Erro inesperado",
  };

  const axiosError = {
    isAxiosError: true,
    response: {
      data: {
        message: "Servidor indisponível",
      },
    },
  };

  it("deve retornar erro de comunicação quando não houver resposta da API", async () => {
    apiN8N.get.mockRejectedValueOnce({
      isAxiosError: true,
      response: {},
    });

    const result = await serviceApi.get();

    expect(result).toEqual({
      success: false,
      message: "Erro ao comunicar com o servidor",
    });
  });

  describe("Get services", () => {
    const serviceData = [
      {
        id: 1,
        ...serviceDataGlogal,
      },
      {
        id: 2,
        ...serviceDataGlogal,
      },
    ];

    it("deve retornar uma lista de serviços", async () => {
      apiN8N.get.mockResolvedValueOnce({
        data: {
          success: true,
          services: [serviceData],
        },
      });

      const result = await serviceApi.get();

      expect(apiN8N.get).toHaveBeenCalledWith("get");

      expect(result).toEqual({
        success: true,
        data: [serviceData],
      });
    });

    it("deve retornar uma messagem de erro genérico quando ocorrer falha no workflow ao buscar os serviços", async () => {
      apiN8N.get.mockResolvedValueOnce({
        data: {
          success: false,
          services: [],
        },
      });

      const result = await serviceApi.get();

      expect(apiN8N.get).toHaveBeenCalledWith("get");

      expect(result).toEqual(returnError);
    });

    it("deve retornar a mensagem da API quando ocorrer um AxiosError ao buscar os serviços", async () => {
      apiN8N.get.mockRejectedValueOnce(axiosError);

      const result = await serviceApi.get();

      expect(result).toEqual({
        success: false,
        message: "Servidor indisponível",
      });
    });

    it("deve retornar os dados do serviço", async () => {
      apiN8N.get.mockResolvedValueOnce({
        data: {
          success: true,
          service: [serviceData],
        },
      });

      const result = await serviceApi.getById(1);

      expect(apiN8N.get).toHaveBeenCalledWith("getById?id=1");

      expect(result).toEqual({
        success: true,
        data: [serviceData],
      });
    });

    it("deve retornar uma messagem de erro genérico quando ocorrer falha no workflow ao buscar o serviço", async () => {
      apiN8N.get.mockResolvedValueOnce({
        data: {
          success: false,
          service: [],
        },
      });

      const result = await serviceApi.getById(1);

      expect(apiN8N.get).toHaveBeenCalledWith("getById?id=1");

      expect(result).toEqual(returnError);
    });

    it("deve retornar a mensagem da API quando ocorrer um AxiosError ao buscar o serviço", async () => {
      apiN8N.get.mockRejectedValueOnce(axiosError);

      const result = await serviceApi.getById(1);

      expect(result).toEqual({
        success: false,
        message: "Servidor indisponível",
      });
    });
  });

  describe("Get log messages", () => {
    const historyData = [
      {
        date: "2026-06-16T19:22:29.758Z",
        id: 1779489805544,
        name_cli: "Maciel",
        phone: "5512345678910",
        desc_service: "testando o projeto",
        type_msg: "atraso",
      },
      {
        date: "2026-06-16T19:22:29.758Z",
        id: 1779489805545,
        name_cli: "Carlos",
        phone: "5512345678910",
        desc_service: "testando o projeto",
        type_msg: "atraso",
      },
    ];

    it("deve retornar uma lista com o histório de envio de mensagem", async () => {
      apiN8N.get.mockResolvedValueOnce({
        data: {
          success: true,
          history: [historyData],
        },
      });

      const result = await serviceApi.getLogs();

      expect(apiN8N.get).toHaveBeenCalledWith("getShoppingHistory");

      expect(result).toEqual({
        success: true,
        data: [historyData],
      });
    });

    it("deve retornar uma messagem de erro genérico quando ocorrer falha no workflow ao buscar o histórico", async () => {
      apiN8N.get.mockResolvedValueOnce({
        data: {
          success: false,
          history: [],
        },
      });

      const result = await serviceApi.getLogs();

      expect(apiN8N.get).toHaveBeenCalledWith("getShoppingHistory");

      expect(result).toEqual(returnError);
    });

    it("deve retornar a mensagem da API quando ocorrer um AxiosError ao buscar o histórico", async () => {
      apiN8N.get.mockRejectedValueOnce(axiosError);

      const result = await serviceApi.getLogs();

      expect(result).toEqual({
        success: false,
        message: "Servidor indisponível",
      });
    });
  });

  describe("Add service", () => {
    it("deve retornar uma messagem de sucesso ao registrar um serviço", async () => {
      apiN8N.post.mockResolvedValueOnce({
        data: {
          success: true,
          message: "Serviço adicionado com sucesso!",
          service: serviceDataGlogal,
        },
      });

      const result = await serviceApi.add(serviceDataGlogal);

      expect(apiN8N.post).toHaveBeenCalledWith("add", serviceDataGlogal);

      expect(result).toEqual({
        success: true,
        message: "Serviço adicionado com sucesso!",
      });
    });

    it("deve retornar uma messagem de erro genérico quando ocorrer falha no workflow ao registrar um serviço", async () => {
      apiN8N.post.mockResolvedValueOnce({
        data: {
          success: false,
          message: "Erro ao adicionar serviço, tente mais tarde!",
        },
      });

      const result = await serviceApi.add(serviceDataGlogal);

      expect(apiN8N.post).toHaveBeenCalledWith("add", serviceDataGlogal);

      expect(result).toEqual(returnError);
    });

    it("deve retornar a mensagem da API quando ocorrer um AxiosError ao registrar um serviço", async () => {
      apiN8N.post.mockRejectedValueOnce(axiosError);

      const result = await serviceApi.add(serviceDataGlogal);

      expect(result).toEqual({
        success: false,
        message: "Servidor indisponível",
      });
    });
  });

  describe("Update service", () => {
    const serviceDataRequest = {
      id: 1,
      ...serviceDataGlogal,
    };

    it("deve retornar uma messagem de sucesso ao atualizar um serviço", async () => {
      apiN8N.put.mockResolvedValueOnce({
        data: {
          success: true,
          message: "Serviço atualizado com sucesso",
          service: serviceDataRequest,
        },
      });

      const result = await serviceApi.update(1, serviceDataRequest);

      expect(apiN8N.put).toHaveBeenCalledWith("update", serviceDataRequest);

      expect(result).toEqual({
        success: true,
        message: "Serviço atualizado com sucesso",
      });
    });

    it("deve retornar uma messagem de erro genérico quando ocorrer falha no workflow ao atualizar um serviço", async () => {
      apiN8N.put.mockResolvedValueOnce({
        data: {
          success: false,
          message: "Erro ao atualizar serviço",
        },
      });

      const result = await serviceApi.update(1, serviceDataGlogal);

      expect(apiN8N.put).toHaveBeenCalledWith("update", serviceDataRequest);

      expect(result).toEqual(returnError);
    });

    it("deve retornar a mensagem da API quando ocorrer um AxiosError ao atualizar um serviço", async () => {
      apiN8N.put.mockRejectedValueOnce(axiosError);

      const result = await serviceApi.update(1, serviceDataGlogal);

      expect(result).toEqual({
        success: false,
        message: "Servidor indisponível",
      });
    });
  });

  describe("Delete service", () => {
    it("deve retornar uma messagem de sucesso ao deletar um serviço", async () => {
      apiN8N.delete.mockResolvedValueOnce({
        data: {
          success: true,
          message: "Serviço deletado com sucesso",
        },
      });

      const result = await serviceApi.del(1);

      expect(apiN8N.delete).toHaveBeenCalledWith("del?id=1");

      expect(result).toEqual({
        success: true,
        message: "Serviço deletado com sucesso",
      });
    });

    it("deve retornar uma messagem de erro genérico quando ocorrer falha no workflow ao deletar um serviço", async () => {
      apiN8N.delete.mockResolvedValueOnce({
        data: {
          success: false,
          message: "Erro ao deletar serviço",
        },
      });

      const result = await serviceApi.del(1);

      expect(apiN8N.delete).toHaveBeenCalledWith("del?id=1");

      expect(result).toEqual(returnError);
    });

    it("deve retornar a mensagem da API quando ocorrer um AxiosError ao deletar um serviço", async () => {
      apiN8N.delete.mockRejectedValueOnce(axiosError);

      const result = await serviceApi.del(1);

      expect(result).toEqual({
        success: false,
        message: "Servidor indisponível",
      });
    });
  });
});