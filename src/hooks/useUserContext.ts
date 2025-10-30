import { useContext } from "react"
import { UserContext } from "../components/userContext"

export const useUserContext = () => {
    const contexte = useContext(UserContext)
        if (!contexte) throw new Error("UserContext is not defined")
    return contexte
}