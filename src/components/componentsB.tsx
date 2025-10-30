import { useUserContext } from "../hooks/useUserContext"

export const ComponentsB = () => {
    const { isAdmin } = useUserContext()
    return (
        <div>{isAdmin ? "Bienvenue le GOAT !" : "Tu es une sous merde"}</div>
    )
}