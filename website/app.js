/* Global Variables */
const apiKey = "e30f7bd3a4bfabbdfd441f68809374bf&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const zipCode = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const generateBtn = document.querySelector("#generate");
const error = document.querySelector(".error");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/**
 * Main ASYNC functions
 */

/**
 * @description  Function to GET data from OpenWeatherMap API
 */
const fetchWeatherData = async (zipCodeValue) => {
  try {
    const response = await fetch(`${baseUrl}${zipCodeValue}&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (err) {
    customError(err.message);
  }
};

/**
 * @function to POST data to specifc url/route
 * @param {string} url - The url/route to POST to
 * @param {object} data - data to be posted
 * @returns {json} a JSON object with posted data
 */
const postData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const ourData = await response.json();
    return ourData;
  } catch (err) {
    customError(err.message);
  }
};

/**
 * @function  to update the UI after receiving the required data
 */
const updateTheUI = async () => {
  try {
    const req = await fetch("http://localhost:8000/all");
    const respond = await req.json();
    document.querySelector("#temp").innerHTML = `${Math.round(
      respond?.temp
    )} degrees`;
    document.querySelector("#date").innerHTML = respond?.date;
    document.querySelector("#content").innerHTML = respond?.userResponse;
  } catch (err) {
    customError(err.message);
  }
};

/**
 * @function to chain every promise/fetch then update the UI with resulted data
 */
const getProjectDataAndUpdateUI = () => {
  const zipCodeValue = zipCode.value;
  const feelingsValue = feelings.value;
  if (zipCodeValue) {
    fetchWeatherData(zipCodeValue)
      .then((data) => {
        postData("/addEntry", {
          temp: data?.main.temp,
          date: newDate,
          userResponse: feelingsValue,
        });
      })
      .then(updateTheUI())
      .catch((err) => {
        customError(err.message);
      });
  } else {
    customError("Please enter a value");
  }
};

/**
 * @function Create custom error element
 * @param {string} text - Text to be appended to the element
 */
function customError(text) {
  error.textContent = text;
  error.classList.add("show");
  setTimeout(() => {
    error.classList.remove("show");
  }, 3000);
}

/**
 * Event listeners
 */

generateBtn.addEventListener("click", getProjectDataAndUpdateUI);
