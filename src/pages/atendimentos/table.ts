const columns = [
  {
    name: 'aprendiz',
    align: 'left',
    label: 'Aprendiz',
    field: (row) => row.aprendiz.label,
    sortable: true,
  },
  {
    name: 'actions',
    align: 'right',
    label: '',
    field: 'actions',
    sortable: true,
  },
];

export { columns };
