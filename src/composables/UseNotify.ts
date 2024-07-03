import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  const success = (message?: string) => {
    $q.notify({
      position: 'bottom',
      type: 'positive',
      message: message || 'Sucesso!',
    });
  };

  const error = (message?: string, ...err: any) => {
    console.error(err);
    $q.notify({
      position: 'bottom',
      type: 'negative',
      message: message || 'Ocorreu um erro!',
    });
  };

  return {
    success,
    error,
  };
}
