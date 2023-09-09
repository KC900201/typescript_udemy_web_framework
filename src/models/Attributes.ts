export class Attributes<T extends object> {
  constructor(private data: T) {}

  // Generic constraints
  // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
  get = <K extends keyof T>(propName: K): T[K] => {
    // Becomes arrow function
    return  this.data[propName]
  }

  set(update: T): void {
    Object.assign(this.data, update)
  }

  getAll(): T {
    return this.data
  }

}

