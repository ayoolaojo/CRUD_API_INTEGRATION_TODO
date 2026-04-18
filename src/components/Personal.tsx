import { useState } from "react";


   

const Personal = () => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ✨ My Todo App
        </h1>

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

          <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-all">
            Add Todo
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  Sample Todo {item}
                </p>
                <p className="text-sm text-gray-500">
                  This is a description
                </p>
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">
                  ✓
                </button>
                <button className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-sm">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Personal



  
