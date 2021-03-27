import {getNumWithWordDeclension} from './util.js';
import {REALTY_PROPERTIES} from './constants.js';

const ROOMS_DECLENSION_ARRAY = [
  'комната',
  'комнаты',
  'комнат',
];
const GUESTS_DECLENSION_ARRAY = [
  'гостя',
  'гостей',
  'гостей',
];

// генерация разметки объявления
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const generatePopupFragment = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos},
}) => {
  const popupContent = popupTemplate.cloneNode(true);

  popupContent.querySelector('.popup__avatar').src = avatar;
  popupContent.querySelector('.popup__title').textContent = title;
  popupContent.querySelector('.popup__text--address').textContent = address;
  popupContent.querySelector('.popup__type').textContent = REALTY_PROPERTIES[type]['realtyType'];
  popupContent.querySelector('.popup__text--capacity').textContent = `${getNumWithWordDeclension(rooms, ROOMS_DECLENSION_ARRAY)} для ${getNumWithWordDeclension(guests, GUESTS_DECLENSION_ARRAY)}`;
  popupContent.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  popupContent.querySelector('.popup__description').textContent = description;

  const priceText = popupContent.querySelector('.popup__text--price');
  const priceCurrencyBlock = priceText.querySelector('span');
  priceText.textContent = price + ' ';
  priceText.appendChild(priceCurrencyBlock);

  const featuresList = popupContent.querySelector('.popup__features');
  if (features.length) {
    const featuresFragment = document.createDocumentFragment();
    features.forEach((item) => {
      const featureItem = popupTemplate.querySelector('.popup__feature').cloneNode(true);
      featureItem.className = `${featureItem.classList[0]} ${featureItem.classList[0]}--${item}`;
      featuresFragment.appendChild(featureItem);
    });
    featuresList.innerHTML = '';
    featuresList.appendChild(featuresFragment);
  } else {
    featuresList.remove();
  }

  const photosList = popupContent.querySelector('.popup__photos');
  if (photos.length) {
    const photosFragment = document.createDocumentFragment();
    photos.forEach((item) => {
      const photoItem = popupTemplate.querySelector('.popup__photo').cloneNode(true);
      photoItem.src = item;
      photosFragment.appendChild(photoItem);
    });
    photosList.innerHTML = '';
    photosList.appendChild(photosFragment);
  } else {
    photosList.remove();
  }

  return document.createDocumentFragment().appendChild(popupContent);
}

export {generatePopupFragment};
