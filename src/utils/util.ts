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

  function calculateHoursBetween(date1: string) {
    const firstDate = new Date(Number(date1));
    const currentDate = new Date();

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = Math.abs(
      currentDate.getTime() - firstDate.getTime()
    );

    // Converte a diferença de milissegundos para horas
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    return Math.round(differenceInHours);
  }

  return {
    calculateDaysBetween,
    calculateHoursBetween,
  };
}
