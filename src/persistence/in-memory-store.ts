import { IInMemoryStore } from 'src/persistence/interfaces/in-memory-store.interface';
import { v4 } from 'uuid';

export abstract class InMemoryStore<T extends { id: string }>
  implements IInMemoryStore<T>
{
  protected _store: T[] = [];

  async get(id: string): Promise<T> {
    const object = this._store.find((object) => object.id === id);

    if (!object) throw new Error('object-not-found');

    return object;
  }

  async getAll(): Promise<T[]> {
    return this._store;
  }

  async getFirst(): Promise<T> {
    const object = this._store[0];

    if (!object) throw new Error('object-not-found');

    return object;
  }

  async save(object: Omit<T, 'id'>): Promise<T> {
    const _object = { ...object, id: v4() } as T;

    this._store.push(_object);

    return _object;
  }

  async update(
    partialObject: Partial<Omit<T, 'id'>> & { id: string },
  ): Promise<T> {
    const index = this._store.findIndex(
      (_object) => _object.id === partialObject.id,
    );

    if (index === -1) throw new Error('object-not-found');

    const object = this._store[index];

    const newObject: T = {
      ...object,
      ...partialObject,
    };

    this._store.splice(index, 1);
    this._store.push(newObject);

    return newObject;
  }
}
