export interface IInMemoryStore<T> {
  get(id: string): Promise<T>;

  save(object: Omit<T, 'id'>): Promise<T>;
}
