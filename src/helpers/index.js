import axiosInstance from '@/axios-config';

function appendOptionsToSelectTag(arr2d, tag) {
  return arr2d.forEach((arr) => {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(arr[0]));
    option.value = arr[1];
    tag.appendChild(option);
  });
}

async function getUSDRate(parentTag) {
  try {
    const response = await axiosInstance.get('/latest', {
      params: {
        base: 'USD',
        symbols: 'UAH,EUR,GBP',
        places: 4,
      },
    });
    const rates = Object.entries(response.data.rates);
    appendOptionsToSelectTag(rates, parentTag);
  } catch (error) {
    console.error(error);
  }
}

async function getAllCurrencies(parentTag, historyDate = null) {
  if (historyDate !== null) {
    try {
      const response = await axiosInstance.get(`/${historyDate}`);
      const rates = Object.entries(response.data.rates);

      appendOptionsToSelectTag(rates, parentTag);
    } catch (error) {
      console.error(error);
    }
  }
  
  try {
    const response = await axiosInstance.get('/latest');
    const rates = Object.entries(response.data.rates);

    appendOptionsToSelectTag(rates, parentTag);
  } catch (error) {
    console.error(error);
  }
}

export { 
  getUSDRate, 
  getAllCurrencies 
}
