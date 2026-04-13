import { useEffect, useState } from "react"

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};



const BASE_URL = "https://dataslidtodo-production.up.railway.app/api/todos"


const App = () => {
  
  const [todos,setTodos ] =  useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null >(null)
  const [title,setTitle] = useState<string>('')
  const [description,setDescription] = useState<string>('')

  const fetchTodos = async () => {
       try {
        setLoading(true);
        setError(null)
        const res = await fetch(BASE_URL);
        if(!res.ok) {
          throw new Error ('failed to fetch todos')
        }
        
        const data:Todo[] = await res.json()
        setTodos(data)
        
       } catch (err:any) {
          setError(err.message)
       } finally {
        setLoading(false)
       }
  } 

    useEffect(()=>{
      fetchTodos()
    },[])
  return (
    <div className="h-screen w-full bg-[gold] flex items-center  flex-col py-10 gap-2" >

        <h1 className="text-blue-900 text-3xl">Todo App</h1>

        <input type="text" 
         placeholder="Title"
           value={title}
           onChange={(e)=>setTitle(e.target.value)}
           />


         <input type="text"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          
          />
         
         {loading &&  <p>loading ...please wait!!</p> }
         { error && <p className="text-red-500">{error}</p>}


         

          

         <ul>
           {
            todos.map((todo)=>(
              <li key={todo.id}>
                <strong>{todo.title}</strong> - {todo.description}
              </li>
            ))
           }
         </ul>

         <p>
          Total Todos : {todos.length}
         </p>
      
    </div>
  )
}

export default App


