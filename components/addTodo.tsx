import React, { useState } from "react";
import {mapTo, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { useDispatch, useActionHandler, useStoreEffect } from "react-mono-state";
import { ActionTypes } from "../states/appState";

export const AddTodo = () => {
  
  const dispatch= useDispatch();
  const [description, setDescription] = useState('');
  const [isSearching, togglleSearching]=useState(false)

  const [{data:isAdded}, toggle]=useActionHandler<boolean>(action$=>action$.whereType(ActionTypes.TODOS_ADDED).pipe(mapTo(true)));
  
  function handleSubmit(e) {
    e.preventDefault();
    if(!isSearching)
    dispatch(ActionTypes.ADD_TODO, { completed: false, description });
  }

  if(isAdded){
    setDescription('');
    toggle(false)
  }
  if(isSearching)
    dispatch(ActionTypes.SEARCH_INPUT, description);
   
  useStoreEffect(action$ => action$.whereType(ActionTypes.SEARCH_INPUT).pipe(
        debounceTime(320),
        distinctUntilChanged(),
        map(action => ({ type: ActionTypes.SEARCHING_TODOS, payload: action.payload }))
    ));

  return (
      <form onSubmit={handleSubmit} className="mb-4">
        <h1 className="text-grey-darkest">Todo List</h1>
        <div className="flex flex mt-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={isSearching?'Search todos':'What needs to be done?'}
               />
        <div onClick={e=>{
          togglleSearching(val=>!val);
          setDescription('');
          dispatch(ActionTypes.SEARCHING_TODOS,'');
          }}
        className="pin-r pin-t mt-2 mr-4 text-purple-lighter cursor-pointer">🔎</div>

        </div>
      </form>
      );
}
