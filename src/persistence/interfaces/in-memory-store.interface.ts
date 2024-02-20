export interface IInMemoryStore<T> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  getFirst(): Promise<T>;
  save(object: Omit<T, 'id'>): Promise<T>;
  update(object: Partial<Omit<T, 'id'>> & { id: string }): Promise<T>;
}
