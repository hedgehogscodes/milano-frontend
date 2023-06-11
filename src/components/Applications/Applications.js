import React from "react";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from '../Preloader/Preloader';
import './Applications.css';

function Applications() {
  const [applications, setApplications] = React.useState("");
  const [isSetuping, setIsSetuping] = React.useState(true);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setIsSetuping(true);
    mainApi.getApplications(currentUser._id)
      .then((applications) => {
        setApplications(applications);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSetuping(false);
      });
  }, []);

  function handleApplicationDelete(id) {
    mainApi
      .deleteApplication(id)
      .then(() => {
        const newApplication = applications.filter((c) => c._id !== id);
        setApplications(newApplication);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  return (
    !isSetuping ? (
      <div className="Applications">
        <h1 className="Applications__title">Заявки на запись</h1>
        <ul className="Applications__list">
          {applications.map(application => (
            <li className="Applications__item">
              <div className="item__info">
                <h2 className="item__name">{application.name}</h2>
                <p className="item__description">{`Описание работ: ${application.description}`}</p>
                <p className="item__contacts">{`Контакты:  ${application.contacts}`}</p>
              </div>
              <button className="Application__button Application__button_action_delete" type="button" title="Удалить" onClick={() => handleApplicationDelete(application._id) }></button>
            </li>
          ))}
        </ul>
      </div>) :
      (<Preloader />)
  );
}

export default Applications;