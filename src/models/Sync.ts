import axios, { type AxiosPromise} from "axios"

interface ID {
  id?: number
}

export class Sync<T extends ID> {
  constructor(public rootUrl: string)  {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`)
  }

  save(data: T): AxiosPromise {
    const { id } = data

    if(id) {
      // put (update)
      return axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      // post
      return axios.post(this.rootUrl, data)
    }
  }
}