import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useParams, useRouter } from "next/navigation";
import { ServiceContext } from "@/app/context/serviceContext";

import formatDate from "@/app/utils/formatDate";
import ServiceForm from "./index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../../utils/formatDate", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockBack = jest.fn();

const serviceData = {
  name_cli: "Teste",
  phone: "5511999999999",
  desc_service: "Formatação",
  value: 80,
  date_pay: "2026-06-25",
  pay: false,
};

const getInputs = () => ({
  name_cli: screen.getByLabelText(/Nome/i),
  phone: screen.getByLabelText(/Telefone/i),
  desc_service: screen.getByLabelText(/Serviço Prestado/i),
  value: screen.getByLabelText(/Valor/i),
  date_pay: screen.getByLabelText(/Data de Pagamento/i),
});

const defaultContext = {
  loadService: jest.fn(),
  service: null,
  clearService: jest.fn(),
  loading: false,
  handleAdd: jest.fn(),
  handleUpdate: jest.fn(),
};

const renderForm = (overrides = {}) => {
  render(
    <ServiceContext.Provider
      value={{
        ...defaultContext,
        ...overrides,
      }}
    >
      <ServiceForm />
    </ServiceContext.Provider>,
  );
};

beforeEach(() => {
  jest.clearAllMocks();

  useParams.mockReturnValue({});

  formatDate.mockReturnValue("");

  useRouter.mockReturnValue({
    back: mockBack,
  });
});

describe("ServiceForm - Cadastro", () => {
  const fillFormRegisterAndSubmit = async () => {
    const user = userEvent.setup();

    const inputs = getInputs();

    await user.type(inputs.name_cli, serviceData.name_cli);
    await user.type(inputs.phone, serviceData.phone);
    await user.type(inputs.desc_service, serviceData.desc_service);
    await user.type(inputs.value, `${serviceData.value}`);
    await user.type(inputs.date_pay, serviceData.date_pay);
    await user.click(screen.getByRole("button", { name: /Salvar Serviço/i }));
  };

  it("deve renderizar o formulário de cadastro", () => {
    renderForm();

    expect(
      screen.getByRole("heading", {
        name: /Novo Serviço/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /Salvar Serviço/i,
      }),
    ).toBeInTheDocument();
  });

  it("deve chamar handleAdd com os dados do formulário", async () => {
    renderForm();

    await fillFormRegisterAndSubmit();

    expect(defaultContext.handleAdd).toHaveBeenCalled();

    expect(defaultContext.handleAdd).toHaveBeenCalledWith(serviceData);
  });

  it("deve voltar para a listagem quando o cadastro for realizado com sucesso", async () => {
    renderForm();

    await fillFormRegisterAndSubmit();

    expect(mockBack).toHaveBeenCalled();
  });

  it("deve exibir mensagem de validação quando o formulário for enviado sem preencher os campos", async () => {
    renderForm();

    const input = getInputs();

    await userEvent.clear(input.value);

    await userEvent.click(
      screen.getByRole("button", { name: /Salvar Serviço/i }),
    );

    expect(
      screen.getByText(/Nome Completo é obrigatório/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Telefone \(WhatsApp\) é obrigatório/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Serviço Prestado é obrigatório/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Valor \(R\$\) é obrigatório/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Data de Pagamento \(Vencimento\) é obrigatório/i),
    ).toBeInTheDocument();

    expect(defaultContext.handleAdd).not.toHaveBeenCalled();
  });
});

describe("ServiceForm - Edição", () => {
  it("deve chamar loadService com o valor de useParams", () => {
    useParams.mockReturnValue({ id: "1" });

    renderForm();

    expect(defaultContext.loadService).toHaveBeenCalledWith(1);
  });

  it("deve renderizar o formulário de edição com os campos preenchidos", () => {
    useParams.mockReturnValue({ id: "1" });
    formatDate.mockReturnValue("2026-06-25");

    renderForm({
      service: serviceData,
    });

    expect(
      screen.getByRole("heading", {
        name: /Editar Serviço/i,
      }),
    ).toBeInTheDocument();

    const inputs = getInputs();

    expect(inputs.name_cli).toHaveValue(serviceData.name_cli);
    expect(inputs.phone).toHaveValue(serviceData.phone);
    expect(inputs.desc_service).toHaveValue(serviceData.desc_service);
    expect(inputs.value).toHaveValue(serviceData.value);
    expect(inputs.date_pay).toHaveValue(serviceData.date_pay);
  });

  it("deve chamar handleUpdade com os dados do formulário", async () => {
    useParams.mockReturnValue({ id: "1" });
    formatDate.mockReturnValue("2026-06-25");

    renderForm({ service: serviceData });

    const user = userEvent.setup();

    const inputs = getInputs();

    await user.clear(inputs.date_pay);

    await user.type(inputs.date_pay, "2026-06-30");
    await user.click(screen.getByRole("button", { name: /Salvar Serviço/i }));

    expect(defaultContext.handleUpdate).toHaveBeenCalled();

    const data = {
      ...serviceData,
      date_pay: "2026-06-30",
    };

    expect(defaultContext.handleUpdate).toHaveBeenCalledWith(1, data);
  });

  it("deve voltar para a listagem ao clicar em Cancelar", async () => {
    useParams.mockReturnValue({ id: "1" });
    formatDate.mockReturnValue("2026-06-25");

    renderForm({ service: serviceData });

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Cancelar/i }));

    expect(mockBack).toHaveBeenCalled();
  });
});
