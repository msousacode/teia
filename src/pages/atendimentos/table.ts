const columns = [
    { name: 'aprendiz', align: 'left', label: 'Aprendiz', field: row => row.aprendiz.label, sortable: true },
    { name: 'data_inicio', align: 'left', label: 'Data ínicio', field: 'data_inicio', sortable: true },
    { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: true }
  ]
  
  export {
    columns
  }