import React from "react";
import Scheduler from '../Scheduler';
import { NoteMasterContext } from "../../contexts/NoteMasterContext";
import * as mainApi from "../../utils/MainApi";
import { useEffect } from 'react';
import Preloader from '../Preloader/Preloader';

function Schedule() {
  const { noteMaster } = React.useContext(NoteMasterContext);
  const [data, setData] = React.useState(null);
  const [isSetuping, setIsSetuping] = React.useState(true);
  // console.log('noteMaster', noteMaster);
  
  useEffect(() => {
    setIsSetuping(true);
    mainApi.getNotes(noteMaster._id)
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSetuping(false);
      });
  }, [noteMaster])

  return (
    !isSetuping ? (
      <div className='scheduler-container'>
        <Scheduler
          noteMaster={noteMaster}
          events={data}
        />
      </div>
    ) :
    (<Preloader />)
  );
}

export default Schedule;