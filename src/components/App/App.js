import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Cards from '../Cards/Cards';
import SavedCards from '../SavedCards/SavedCards';
import Settings from '../Settings/Settings';
import Profile from '../Profile/Profile';
import Applications from '../Applications/Applications';
import Reviews from '../Reviews/Reviews';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import AddCardPopup from '../AddCardPopup/AddCardPopup';
import ApplicatePopup from '../ApplicatePopup/ApplicatePopup';
import DeleteCardPopup from '../DeleteCardPopup/DeleteCardPopup';
import SelectMasterPopup from '../SelectMasterPopup/SelectMasterPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ImagePopup from '../ImagePopup/ImagePopup';
import PopupClose from '../PopupClose/PopupClose';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Schedule from '../Schedule/Schedule';
import NotFound from '../NotFound/NotFound';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { FormMessageContext } from '../../contexts/FormMessageContext';
import { StoredDataContext } from '../../contexts/StoredDataContext';
import { MasterContext } from '../../contexts/MasterContext';
import { NoteMasterContext } from '../../contexts/NoteMasterContext';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import { successMessage, errorMessages, applyNameFilter, getStoredData } from "../../utils/utils";
import Preloader from '../Preloader/Preloader';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import successLogo from "../../images/Success.svg";
import failLogo from "../../images/Error.svg";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [masters, setMasters] = useState(null);
  const [cards, setCards] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [dataInfoTool, setDataInfoTool] = useState({
    title: "",
    icon: "",
  });
  const [storedData, setStoredData] = useState(null);
  const [noteMaster, setNoteMaster] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
  const [isPopupSelectOpen, setIsPopupSelectOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);
  const [isApplicatePopupOpen, setIsApplicatePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSetuping, setIsSetuping] = useState(true);

  const [formMessage, setFormMessage] = useState(null);

  const history = useHistory();

  function uploadData() {
    setIsSetuping(true);
    const promises = [mainApi.getUserInfo(), mainApi.getMyCards(), mainApi.getAllCards(), mainApi.getSavedCards(),  mainApi.getMasters()];
    Promise.all(promises)
      .then(([user,myCards, cards, savedCards, masters]) => {
        const { storedSearch, storedCheckboxState } = getStoredData();
        setStoredData({ storedSearch, storedCheckboxState });

        setCurrentUser(user);
        setMyCards(myCards);
        setCards(applyNameFilter(cards, storedSearch));
        setSavedCards(savedCards);
        setMasters(masters);
        setNoteMaster(user);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSetuping(false);
      });
  }

  function handleEditAvatarClick(){
    setIsPopupAvatarOpen(true);
    disableBodyScroll(document.body);
  }

  function handleEditProfileClick(){
    setIsPopupEditOpen(true);
    disableBodyScroll(document.body);
  }

  function handleSelectMasterClick(){
    setIsPopupSelectOpen(true);
    disableBodyScroll(document.body);
  }

  function handleAddCardClick(){
    setIsPopupAddOpen(true);
    disableBodyScroll(document.body);
  }

  function handleApplicateClick(){
    setIsApplicatePopupOpen(true);
    disableBodyScroll(document.body);
  }

  function handleDeleteCardClick(card) {
    setDeleteCardPopupOpen(true);
    setCardDelete(card);
    disableBodyScroll(document.body);
  }

  function handleNavigationClick() {
    setIsMobileNavigationOpen(true);
  }

  function handleResetFormMessage() {
    setFormMessage(null);
  }

  function handleCardClick(card, isSavePage) {
    setSelectedCard({
      isOpen: true,
      link: isSavePage ? card.card.link : card.link,
      title: isSavePage ? card.card.name : card.name,
    });
    disableBodyScroll(document.body);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
    disableBodyScroll(document.body);
  }

  function closeAllPopups() {
    setIsMobileNavigationOpen(false);
    setIsPopupAvatarOpen(false);
    setIsPopupEditOpen(false);
    setIsPopupAddOpen(false);
    setIsApplicatePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setIsLoading(false);
    setIsInfoTooltipOpen(false);
    setIsPopupSelectOpen(false);
    enableBodyScroll(document.body);
  }

  function handleSelectMaster(master) {
    setNoteMaster(master);
    closeAllPopups();
    history.push('/schedule');
  }

  function handleUpdateAvatar({ link }) {
    setIsLoading(true);
    mainApi
      .editAvatar(link)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleUpdateUser({ name, status }) {
    setIsLoading(true);
    mainApi
      .saveUserInfo({ name, status })
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  const handleUpdateUserSettings = (password, email) => {
    setIsLoading(true);
    mainApi
      .saveUserSettings(password, email)
      .then((res) => {
        setCurrentUser(res);
        setFormMessage(successMessage.successMessage);
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        if (err === 400) {
          return setFormMessage(errorMessages.validateMessage);
        }
        if (err === 409) {
          return setFormMessage(errorMessages.uniqueMailMessage);
        }
        return setFormMessage(errorMessages.defaultMessage);
      })
  }

  function handleAddCardSubmit({ title, link, master }) {
    setIsLoading(true);
    mainApi
      .addCard({ title, link, master })
      .then((newCard) => {
        const currentMaster = masters.filter((item) => {
          return item._id === master;
        })
        newCard.master = currentMaster[0];
        setMyCards([newCard, ...myCards]);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleApplicateSubmit({ name, description, contacts }) {
    setIsLoading(true);
    mainApi
      .createApplication({ name, description, contacts })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleAddReviewSubmit({ description }) {
    const createdAt = new Date().toLocaleDateString('ru');
    mainApi
      .createReview({ description, createdAt })
      .then((newReview) => {
        newReview.owner = currentUser;
        setReviews([newReview, ...reviews]);
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  function handleRegister( name, email, password ) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((data) => {
        setFormMessage(null);
        setIsLoading(false)
        history.push("/signin");
        setDataInfoTool({ title: "Вы успешно зарегистрировались!", icon: successLogo });
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        setIsLoading(false)
        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
        handleInfoTooltipOpen();
        if (err === 400) {
          return setFormMessage(errorMessages.validateMessage);
        }
        if (err === 409) {
          return setFormMessage(errorMessages.uniqueMailMessage);
        }
        return setFormMessage(errorMessages.defaultMessage);
      })
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .authorize(email, password)
      .then((data) => {
        setFormMessage(null);
        localStorage.setItem("token", data.token);
        return uploadData();
      })
      .then(() => history.push('/profile'))
      .catch((err) => {
        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
        handleInfoTooltipOpen();
        if (err === 400) {
          return setFormMessage(errorMessages.validateMessage);
        }
        if (err === 401) {
          return setFormMessage(errorMessages.incorrectDataMessage);
        }
        return setFormMessage(errorMessages.defaultMessage);
      })
      .finally(() => setIsLoading(false));
  }

  function signOut() {
    setCurrentUser(null);
    setCards([]);
    setMyCards([]);
    setSavedCards([])
    localStorage.removeItem('searchParameter');
    localStorage.removeItem('checkboxState');
    localStorage.removeItem("token");
    history.push("/");
  }

  function handleSearchSubmit(searchParameter, checkboxState) {
    localStorage.setItem('searchParameter', searchParameter);
    localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
    
    setIsLoading(true);
    mainApi
      .getAllCards()
      .then((res) => {
        setCards(applyNameFilter(res, searchParameter));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardButtonClick(card, isSaved, isSavePage) {
    let movieId = card._id;
    if(isSaved){
      if(isSavePage){
        movieId = savedCards.find((item) => item.card._id === card.card._id)._id;
      } else {
        movieId = savedCards.find((item) => item.card._id === card._id)._id;
      }
      mainApi
        .deleteSave(movieId)
        .then(() =>
          setSavedCards((state) =>
            state.filter((item) =>
              item._id !== movieId)))
        .catch((err) => console.log(err));
    }else{
      mainApi
        .saveCard(movieId)
        .then((res) => {
          const currentCard = cards.filter((item) => {
            return item._id === res.card;
          })
          res.card = currentCard[0];
          res.owner = currentUser;
          setSavedCards([res, ...savedCards])
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardButtonDelete(card) {
    setIsLoading(true);
    mainApi
      .deleteAllSave(card._id)
      .then(() => {
        const newSavedCards = savedCards.filter((c) => c.card._id !== card._id);
        setSavedCards(newSavedCards);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
    mainApi
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        const newMyCards = myCards.filter((c) => c._id !== card._id);
        setMyCards(newMyCards);
        closeAllPopups();
      })
      .catch((err) => console.log(`Error ${err}`));
  }

  useEffect(() => {
    mainApi.getReviews()
      .then((reviews) => {
        setReviews(reviews);
      })
      .catch((err) => console.log(err))
    uploadData();
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MasterContext.Provider value={masters}>
        <IsLoadingContext.Provider value={isLoading}>
          <StoredDataContext.Provider value={storedData}>
            <FormMessageContext.Provider value={{formMessage, handleResetFormMessage}}>
              <NoteMasterContext.Provider value={{noteMaster, setNoteMaster}}>
                <div className="page">
                  {!isSetuping ? (
                    <Switch>
                      <Route exact path="/">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <Main onApplicateClick={handleApplicateClick}/>
                        <Footer />
                      </Route>

                      <Route exact path="/reviews">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <Reviews 
                          reviews={reviews}
                          onAddReview={handleAddReviewSubmit}
                        />
                        <Footer />
                      </Route>

                      <ProtectedRoute exact path="/profile">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <Profile 
                          onCardClick={handleCardClick}
                          onCardDelete={handleDeleteCardClick}
                          onEditProfile={handleEditProfileClick}
                          onEditAvatar={handleEditAvatarClick}
                          onAddCard={handleAddCardClick}
                          cards={myCards}
                        />
                      </ProtectedRoute>

                      <ProtectedRoute exact path="/feed">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <Cards 
                          cards={cards}
                          savedCards={savedCards}
                          onSubmit={handleSearchSubmit}
                          onClick={handleCardButtonClick}
                          onCardClick={handleCardClick}
                        />
                        <Footer />
                      </ProtectedRoute>

                      <ProtectedRoute exact path="/saved-cards">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <SavedCards 
                          savedCards={savedCards}
                          onClick={handleCardButtonClick}
                          onCardClick={handleCardClick}
                        />
                        <Footer />
                      </ProtectedRoute>

                      <ProtectedRoute exact path="/schedule">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <Schedule />
                        <Footer />
                      </ProtectedRoute>

                      <ProtectedRoute exact path="/applications">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <Applications />
                        <Footer />
                      </ProtectedRoute>

                      <ProtectedRoute exact path="/settings">
                        <Header
                          onMenuClick={handleNavigationClick}
                          onNotesClick={handleSelectMasterClick}
                        />
                        <Settings 
                          signOut={signOut}
                          onSubmit={handleUpdateUserSettings}
                        />
                      </ProtectedRoute>

                      <Route exact path="/signup">
                        {!currentUser
                          ? <Register handleRegister={handleRegister}/>
                          : <Redirect to="/movies" />
                        }
                      </Route>

                      <Route exact path="/signin">
                        {!currentUser
                          ? <Login handleLogin={handleLogin}/>
                          : <Redirect to="/movies" />
                        }
                      </Route>

                      <Route>
                        <NotFound />
                      </Route>
                    </Switch> 
                    
                    ) :
                    (<Preloader />)
                  }

                  <EditAvatarPopup
                    isOpen={isPopupAvatarOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                  />

                  <EditProfilePopup
                    isOpen={isPopupEditOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                  />

                  <AddCardPopup
                    isOpen={isPopupAddOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddCardSubmit}
                    isLoading={isLoading}
                  />

                  <ApplicatePopup
                    isOpen={isApplicatePopupOpen}
                    onClose={closeAllPopups}
                    onApplicate={handleApplicateSubmit}
                    isLoading={isLoading}
                  />

                  <SelectMasterPopup
                    isOpen={isPopupSelectOpen}
                    onClose={closeAllPopups}
                    onSelectMaster={handleSelectMaster}
                  />

                  <DeleteCardPopup
                    card={cardDelete}
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardButtonDelete}
                    isLoading={isLoading}
                  />

                  <PopupClose>
                    <ImagePopup
                      card={selectedCard}
                      isOpen={selectedCard.isOpen}
                      onClose={closeAllPopups}
                    />
                  </PopupClose>

                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    title={dataInfoTool.title}
                    icon={dataInfoTool.icon}
                  />

                  {currentUser && <Popup isOpen={isMobileNavigationOpen} onClose={closeAllPopups} onNotesClick={handleSelectMasterClick}/>}
                </div>
              </NoteMasterContext.Provider>
            </FormMessageContext.Provider>
          </StoredDataContext.Provider>
        </IsLoadingContext.Provider>
      </MasterContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
