// import { useEffect, useState } from "react"

import Personal from "./components/Personal"

// type Todo = {
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
//   createdAt: string;
//   updatedAt: string;
// };



// const BASE_URL = "https://dataslidtodo-production.up.railway.app/api/todos"


// const App = () => {
  
//   const [todos,setTodos ] =  useState<Todo[]>([])
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null >(null)
//   const [title,setTitle] = useState<string>('')
//   const [description,setDescription] = useState<string>('')
//   const [creating,setCreating] = useState<boolean>(false)
//   const [formError, setFormError] = useState<string | null>(null)

//   const fetchTodos = async () => {
//        try {
//         setLoading(true);
//         setError(null)
//         const res = await fetch(BASE_URL);
//         if(!res.ok) {
//           throw new Error ('failed to fetch todos')
//         }
        
//         const data = await res.json()
//         console.log("API RESPONSE:", data);
//         setTodos(data.data)
        
//        } catch (err:any) {
//           setError(err.message)
//        } finally {
//         setLoading(false)
//        }
//   } 

//     useEffect(()=>{
//       fetchTodos()
//     },[])

//    const createTodo = async () => {
//   if (!title || !description) {
//      setFormError('all fields required')
//     return;
//   }

//   try {
//     setCreating(true);

//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//         body: JSON.stringify({
//         title,
//         description,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create todo");
//     }

//     const result = await response.json();
//     const newTodo = result.data;

    
//     setTodos((prev) => [...prev, newTodo]);

//     setTitle("");
//     setDescription("");
//   } catch (err: any) {
//     alert(err.message);
//   } finally {
//     setCreating(false);
//   }
// };
   
//   return (
//     <div className="h-screen w-full bg-[gold] flex items-center  flex-col py-10 gap-2" >

//         <h1 className="text-blue-900 text-3xl">Todo App</h1>

//         <input type="text" 
//          placeholder="Title"
//            value={title}
//            onChange={(e)=>{
//             setTitle(e.target.value);
//             setFormError(null)
//            }}
//            />


//          <input type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e)=>{
//             setDescription(e.target.value);
//             setFormError(null)
//           }}
          
//           />

//           <button onClick={createTodo} disabled={creating}  >
//               {creating? 'Creating...': 'Add Todo'}
//           </button>
         
//          {loading &&  <p>loading ...please wait!!</p> }
//          { error && <p className="text-red-500">{error}</p>}
//          {formError &&  <p className="text-red-500">{formError}</p> }



         

          

//          <ul>
//            {
//             todos.map((todo)=>(
//               <li key={todo.id}>
//                 <strong>{todo.title}</strong> - {todo.description}
//               </li>
//             ))
//            }
//          </ul>

//          <p>
//           Total Todos : {todos.length}
//          </p>
      
//     </div>
//   )
// }

// export default App






const App = () => {
  return (
    <div>
        <Personal/>
    </div>
  )
}

export default App




