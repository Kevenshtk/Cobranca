interface LoadingProps {
  message: string;
}

export function Loading({ message }: LoadingProps) {
  return <div className="loading-state">Carregando {message}...</div>;
}
