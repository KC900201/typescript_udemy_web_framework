import axios from "axios"

// POST
axios.post("http://localhost:3000/users", {
  name: "myname",
  age: 20
})

// GET
axios.get("http://localhost:3000/users/1")