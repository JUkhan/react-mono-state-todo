import React, { FC, useState, useRef } from "react";
import { useDispatch, useActionHandler } from 'react-mono-state';
import { mapTo } from "rxjs/operators";
import { Todo } from "../states/appState";
import { ActionTypes } from "../states/appState";

export const UpdateTodo: FC<Todo> = ({ completed, description, id }) => {
  const dispatch = useDispatch();
  const [editable, setEditable]=useState(false);
  const [value, setDescription]=useState(description);
  const inputRef = useRef(null);
  const [{data:isUpdated}, toggle]=useActionHandler<boolean>( action$ =>   action$.whereType(ActionTypes.TODOS_UPDATED).pipe(mapTo(true)));

  if(isUpdated){
    setEditable(false);
    toggle(false);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(ActionTypes.UPDATE_TODO, { id, completed, description:value });
  }

  function doubleClickHandler(){
    setEditable(true);
    setTimeout(()=>{
      inputRef.current.focus();
    })
    
  }

  return (
    <div>
      <input
        className="align-middle mr-1"
        type="checkbox"
        defaultChecked={completed}
        onChange={(e) => dispatch(ActionTypes.UPDATE_TODO, { id, description, completed: e.target.checked })}
      />

      {editable ? <form className="inline-block" onSubmit={handleSubmit}>
      <input
        className="ml-1 pl-2 border"
        onBlur={() => setEditable(false)}
        defaultValue={value}
        onChange={e => setDescription(e.currentTarget.value)}
        type="text"
        ref={inputRef}
      /></form>
        :
        <span
          style={{ cursor: 'pointer' }}
          onDoubleClick={doubleClickHandler}
        >
          {description}
        </span>}
    </div>
  );
};