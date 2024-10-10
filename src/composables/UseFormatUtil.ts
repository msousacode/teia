export default function useFormatUtil() {
  const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatCnpj = (cnpj: string) => {
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  /**
   * usado para formatar moeda e apresentar no front-end\input
   * @param valor
   * @returns
   */
  const formatMoeda = (valor: number | string | null) => {
    if (valor === null) {
      return '0';
    }

    if (typeof valor === 'string') {
      const valorFmt = valor.replace(/\D/g, '');
      valor = parseFloat(valorFmt) / 100;
    }

    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  /**
   * usado para formatar moeda para salvar no banco de dados
   * @param valor
   * @returns
   */
  const formatMoedaDB = (valor: string | null) => {
    if (valor === null) {
      throw new Error('Valor não pode ser nulo');
    }
    return parseFloat(
      valor.replace('R$', '').replace('.', '').replace(',', '.')
    );
  };

  /**
   * usado para formatar data para salvar no banco de dados
   * @param data
   * @returns
   */
  const formatDataDB = (data: string) => {
    if (data === undefined || data === null) {
      throw new Error('Data não pode ser nula');
    }
    const partes = data.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  };

  /**
   * usado para formatar data apresentar na listagem
   * @param data
   * @returns
   */
  const formatDataViewList = (data: string | null) => {
    if (data === null) {
      return null;
    }

    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const timestampToDate = (timestamp: number) => {
    // Converte o timestamp para um objeto Date
    const date = new Date(timestamp);

    // Extrai o dia, mês e ano
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Os meses são de 0 a 11, então adicionamos 1
    const year = date.getFullYear();

    // Retorna a data no formato dd/MM/yyyy
    return `${day}/${month}/${year}`;
  };

  return {
    formatCpf,
    formatCnpj,
    formatPhone,
    formatMoeda,
    formatMoedaDB,
    formatDataDB,
    formatDataViewList,
    timestampToDate,
  };
}
