import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { MasterContext } from "../../contexts/MasterContext";
import '../AddCardPopup/AddCardPopup.css'
import './SelectMasterPopup.css'

function SelectMasterPopup({ isOpen, onClose, onSelectMaster}) {
  const masters = React.useContext(MasterContext);
  const [selectedMaster, setSelectedMaster] = React.useState('');
  const buttonText = "Выбрать";

  React.useEffect(() => {
    masters ? setSelectedMaster(masters[0]._id) : setSelectedMaster('')
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    let result = masters.find(item => item._id === selectedMaster);
    onSelectMaster(result);
  }

  return (
    <PopupWithForm
      name={"select"}
      title={"Выберите мастера"}
      buttonTitle={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="select-container__master">
        <div className="select-label">Мастер:</div>
        {masters && 
          <select className="popup__select" value={selectedMaster} onChange={e => setSelectedMaster(e.target.value)}>
            {masters.map(master => (
              <option className="popup__option" value={master._id}>{master.name}</option>
            ))}
          </select>
        }
      </div>

    </PopupWithForm>
  );
}

export default SelectMasterPopup;