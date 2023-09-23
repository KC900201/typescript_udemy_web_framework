import { UserList } from "./views/UserList"
import { Collection } from "./models/Collection"
import { User, UserProps, rootUrl } from "./models/User"

const users = new Collection(rootUrl, (json: UserProps) => {
  return User.buildUser(json)
})

users.on('change', () => {
  const root = document.getElementById('root')

  if(root) {
    new UserList(root, users).render()
  }
})

users.fetch()