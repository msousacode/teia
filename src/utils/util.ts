export default function useUtils() {
  function calculateDaysBetween(date1: string, date2: string) {
    // Converte as datas para objetos Date
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = Math.abs(
      Number(secondDate) - Number(firstDate)
    );

    // Converte a diferença de milissegundos para dias
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.round(differenceInDays);
  }

  return {
    calculateDaysBetween,
  };
}
