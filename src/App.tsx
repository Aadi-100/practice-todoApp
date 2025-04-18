import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import DeleteSvg from "./assets/delete.svg";
import plusIco from './assets/plus.svg';
import doneIco from './assets/tick-green.svg';
import revertIco from './assets/revert.svg';

interface Todo {
    id: string,
    title: string,
    completed: boolean
}

function App() {
    const [input, setInput] = useState<string>('');
    const [todos, setTodo] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            try {
                setTodo(JSON.parse(storedTodos));
                console.log("Loaded todos from local storage:", JSON.parse(storedTodos));
            } catch (err) {
                console.log("Failed to get todos from local:", err);
            }
        } else {
            console.log("No todos found");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addNewTodo = () => {
        const newItems = { id: uuidv4(), title: input, completed: false };

        if (input) {
            setTodo((prev) => [...prev, newItems]);
            setInput('');
        }
    };

    const removeItem = (id: string) => {
        setTodo(prev => prev.filter(i => i.id !== id));
    };

    const toggleComplete = (id: string) => {
        setTodo(prev =>
            prev.map(i =>
                i.id === id ? { ...i, completed: !i.completed } : i
            )
        );
    };

    return (
        <>
            <div className="flex flex-col items-center w-full h-full p-4">
                <h1 className="text-4xl font-bold">Todo List</h1>

                <div className="w-full max-w-md gap-x-2">
                    <h2 className="text-2xl font-bold text-indigo-900">Things to be done</h2>
                    <div className="h-48 mx-2 overflow-auto">
                        <ul>
                            {todos.filter(i => !i.completed).map((i) => (
                                <li key={i.id}>
                                    <div className="flex flex-row justify-between my-2">
                                        <div className="flex justify-between gap-x-2">
                                            <input onClick={() => toggleComplete(i.id)} type="button" className="w-6 h-6 ml-2 border border-solid rounded-full hover:cursor-pointer bg-white" />
                                            <p className="text-lg break-words w-[300px]">{i.title}</p>
                                        </div>
                                        <img src={DeleteSvg} onClick={() => removeItem(i.id)} className="hover:cursor-pointer w-6 h-6" alt="delete button" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="w-full max-w-md h-12 flex relative border-2 border-gray-500 rounded-r-sm mb-5">
                    <img src={plusIco} className="w-4 absolute z-1 bottom-4 left-3" />
                    <input maxLength={40} onChange={(e) => setInput(e.target.value)} value={input} type="text" className="w-full mx-10 mr-24 focus:outline-none" />
                    <button onClick={addNewTodo} className="text-white bg-indigo-900 w-24 h-full absolute right-0 p-2 items-center justify-center flex rounded-r-xs">
                        Add new
                    </button>
                </div>

                <div className="w-full max-w-md gap-x-2">
                    <h2 className="text-2xl font-bold text-indigo-900">Completed</h2>
                    <div className="h-48 mx-2 overflow-auto">
                        <ul>
                            {todos.filter(i => i.completed).map((i) => (
                                <li key={i.id}>
                                    <div className="flex flex-row justify-between my-2">
                                        <div className="flex justify-between gap-x-2">
                                            <div className="flex items-center justify-center">
                                                <img src={doneIco} className="ml-2 hover:cursor-pointer w-6 h-6 border-2 rounded-full border-green-700" alt="completed task" />
                                            </div>
                                            <p className="text-lg text-green-700 break-words w-[240px]">{i.title}</p>
                                        </div>
                                        <div className="flex justify-between gap-7">
                                            <img className="h-6 w-6" onClick={() => toggleComplete(i.id)} src={revertIco} alt="revert" />
                                            <img src={DeleteSvg} onClick={() => removeItem(i.id)} className="hover:cursor-pointer w-6 h-6" alt="delete button" />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;

