import { useEffect, useState } from "react"
import axios from "axios"

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        const getData = async() => {
            try {
                setIsLoading(true)
                const response = await axios.get(url);
                setData(response.data)
            } catch(error) {
                if(error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("Internal server exception");
                }
            } finally {
                setIsLoading(false)
            }
        };
        getData()
    },[url])

    return {data, error, isLoading};
}