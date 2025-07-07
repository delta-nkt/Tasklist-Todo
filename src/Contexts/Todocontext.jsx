import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getDatabase, ref, push, onValue, remove, update } from "firebase/database";
import { useAuth } from "./AuthContext";

export const Todocontext = createContext();

export const useTodo = () => useContext(Todocontext);

export const TodoProvider = ({ children }) => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const db = getDatabase();

  // Fetch todos for the current user
  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }
    const todosRef = ref(db, `todos/${user.uid}`);
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      const loaded = data
        ? Object.entries(data).map(([id, todo]) => ({ id, ...todo }))
        : [];
      setTodos(loaded.reverse());
    });
    return () => unsubscribe();
  }, [user, db]);

  // Add a new todo
  const addTodo = useCallback(
    (todo) => {
      if (!user) return;
      const todosRef = ref(db, `todos/${user.uid}`);
      push(todosRef, { ...todo, completed: false });
    },
    [user, db]
  );

  // Update a todo
  const updatedTodo = useCallback(
    (id, todo) => {
      if (!user) return;
      const todoRef = ref(db, `todos/${user.uid}/${id}`);
      update(todoRef, todo);
    },
    [user, db]
  );

  // Delete a todo
  const deleteTodo = useCallback(
    (id) => {
      if (!user) return;
      const todoRef = ref(db, `todos/${user.uid}/${id}`);
      remove(todoRef);
    },
    [user, db]
  );

  // Toggle complete
  const toggleComplete = useCallback(
    (id) => {
      if (!user) return;
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        const todoRef = ref(db, `todos/${user.uid}/${id}`);
        update(todoRef, { completed: !todo.completed });
      }
    },
    [user, db, todos]
  );

  return (
    <Todocontext.Provider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
      {children}
    </Todocontext.Provider>
  );
}; 