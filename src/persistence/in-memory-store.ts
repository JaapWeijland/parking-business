import { IInMemoryStore } from 'src/persistence/interfaces/in-memory-store.interface';
import { v4 } from 'uuid';

export class InMemoryStore<T extends { id: string }>
  implements IInMemoryStore<T>
{
  private _store: T[];

  async get(id: string): Promise<T> {
    const session = this._store.find((object) => object.id === id);

    if (!session) throw new Error('object-not-found');

    return session;
  }

  async save(object: Omit<T, 'id'>): Promise<T> {
    const _object = { ...object, id: v4() } as T;

    this._store.push(_object);

    return _object;
  }
}
