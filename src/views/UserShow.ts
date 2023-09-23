import { View } from "./View"
import { User, UserProps } from '../models/User'

export class UserShow extends View<User, UserProps> {
  template(): string {
      return `
        <div>
          <h1>User Detail</h1>
          <div>User name: ${this.userModel?.get('name')}</div>
          <div style="margin-bottom: 1rem;">User age: ${this.userModel?.get('age')}</div>
        </div>
      `
  }
}