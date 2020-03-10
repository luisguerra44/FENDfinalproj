/* Global Variables */
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = '&appid=426e2854445b1013aed7407f5e9b641d';


// Create a new date instance dynamically with JS
let d = new Date();
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let m = month[d.getMonth()];
let newDate = d.getDate() + '/' + m + '/' + d.getFullYear();
console.log(newDate);


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  const newZip = document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;

  // get user input values
  getWeather(baseURL, newZip, apiKey)
    .then(function (data) {
      // add data to POST request
      return postData('/add', { date: newDate, temp: data.main.temp, content:feeling })
    })
    .then(function(){
      // call updateUI to update browser content
      return updateUI()
      })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, newZip, apiKey) => {
  // res equals to the result of fetch function
  const respond = await fetch(baseURL + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const data = await respond.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */

const postData = async (url = '/add', data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

/*Function to update UI*/
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const dataToUse = await request.json()
    // update new entry values
    document.getElementById('date').innerHTML = 'the date today is: ' + dataToUse.date;
    document.getElementById('temp').innerHTML = 'the temperature in your city is: ' + dataToUse.temp;
    document.getElementById('content').innerHTML = 'your mood today is: ' + dataToUse.content;
  }
  catch (error) {
    console.log("error", error);
  }
};

export default performAction
