import { Attributes } from "./Attributes"
import { Eventing } from "./Eventing"
import { Sync } from "./Sync"

export interface UserProps  {
  id?: number
  name?: string
  age?: number
}

const rootUrl = 'https://localhost:3000/users'

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

  // Continue
  fetch(): void {
    
  }
}

