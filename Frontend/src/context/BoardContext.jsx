import { createContext, useState } from "react"

export const BoardContext = createContext();

export const BoardProvider = ({children}) => {
    const [boardId,setBoardId] = useState("")
    return (
        <BoardContext.Provider value={{boardId,setBoardId}}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardProvider;