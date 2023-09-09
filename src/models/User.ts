import { Axios, AxiosResponse } from "axios"
import { Attributes } from "./Attributes"
import { Eventing } from "./Eventing"
import { Sync } from "./Sync"

export interface UserProps  {
  id?: number
  name?: string
  age?: number
}

const rootUrl = 'http://localhost:3000/users'

export class User {
  public events: Eventing = new Eventing()
  public syncs: Sync<UserProps> = new Sync<UserProps>(rootUrl)
  public attributes: Attributes<UserProps>

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

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

  set(update: UserProps): void {
      this.attributes.set(update)
      this.events.trigger('change')
  }

  fetch(): void {
    const id = this.get('id') as number | undefined

    if(!id) {
      throw new Error('Cannot fetch without an id')
    }

    this.syncs.fetch(id).then((response: AxiosResponse):void => {
      this.set(response.data)
    })
  }

  save(): void {
    this.syncs.save(this.attributes.getAll()).then((responese: AxiosResponse): void => {
      this.trigger('save')
    })
    .catch(() => {
      this.trigger('error')
    })
  }
}

