import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function ApplicatePopup({ isOpen, onClose, onApplicate, isLoading}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [contacts, setContacts] = React.useState("");
  const [link, setLink] = React.useState("");
  const buttonText = isLoading ? "Запись..." : "Записаться";

  React.useEffect(() => {
    setTitle("");
    setDescription("");
    setContacts("");
  }, [isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleContactsChange(e) {
    setContacts(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onApplicate({name: title, description, contacts});
  }

  return (
    <PopupWithForm
      name={"applicate"}
      title={"Оставить Заявку"}
      buttonTitle={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input value={title || ""} onChange={handleTitleChange} name="title" id="title" type="text" className="popup__input popup__input_type_title" autoComplete="off" placeholder="ФИО" minLength="2" required />
        <span id="title-error" className=""></span>
      </label>
      <label className="popup__form-label">
        <input value={description || ""} onChange={handleDescriptionChange} name="description" id="description" type="text" className="popup__input popup__input_type_title" autoComplete="off" placeholder="Описание работ" minLength="2" required/>
        <span id="description-error" className=""></span>
      </label>
      <label className="popup__form-label">
        <input value={contacts || ""} onChange={handleContactsChange} name="contacts" id="contacts" type="text" className="popup__input popup__input_type_title" autoComplete="off" placeholder="Контакты" minLength="2" required/>
        <span id="contacts-error" className=""></span>
      </label>

    </PopupWithForm>
  );
}

export default ApplicatePopup;