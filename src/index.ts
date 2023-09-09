import { User } from "./models/User"

// create a new User
const user =  new User({id: 1})

// user.on('save', () => {
//   console.log(user)
// })

// user.save()

user.on('change', () => {
  console.log(user.attributes['data'])
})

user.fetch()
