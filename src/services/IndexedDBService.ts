import { v4 as uuid } from 'uuid';

export class IndexedDBService {
  save = async (collection: string, data: any) => {
    try {
      data.uuid = uuid();
      console.log('Saving to IndexedDB', collection, data);

      return data;
    } catch (error) {
      console.error('Error saving to IndexedDB', error);
    }
  };
}
