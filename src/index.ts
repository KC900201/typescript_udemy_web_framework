import { User } from "./models/User"


const user = new User({name: 'John', age: 12})

console.log(user.get('name'))

user.set({name: 'Jenny'})

console.log(user.get('name'))