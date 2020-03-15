import Axios from "axios"

export async function Getreq(link) {
    return await Axios.get(link)
}