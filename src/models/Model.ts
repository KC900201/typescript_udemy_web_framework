import { AxiosPromise, AxiosResponse } from "axios"

interface ID {
  id?: number
}

interface ModelAttributes<T> {
  set(value: T): void
  getAll(): T
  get<K extends keyof T>(propName: K): T[K]
}

interface Sync<T> {
  fetch(id: number): AxiosPromise
  save(data: T): AxiosPromise
}

interface Events {
  on(eventName: string, callback:() => void): void
  trigger(eventName: string): void
}

export class Model<T extends ID> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

    // passThrough methods to retrieve attributes w/o accessor
    get on() {
      // return a reference of event.on()
      return this.events.on
    }
  
    get trigger() {
      return this.events.trigger
    }
  
    get get() {
      return this.attributes.get
    }
  
    set(update: T): void {
        this.attributes.set(update)
        this.events.trigger('change')
    }
  
    fetch(): void {
      const id = this.get('id') as number | undefined
  
      if(!id) {
        throw new Error('Cannot fetch without an id')
      }
  
      this.sync.fetch(id).then((response: AxiosResponse):void => {
        this.set(response.data)
      })
    }
  
    save(): void {
      this.sync.save(this.attributes.getAll()).then((responese: AxiosResponse): void => {
        this.trigger('save')
      })
      .catch(() => {
        this.trigger('error')
      })
    }
}