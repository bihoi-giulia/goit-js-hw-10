const propreties = '?fields=name,capital,population,flags,languages';

const url = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {
  return fetch(`${url}${name}${propreties}`).then(response => {
    // if (response.status !== 404) {
    if (!response.ok) {
      throw new Error('country does not exist', { cause: response });
    }
    return response.json();
  });
};
