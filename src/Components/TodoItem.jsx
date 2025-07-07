import React, { useState } from "react";
import { useTodo } from "../Contexts";

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.788l-4 1 1-4 14.362-14.3z" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TodoItem = ({ todo }) => {
  const { updatedTodo, deleteTodo, toggleComplete } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editValue.trim()) return;
    updatedTodo(todo.id, { ...todo, todo: editValue });
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center justify-between bg-white rounded-xl shadow p-4 transition border ${todo.completed ? 'opacity-60 line-through' : ''}`}>
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-5 h-5 accent-indigo-600 cursor-pointer"
        />
        {isEditing ? (
          <form onSubmit={handleUpdate} className="flex-1 flex gap-2 items-center">
            <input
              className="flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
            />
            <button type="submit" className="bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600 transition">Save</button>
          </form>
        ) : (
          <span
            className={`flex-1 text-lg cursor-pointer ${todo.completed ? 'text-gray-400' : 'text-gray-900'}`}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.todo}
          </span>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-indigo-500 hover:text-indigo-700 font-semibold px-2 py-1 rounded flex items-center"
            title="Edit"
          >
            <EditIcon />
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded flex items-center"
          title="Delete"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

// function TodoItem() {
//   //state for editable checek and 
//   const [isTodoEditable , setisTodoEditable] = useState(false)

//   // state to handle msg
//   const [todoMsg ,setTodoMsg] = useState(todo.todo)
//   // context se values le aao
//   const {updatedTodo , deleteTodo, toggleComplete} = useTodo

//   const editTodo=()=>{
//     // todo.todo pass not allowed as it takes an object
//     // first spread the existing values.
//     updatedTodo(todo.id,{...todo, todo:todoMsg})
//     setisTodoEditable(false)
//   }

//   const toggleCompleted =()=>{
//     toggleComplete(todo.id)
//   }

//   return (
//     <div
//         className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
//             todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
//         }`}
//     >
//         <input
//             type="checkbox"
//             className="cursor-pointer"
//             checked={todo.completed}
//             onChange={toggleCompleted}
//         />
//         <input
//             type="text"
//             className={`border outline-none w-full bg-transparent rounded-lg ${
//                 isTodoEditable ? "border-black/10 px-2" : "border-transparent"
//             } ${todo.completed ? "line-through" : ""}`}
//             value={todoMsg}
//             onChange={(e) => setTodoMsg(e.target.value)}
//             readOnly={!isTodoEditable}
//         />
//         {/* Edit, Save Button */}
//         <button
//             className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
//             onClick={() => {
//                 if (todo.completed) return;

//                 if (isTodoEditable) {
//                     editTodo();
//                 } else setisTodoEditable((prev) => !prev);
//             }}
//             disabled={todo.completed}
//         >
//             {isTodoEditable ? "📁" : "✏️"}
//         </button>
//         {/* Delete Todo Button */}
//         <button
//             className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
//             onClick={() => deleteTodo(todo.id)}
//         >
//             ❌
//         </button>
//     </div>
// );

// }

// export default TodoItem;