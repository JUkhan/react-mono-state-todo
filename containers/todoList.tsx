import React from "react";
import {useTodos} from '../hooks/useTodos';
import {Todo} from './todo'

export const TodoList =() => {
  const todos = useTodos();

  if(!todos) return <b>loading...</b>
  return (
    todos.map(todo=><Todo key={todo.id} todo={todo} />)
  );
};
