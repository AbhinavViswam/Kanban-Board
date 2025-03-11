import axios from "axios"

const instance = axios.create({
    baseURL:"https://kanban-board-r8w3.onrender.com"
})

export default instance;