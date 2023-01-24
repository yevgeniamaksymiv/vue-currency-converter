import axiosInstance from '@/axios-config';
import Chart from 'chart.js/auto';

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

let chart;
// const ctx = document.getElementById('chart').getContext('2d');
function createChart(canvas) {
  const ctx = canvas.getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: '',
          backgroundColor: 'transparent',
          borderColor: '#0d6efd',
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: `Exchange rate's chart`,
        fontSize: 20,
        fontColor: '#fff',
        lineHeight: 1,
      },
      legend: {
        labels: {
          boxWidth: 0,
        },
      },
      tooltips: {
        intersect: false,
        callbacks: {
          label: (tooltipItem) => (+tooltipItem.value).toFixed(2),
        },
      },
    },
  });
  return chart;
}

async function getRatesInPeriod(start, end, currFrom, currTo) {
  try {
    const response = await axiosInstance.get(
      `/timeseries?start_date=${start}&end_date=${end}&base=${currFrom}&symbols=${currTo}`
    );

    if (!Object.entries(response.data.rates)) {
      console.log('no rates', response);
      // createChart(canvas);
      chart.data.labels = [];
      chart.data.datasets[0].data = [];
      chart.data.datasets[0].label = '';
      chart.options.legend.labels.boxWidth = 0;

      chart.update({
        duration: 1000,
      });
      return false;
    }

    const sortedResult = Object.entries(response.data.rates).sort(([key1], [key2]) => {
      return Date.parse(key1) - Date.parse(key2);
    });

    const dates = [];
    const values = [];
    for (const [date, value] of sortedResult) {
      dates.push(date);
      values.push(value[currTo]);
    }
    console.log('rates', dates, values);
    // createChart(canvas);
    chart.data.labels = dates;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].label = `${currFrom} to ${currTo} exchange rate`;
    chart.options.legend.labels.boxWidth = 15;

    chart.update({
      duration: 1000,
    });
    // const rates = Object.entries(response.data.rates);

  } catch (error) {
    console.error(error);
  }
}

function buildDiagram(canvas, start, end, currFrom, currTo) {
  if (start == '' || end === '' || start > end) {
    alert('Please, enter correct data');
    return false;
  }
  getRatesInPeriod(canvas, start, end, currFrom, currTo);
}

export {
  getUSDRate,
  getAllCurrencies,
  addItemToList,
  createListItem,
  createChart,
  buildDiagram,
};
