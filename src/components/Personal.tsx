import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

const BASE_URL = "https://dataslidtodo-production.up.railway.app/api/todos";

const Personal = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Unable to fetch data");

      const data = await res.json();
      setTodos(data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title || !description) {
      setError("All fields required");
      return;
    }

    try {
      setCreating(true);
      setError(null);

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) throw new Error("Failed to create Todo");

      const result = await res.json();
      const newTodo = result.data;

      setTodos((prev) => [newTodo, ...prev]); // add to top
      setTitle("");
      setDescription("");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setCreating(false);
    }
  };

  const toggleComplete = async (todo: Todo) => {
    setProcessingId(todo.id);

    // ✅ Optimistic UI (instant update)
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const res = await fetch(`${BASE_URL}/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const result = await res.json();
      const updated = result.data;

      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? updated : t))
      );
    } catch (err: any) {
      setError(err.message);

      // ❌ rollback if failed
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: todo.completed } : t
        )
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setProcessingId(id);

    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Todo App
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Todo Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            onClick={addTodo}
            disabled={creating}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {creating ? "Creating Todo..." : "Add Todo"}
          </button>

          {loading && <p className="text-center">Loading...</p>}
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <div>
                <p
                  className={`font-semibold ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </p>
                <p className="text-sm text-gray-500">
                  {todo.description}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(todo)}
                  disabled={processingId === todo.id}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm disabled:opacity-50"
                >
                  {processingId === todo.id ? "..." : "✓"}
                </button>

                <button className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-sm">
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(todo.id)}
                  disabled={processingId === todo.id}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm disabled:opacity-50"
                >
                  {processingId === todo.id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personal;
