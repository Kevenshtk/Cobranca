const formatDate = (date: string): string => {
  if (!date) {
    throw new Error("formatDate recebeu uma data inválida");
  }

  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export default formatDate;
