import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useParams, useRouter } from "next/navigation";
import { ServiceContext } from "@/app/context/serviceContext";

import ServiceForm from "./index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

const mockBack = jest.fn();

const loadService = jest.fn();
const clearService = jest.fn();
const handleAdd = jest.fn();
const handleUpdate = jest.fn();

const service = null;
const loading = false;

beforeEach(() => {
  jest.clearAllMocks();

  useParams.mockReturnValue({});

  useRouter.mockReturnValue({
    back: mockBack,
  });
});


const renderForm = () => {
  render(
    <ServiceContext.Provider
      value={{
        loadService,
        service,
        clearService,
        loading,
        handleAdd,
        handleUpdate,
      }}
    >
      <ServiceForm />
    </ServiceContext.Provider>,
  );
};

describe("ServiceForm - Cadastro", () => {
  const fillFormRegisterAndSubmit = async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Nome/i), "Teste");
    await user.type(screen.getByLabelText(/Telefone/i), "5511999999999");
    await user.type(screen.getByLabelText(/Serviço Prestado/i), "Formatação");
    await user.type(screen.getByLabelText(/Valor/i), "80");
    await user.type(screen.getByLabelText(/Data de Pagamento/i), "2026-06-25");
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

  it("deve chamar handleAdd com os dados preenchidos", async () => {
    renderForm();

    await fillFormRegisterAndSubmit();

    expect(handleAdd).toHaveBeenCalled();

    expect(handleAdd).toHaveBeenCalledWith({
      name_cli: "Teste",
      phone: "5511999999999",
      desc_service: "Formatação",
      value: 80,
      date_pay: "2026-06-25",
      pay: false,
    });
  });

  it("deve voltar para a listagem quando o cadastro for realizado com sucesso", async () => {
    renderForm()

    await fillFormRegisterAndSubmit();

    expect(mockBack).toHaveBeenCalled();
  });

  
});
