import './css/styles.css';
import notiflix from 'notiflix';
import lodash from 'lodash';
import debounce from 'lodash/debounce';
import { fetchCountries } from './fetchcountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const body = document.querySelector('body');

body.style.backgroundColor = 'rgb(255,255,255)';

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault(e);
  const SearchForContry = e.target.value.trim();

  if (!SearchForContry) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(SearchForContry)
    .then(result => {
      if (result.length > 10) {
        notiflix.Notify.info(
          'Too many matches found. Please, enter a more specific name.'
        );
        return;
      }
      renderedCountries(result);
    })
    .catch(error => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderedCountries(result) {
  const inputLength = result.length;

  if (inputLength === 1) {
    countryList.innerHTML = '';
    countryCardReturn(result);
  }

  if (inputLength > 1) {
    countryInfo.innerHTML = '';
    countryListReturn(result);
  }
}

function countryListReturn(result) {
  let listReturn = result
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${name}" width="60" height="auto">
                         <span>${name.official}</span></li>`;
    })
    .join(' ');
  countryList.innerHTML = listReturn;
}

function countryCardReturn(result) {
  let cardReturn = result
    .map(({ name, capital, population, flags, languages }) => {
      languages = Object.values(languages).join(', ');
      return `<img src="${flags.svg}" alt="${name}" width="320" height="auto">
    <p>"${name.official}"</p>
    <p>Capital: <span> ${capital}</span></p>
    <p>Population: <span> ${population}</span></p>
    <p>Languages: <span> ${languages}</span></p>`;
    })
    .join(' ');
  countryInfo.innerHTML = cardReturn;
  return cardReturn;
}
