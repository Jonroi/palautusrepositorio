import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'
// get all notes and their content
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}
// create a new note
const create = newObject => { 
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}
// update a note
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
// delete a note
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

export default { getAll, create, update, remove }