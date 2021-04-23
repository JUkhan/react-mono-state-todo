import React from 'react';
import { merge} from 'rxjs';
import { pluck, delay, mapTo } from "rxjs/operators";
import { useStream } from "react-mono-state";
import { ActionTypes } from "../states/appState";


export const Error= () => {
   
   const [{data}]=useStream<boolean>(action$=>{
     const error$=action$.whereType(ActionTypes.TODOS_ERROR);
     return merge(
      error$.pipe(pluck("payload")),
      error$.pipe(
        delay(3000),
        mapTo("")
      )
    );
   });

    return <div className="errors">{data}</div>
}
