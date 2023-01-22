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
  } else {
    try {
      const response = await axiosInstance.get('/latest');
      const rates = Object.entries(response.data.rates);

      appendOptionsToSelectTag(rates, parentTag);
    } catch (error) {
      console.error(error);
    }
  }
}

function createListItem(id, list) {
  const li = document.createElement('li');
  li.id = id;
  li.innerHTML = localStorage.getItem(id);

  const btnDeleteItem = document.createElement('button');
  btnDeleteItem.className = 'btn-delete-item';
  btnDeleteItem.id = li.id;

  const icon = document.createElement('span');
  icon.className = 'material-icons';
  icon.classList.add('icon-delete');
  icon.appendChild(document.createTextNode('cancel'));
  btnDeleteItem.appendChild(icon);
  li.appendChild(btnDeleteItem);
  list.appendChild(li);

  btnDeleteItem.onclick = () => {
    li.innerHTML = '';
    localStorage.removeItem(`${id}`);
  };
}

function addItemToList(list, date, amount, currency1, currency2, result) {
  const uniqueId = Math.random().toString(16).slice(2);
  const liContent = `<small>${date}:</small> ${amount} ${currency1} = ${result} ${currency2}`;
  localStorage.setItem(`${uniqueId}`, `${liContent}`);
  createListItem(uniqueId, list);
}

export { getUSDRate, getAllCurrencies, addItemToList, createListItem };
