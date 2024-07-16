export class DataHora {
  private data: Date = new Date();

  public getDataHora(): string {
    return this.data.toLocaleString();
  }
}
