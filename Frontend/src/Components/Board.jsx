import React, { useEffect, useState } from 'react'
import axios from "../Config/axios"

function Board() {

    const [boards,setBoards] = useState([])
    const [title,setTitle] = useState("")
    const [selectBoard,setSelectBoard] = useState("")
    
    useEffect(()=>{
        if(selectBoard){
            console.log(selectBoard)
        }
    },[selectBoard])

    const fetchBoards = async() => {
        let res = await axios.get("/api/boards")
        setBoards(res.data.boards)
    }

    useEffect(()=>{
        fetchBoards();
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        await axios.post("/api/boards",{
            title
        })
        setTitle("")
        fetchBoards();
    }

  return (
    <div className='container'>
    <div className='boards'>
        <h1>BOARDS</h1>
        {
            (boards.length?(
                <div>
                    {boards.map((b,i)=>(
                        <button key={i} onClick={()=>setSelectBoard(b._id)}>
                            {b.title}
                        </button>
                    ))}
                </div>
            ):("Create a board to start"))
        }
    </div>
    <div className='createBoard'>
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' />
            <button>Create</button>
        </form>
    </div>
    </div>
  )
}

export default Board