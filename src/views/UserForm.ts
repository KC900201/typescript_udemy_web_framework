import { User, UserProps } from "../models/User"
import { View } from "./View"

export class UserForm extends View<User, UserProps> {
  eventsMap(): {[key:string]: () => void} {
    return {
      'click:#set-random-age': this.onSetRandomAge,
      'click:#set-random-name': this.onSetRandomName,
      'click:#save-model': this.onSaveModel,
    }
  }

  onSaveModel = (): void => {
    this.userModel?.save()
  }

  onSetRandomAge = (): void => {
    this.userModel?.setRandomAge()
  }

  onSetRandomName = (): void => {
    const input = this.parent.querySelector('input')

    if(input?.value) {
      const name = input.value

      this.userModel?.set({ name })
    }
  }

  template(): string {
    return `
      <div>
        <div>
          <input placeholder=${this.userModel?.get('name')} />
          <button id='set-random-name'>Update name</button>
          <button id='set-random-age'>Set random age</button>
        </div>
        <button id='save-model' style="margin-top: 1rem;">Save user</button>
      </div>
    `
  }
}