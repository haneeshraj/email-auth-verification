import axios from 'axios';

// Format u-[string](9)-[timestamp](13)-[number](4)-[country code]-[number](4)

const generateUid = async () => {
  const randomString = generateRandomString();
  const randomNumber1 = generateRandomNumber();
  const randomNumber2 = generateRandomNumber();
  const countryCode = await getCountryCode();
  const timestamp = getTimestamp();
  return `u-${randomString}${timestamp}-${randomNumber1}-${countryCode}-${randomNumber2}`;
};

const generateRandomString = () => {
  const charaters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let randomString = '';
  for (let i = 0; i < 9; i++) {
    randomString += charaters.charAt(
      Math.floor(Math.random() * charaters.length)
    );
  }
  return randomString;
};

const generateRandomNumber = () => {
  const charaters = '1234567890';
  let randomString = '';
  for (let i = 0; i < 4; i++) {
    randomString += charaters.charAt(
      Math.floor(Math.random() * charaters.length)
    );
  }
  return randomString;
};

const getCountryCode = async () => {
  try {
    const { data } = await axios.get('https://ipinfo.io/json');
    return data.country;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getTimestamp = () => {
  return new Date().getTime();
};

export { generateUid };
