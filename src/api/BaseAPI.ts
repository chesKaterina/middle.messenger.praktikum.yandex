import HttpTransport from '../utils/HttpTransport';

export default abstract class BaseAPI {
  protected http: HttpTransport;

  protected constructor() {
    this.http = new HttpTransport();
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(identifier: string, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: string): Promise<unknown>;
}
 // Абстрактный класс BaseAPI - класс, который не содержит реализацию, но описывает интерфейс.
 //Мы можем от него наследоваться, но не можем создавать инстансы, т.к там не все реализовано
