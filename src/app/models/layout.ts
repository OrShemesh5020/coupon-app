export class Layout {
  constructor(
    public id: number,
    public navigation: string,
    public title: string,
    public type: ComponentType
  ) {}
}

export enum ComponentType {
  HEADER,
}
