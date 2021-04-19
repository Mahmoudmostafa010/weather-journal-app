/* Global Variables */

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=255c148d718822b1a4a90810e5df1a7a';

//Get the date
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const submit =document.getElementById('generate');
submit.addEventListener('click', (e)=> {
  e.preventDefault();
  // get user input values
  const zipCod = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getAppData(baseURL, zipCod, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newDate, temp: userData.main.temp, content });
    }).then(function (newData) {
      // call updateUI to update browser content
      updateData();
    });
});

//Function to GET weather API Data
const getAppData = async (baseURL, zipCod, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + zipCod + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

//Function to POST data 
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

//function to updat app data
const updateData = async () => {
  const request = await fetch('/all');
  try {
    const sendData = await request.json()
    // update new entry values
    document.getElementById('date').innerHTML = sendData.date;
    document.getElementById('temp').innerHTML = sendData.temp;
    document.getElementById('content').innerHTML = sendData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};
