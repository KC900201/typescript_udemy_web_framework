import { Axios, AxiosResponse } from "axios"
import { Attributes } from "./Attributes"
import { Eventing } from "./Eventing"
import { Sync } from "./Sync"
import { Model } from "./Model"
import { Collection } from "./Collection"

export interface UserProps  {
  id?: number
  name?: string
  age?: number
}

export const rootUrl = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new Sync<UserProps>(rootUrl),
    )
  }

  setRandomAge(): void {
    const age = Math.round(Math.random() * 100)
    this.set({ age })
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) => User.buildUser(json))
  }
}
