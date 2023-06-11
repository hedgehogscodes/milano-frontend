import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { MasterContext } from "../../contexts/MasterContext";
import './AddCardPopup.css'

function AddCardPopup({ isOpen, onClose, onAddPlace, isLoading}) {
  const masters = React.useContext(MasterContext);
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");
  const [selectedMaster, setSelectedMaster] = React.useState('');
  const buttonText = isLoading ? "Создание..." : "Создать";

  React.useEffect(() => {
    setTitle("");
    setLink("");
    masters ? setSelectedMaster(masters[0]._id) : setSelectedMaster('')
  }, [isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ title, link, master: selectedMaster });
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новая фотокарточка"}
      buttonTitle={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="select-container">
        <div className="select-label">Мастер:</div>
        {masters && 
          <select className="popup__select" value={selectedMaster} onChange={e => setSelectedMaster(e.target.value)}>
            {masters.map(master => (
              <option className="popup__option" value={master._id}>{master.name}</option>
            ))}
          </select>
        }
      </div>
      <label className="popup__form-label">
        <input value={title || ""} onChange={handleTitleChange} name="title" id="title" type="text" className="popup__input popup__input_type_title" autoComplete="off" placeholder="Название" minLength="2" maxLength="30" required/>
        <span id="title-error" className=""></span>
      </label>
      <label className="popup__form-label">
        <input value={link || ""} onChange={handleLinkChange} name="link" id="link" type="url" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
        <span id="link-error" className=""></span>
      </label>

    </PopupWithForm>
  );
}

export default AddCardPopup;