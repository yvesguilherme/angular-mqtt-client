export class Deferred<T> {
  private readonly PROMISSE: Promise<T>;
  private RESOLVE: (value?: T | PromiseLike<T>) => void;
  private REJECT: (reason?: any) => void;

  constructor() {
    this.PROMISSE = new Promise<T>((resolve, reject) => {
      this.RESOLVE = resolve;
      this.REJECT = reject;
    });
  }

  get promise(): Promise<T> {
    return this.PROMISSE;
  }

  resolve = (value?: T | PromiseLike<T>): void => {
    this.RESOLVE(value);
  }

  reject = (reason?: any): void => {
    this.REJECT(reason);
  }
}
