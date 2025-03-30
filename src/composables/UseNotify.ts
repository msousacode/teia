import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  const success = (message?: string) => {
    $q.notify({
      position: 'top',
      type: 'positive',
      message: message || 'Sucesso!',
    });
  };

  const error = (message?: string) => {
    $q.notify({
      position: 'top',
      type: 'negative',
      message: message || 'Ocorreu um erro!',
    });
  };

  return {
    success,
    error,
  };
}
