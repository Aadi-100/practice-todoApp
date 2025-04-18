import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

import DeleteSvg from "./assets/delete.svg";
import plusIco from './assets/plus.svg'
import doneIco from './assets/tick-green.svg'
import revertIco from './assets/revert.svg'

function App() {
    const [input, setInput] = useState('')
    const [todos, setTodo] = useState([])

    useEffect(()=> {
        const storedTodos = localStorage.getItem('todos')
        if (storedTodos){
            try {
                setTodo(JSON.parse(storedTodos))
                console.log("Loaded todos from local storage:", JSON.parse(storedTodos))
            } catch(err){
                console.log("Failed to get todos from local:", err)
            }
        }else{
            console.log("No todos found")
        }
    }, [])

    useEffect(()=> {
        localStorage.setItem('todos',JSON.stringify(todos))
    }, [todos])



    const addNewTodo = () =>{
        let newItems = {id: uuidv4(), title:input, completed:false}

        if (input){
            setTodo((prev) => [...prev, newItems])
            setInput('')
        }
    }

    const removeItem = (id) => {
        setTodo(prev => prev.filter(i => i.id !== id))
    }
    
    const toggleComplete = (id) => {
        setTodo(prev => 
            prev.map(i => 
                i.id === id ? { ...i, completed: !i.completed } : i
            )
        );
    };

    
    return (
      <>
        <div className="flex flex-col items-center w-screen h-full ">
            <h1 className="text-[50px] font-bold">Todo List</h1>

            <div className="w-[500px] gap-x-2">
                <h2 className="text-[27px] font-bold text-indigo-900">Things to be done</h2>
                    <div className="h-[200px] mx-2 overflow-auto">
                        <ul>

                            
                            {todos.filter(i => !i.completed).map((i) => (
                                <li key={i.id}>
                                    <div className="flex flex-row justify-between w-full p-2">
                                        <div className="flex justify-between gap-x-2">
                                            <input onClick={()=>toggleComplete(i.id)} type="button" className="w-6 h-6 ml-2 border border-solid rounded-full hover:cursor-pointer bg-white"/>
                                            <p className={"text-[19px]"}>{`${i.id}, ${i.title}`}</p>
                                        </div>
                                        <img src={DeleteSvg} onClick={()=>removeItem(i.id)} className="hover:cursor-pointer" alt="delete button"/>
                                    </div>
                                </li>
                            ))} 
                            
                        </ul>
                </div>
            </div>

            <div className="w-[450px] h-[50px] flex relative border-2 border-gray-500 rounded-r-sm mb-[20px]">
                <img src={plusIco} className="w-4 absolute z-1 bottom-4 left-3"/>
                <input onChange={(e)=> setInput(e.target.value)} type="text" className="w-full mx-10 mr-[100px] focus:outline-hidden"/>
                <button onClick={addNewTodo} className="text-white bg-indigo-900 w-[100px] h-full absolute right-0 p-[10px] items-center justify-center flex rounded-r-xs">
                    Add new
                </button>
            </div>

            <div className="w-[500px] gap-x-2">
                <h2 className="text-[27px] font-bold text-indigo-900">Completed</h2>
                <div className="h-[200px] mx-2 overflow-auto">
                    <ul>
                        
                            {todos.filter(i => i.completed).map((i) => (
                                <li key={i.id}>
                                    <div className="flex flex-row justify-between w-full p-2">
                                        <div className="flex justify-between gap-x-2 ml-3">
                                            <img src={doneIco} className="hover:cursor-pointer w-6 h-6 border-2 rounded-full border-green-700" alt="completed task"/>
                                            <p className={"text-[19px] text-green-700"}>{`${i.id}, ${i.title}`}</p>
                                        </div>
                                        <div className="flex justify-between gap-7">
                                            <img className="w-6" onClick={()=> toggleComplete(i.id)} src={revertIco} alt="revert" />
                                            <img src={DeleteSvg} onClick={()=> removeItem(i.id)} className="hover:cursor-pointer" alt="delete button"/>
                                        </div>
                                        
                                    </div>
                                </li>
                            ))} 

                    </ul>
                </div>
            </div>
        </div>
      </>
  )
}

export default App
