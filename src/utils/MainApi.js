import { checkResponse } from "./utils";
import { BASE_URL, OUTSIDE_URL } from "../config";

//////////////////register & authorize////////////////////////////////
export const register = (name, email, password) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}),
  }).then(checkResponse);


export const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
/////////////////////////////////////////////////////////////////////

//////////////////Setup User Info////////////////////////////////////
export const getUserInfo = () =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);

export const getMasters = () =>
  fetch(`${BASE_URL}/masters`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);
/////////////////////////////////////////////////////////////////////

export const getMyCards = () => 
  fetch(`${BASE_URL}/cards/my`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);

export const getAllCards = () => 
  fetch(`${BASE_URL}/cards`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);

export const getSavedCards = () => 
  fetch(`${BASE_URL}/saved`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);

//////////////////Save User Info////////////////////////////////////
export const saveUserInfo = ({ name, status }) => 
  fetch(`${BASE_URL}/users/me/bio`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: status
    }),
  }).then(checkResponse);

export const saveUserSettings = ( password, email ) => 
  fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    }),
  }).then(checkResponse);

export const editAvatar = (link) => 
  fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: `${link}`
    }),
  }).then(checkResponse);
/////////////////////////////////////////////////////////////////////
export const addCard = ({ title, link, master }) =>
  fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: title || 'Данные отсутствуют',
      link,
      master
    }),
  }).then(checkResponse);

export const deleteCard = (cardId) =>
  fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);

export const saveCard = ( cardId ) =>
  fetch(`${BASE_URL}/saved`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      card: cardId,
    }),
  }).then(checkResponse);


export const deleteSave = (movieId) =>
  fetch(`${BASE_URL}/saved/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);

export const deleteAllSave = (cardId) =>
  fetch(`${BASE_URL}/saved/all/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
  

export const getSavedMovies = () => 
  fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }).then(checkResponse);
  
/////////////////////////////////////////////////////////////////////

export const getNotes = ( master ) => 
  fetch(`${BASE_URL}/notes/${master}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);

export const createNote = ({ start_date, end_date, id, master, text }) => 
  fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start_date,
      end_date,
      id,
      master,
      text
    }),
  }).then(checkResponse);

export const updateNote = ({ start_date, end_date, id, text }) => 
  fetch(`${BASE_URL}/notes`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      start_date,
      end_date,
      id,
      text
    }),
  }).then(checkResponse);

export const deleteNote = (id) =>
  fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);


export const getApplications = ( id ) => 
  fetch(`${BASE_URL}/applications/${id}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);

export const createApplication = ({ name, description, contacts }) => 
  fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      contacts,
    }),
  }).then(checkResponse);

export const deleteApplication = (id) =>
  fetch(`${BASE_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);

export const getReviews = () => 
  fetch(`${BASE_URL}/review`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);

export const createReview = ({ description, createdAt }) => 
  fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      createdAt
    }),
  }).then(checkResponse);