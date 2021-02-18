import { apiUrl } from "../config"

export const loadNotices = async (page=1) => {
    if(isNaN(parseInt(page))){
        throw new Error("Page Not Found!");
    }
    const response = await fetch(`${apiUrl}?page=${page}`);
    if(!response.ok)
        throw new Error("Failed to load notices.")
    const data =  await response.json();
    return data.notices;
}