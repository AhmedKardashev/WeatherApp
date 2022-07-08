let isLoggin = false;
let favCities = [];

let userId = localStorage.getItem("id");

const fetchData = async (url) => {
  const res = await fetch(url); //праща get заявка на дадения адрес
  const data = await res.json(); //прави го обект

  return data;
};

const sendData = async (url, data, method) => {
  const res = await fetch(url, {
    method: method,
    body: JSON.stringify(data),
  });
  const result = res.json();
  return result;
};
const openModalLoginForm = (event) => {
  event.preventDefault();
  form.style.display = "flex";

  const signInBtn = document.getElementById("openModalBtn");

  if ((signInBtn.innerHTML = `Log out`)) {
    signInBtn.innerHTML = `Sign in`;
    document.getElementById("city1").innerHTML = "";
    document.getElementById("city2").innerHTML = "";
    document.getElementById("city3").innerHTML = "";
    favCities = [];
    isLoggin = false;
    localStorage.removeItem("favCities");
    localStorage.removeItem("id");
    const userInput = document.getElementById("search");
    userInput.value = "Sofia";
    RegisteropenModalBtn.style.display = "inline-block";

    weather();
  }
};

// FavCitiesForm
const openModalFavCitiesForm = (event) => {
  event.preventDefault();
  CitiesForm.style.display = "flex";
};

const validateFavCitiesForm = async (event) => {
  event.preventDefault();
  console.log(isLoggin);
  if (isLoggin) {
    const firstCityName = document.getElementById("favcity1").value;
    const secondCityName = document.getElementById("favcity2").value;
    const thirdCityName = document.getElementById("favcity3").value;

    if (firstCityName !== "") {
      document.getElementById("city1").innerHTML = firstCityName;
    }
    if (secondCityName !== "") {
      document.getElementById("city2").innerHTML = secondCityName;
    }
    if (thirdCityName !== "") {
      document.getElementById("city3").innerHTML = thirdCityName;
    }

    favCities.push(
      document.getElementById("city1").innerHTML,
      document.getElementById("city2").innerHTML,
      document.getElementById("city3").innerHTML
    );
    localStorage.setItem("favCities", favCities);
    console.log(favCities);

    document.getElementById("favcity1").value = "";
    document.getElementById("favcity2").value = "";
    document.getElementById("favcity3").value = "";

    const data = await sendData(
      `https://weatherapp-b4c02-default-rtdb.firebaseio.com/${userId}.json`,
      { favCities: favCities },
      "PATCH"
    );
  } else alert("Please loggin first");
};

const closeFavCitiesForm = (event) => {
  event.preventDefault();
  CitiesForm.style.display = "none";
  document.getElementById("favcity1").value = "";
  document.getElementById("favcity2").value = "";
  document.getElementById("favcity3").value = "";
};

//FavCitiesForm

//Edit City Form
const editCityesForm = async (event) => {
  event.preventDefault();
  if (isLoggin) {
    const firstCityName = document.getElementById("editfavcity1").value;
    const secondCityName = document.getElementById("editfavcity2").value;
    const thirdCityName = document.getElementById("editfavcity3").value;

    favCities.push(firstCityName, secondCityName, thirdCityName);
    console.log(favCities);
    if (
      document.getElementById("city1").innerHTML ||
      document.getElementById("city2").innerHTML ||
      document.getElementById("city3").innerHTML
    ) {
      console.log(firstCityName);
      if (document.getElementById("city1").innerHTML !== "") {
        if (firstCityName !== "") {
          document.getElementById("city1").innerHTML = firstCityName;
          document.getElementById("editfavcity1").value = "";
        }
      }
      console.log(secondCityName);
      if (document.getElementById("city2").innerHTML !== "") {
        if (secondCityName !== "") {
          document.getElementById("city2").innerHTML = secondCityName;
          document.getElementById("editfavcity2").value = "";
        }
      }
      console.log(thirdCityName);
      if (document.getElementById("city3").innerHTML !== "") {
        if (thirdCityName !== "") {
          document.getElementById("city3").innerHTML = thirdCityName;
          document.getElementById("editfavcity3").value = "";
        }
      }
      favCities.push(
        document.getElementById("city1").innerHTML,
        document.getElementById("city2").innerHTML,
        document.getElementById("city3").innerHTML
      );
      localStorage.setItem("favCities", favCities);
      const data = await sendData(
        `https://weatherapp-b4c02-default-rtdb.firebaseio.com/${userId}.json`,
        { favCities: favCities },
        "PATCH"
      );
    } else {
      alert("Add first your favorite cities, please !");
      document.getElementById("editfavcity1").value = "";
      document.getElementById("editfavcity2").value = "";
      document.getElementById("editfavcity3").value = "";

      return;
    }
  }
};

const openModalEditCitiesForm = (event) => {
  event.preventDefault();
  EditCitiesForm.style.display = "flex";
};

const editCloseFavCitiesForm = (event) => {
  event.preventDefault();
  EditCitiesForm.style.display = "none";
  document.getElementById("favcity1").value = "";
  document.getElementById("favcity2").value = "";
  document.getElementById("favcity3").value = "";
};

// Edit  City Form

const openRegisterModalLoginForm = (event) => {
  event.preventDefault();
  Registerform.style.display = "flex";
};

const closeModalLoginForm = (event) => {
  event.preventDefault();
  form.style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("psw").value = "";
};

const validateForm = (event) => {
  event.preventDefault();
  let formUserName = document.getElementById("name").value;
  const formUserPass = document.getElementById("psw").value;

  if (!formUserName.includes("@")) {
    alert("Enter valid email");
    return;
  } else if (formUserPass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  alert(`Welcome ${formUserName}`);
  isLoggin = true;
};
//
// onMouseEVent
const onMouseFirstCityHandler = (event) => {
  event.preventDefault();

  document.getElementById("search").value =
    document.getElementById("city1").innerHTML;
  weather();
};

const onMouseSecondCityHandler = (event) => {
  event.preventDefault();

  document.getElementById("search").value =
    document.getElementById("city2").innerHTML;
  weather();
};

const onMouseThirdCityHandler = (event) => {
  event.preventDefault();

  document.getElementById("search").value =
    document.getElementById("city3").innerHTML;
  weather();
};
// onMouseEVent
const closeModalRegisterForm = (event) => {
  event.preventDefault();

  Registerform.style.display = "none";

  document.getElementById("Registername").value = "";

  document.getElementById("Registerpsw").value = "";

  document.getElementById("Registerpswconfirm").value = "";
};

const validateRegisterForm = async (event) => {
  event.preventDefault();
  const formRegisterUserName = document.getElementById("Registername").value;
  const formRegisterUserPass = document.getElementById("Registerpsw").value;
  const formRegisterUserConfirmPass =
    document.getElementById("Registerpswconfirm").value;

  if (!formRegisterUserName.includes("@")) {
    alert("Enter valid email");
    return;
  } else if (formRegisterUserPass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (formRegisterUserPass !== formRegisterUserConfirmPass) {
    alert("Passwords does not match");
    return;
  }

  try {
    const data = await sendData(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRi_k0UU2IUOQHv1-WoLr6AYt3ty_3PBE",
      {
        email: formRegisterUserName,
        password: formRegisterUserPass,
        returnSecureToken: true,
      },
      "POST"
    );
    if (data.email === document.getElementById("Registername").value) {
      alert("Successfully registered !!!");
      document.getElementById("Registername").value = "";
      document.getElementById("Registerpsw").value = "";
      document.getElementById("Registerpswconfirm").value = "";
    } else if (data.error.errors[0].message === "EMAIL_EXISTS") {
      alert("Account exists, please enter a new account");
      document.getElementById("Registername").value = "";
      document.getElementById("Registerpsw").value = "";
      document.getElementById("Registerpswconfirm").value = "";
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
//

const ModalLoginFormBtn = async (event) => {
  event.preventDefault();
  form.style.display = "none";
  //

  //
  let formUserName = document.getElementById("name").value;
  let formUserPass = document.getElementById("psw").value;

  console.log(formUserName, formUserPass);
  try {
    const data = await sendData(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRi_k0UU2IUOQHv1-WoLr6AYt3ty_3PBE",
      {
        email: formUserName,
        password: formUserPass,
        returnSecureToken: true,
      },
      "POST"
    );
    console.log(data);
    if (data.email === document.getElementById("name").value) {
      validateForm(event);
      document.getElementById("name").value = "";
      document.getElementById("psw").value = "";
      userId = data.localId;
      localStorage.setItem("id", data.localId);
    } else if (data.error.errors[0].message === "EMAIL_NOT_FOUND") {
      alert("Account dont  exists, please  create an account");
      document.getElementById("name").value = "";
      document.getElementById("psw").value = "";
      return;
    }
    if (!isLoggin) {
      alert("Incorrect password");
      return;
    }
  } catch (error) {
    console.log(error);
  }

  users.push({
    userName: formUserName,
    userPsw: formUserPass,
  });
  if (isLoggin) {
    const signInBtn = (document.getElementById(
      "openModalBtn"
    ).innerHTML = `Log out`);

    RegisteropenModalBtn.style.display = "none";
  }

  console.log(users);
  console.log(isLoggin);

  //fetch  cities
  const fetchCities = await fetchData(
    `https://weatherapp-b4c02-default-rtdb.firebaseio.com/${userId}/favCities.json`
  );
  console.log(fetchCities);
  const last3Cities = fetchCities.slice(-3);
  console.log(last3Cities);
  favCities;
  document.getElementById("city1").innerHTML = last3Cities[0];
  document.getElementById("city2").innerHTML = last3Cities[1];
  document.getElementById("city3").innerHTML = last3Cities[2];

  localStorage.setItem("favCities", last3Cities);

  formUserName = document.getElementById("name").value = "";
  formUserPass = document.getElementById("psw").value = "";
};

let users = [];

async function weather() {
  const initalId = localStorage.getItem("id");
  const favCitieslocalStorage = localStorage.getItem("favCities");
  let newFavCitiesLocalStorage;
  let newFavCities;

  if (initalId !== null) {
    isLoggin = true;
  }

  if (favCitieslocalStorage !== null) {
    newFavCitiesLocalStorage = favCitieslocalStorage.split(",");
    newFavCities = newFavCitiesLocalStorage.slice(-3);
    console.log(newFavCities);
    document.getElementById("city1").innerHTML = newFavCities[0];
    document.getElementById("city2").innerHTML = newFavCities[1];
    document.getElementById("city3").innerHTML = newFavCities[2];
  }

  if (isLoggin) {
    const signInBtn = (document.getElementById(
      "openModalBtn"
    ).innerHTML = `Log out`);
    RegisteropenModalBtn.style.display = "none";
  }
  console.log(favCities);
  const form = document.getElementById("form");
  //
  const openModalBtn = document.getElementById("openModalBtn");
  openModalBtn.addEventListener("click", openModalLoginForm);

  const openRegisterModalBtn = document.getElementById("RegisteropenModalBtn");
  openRegisterModalBtn.addEventListener("click", openRegisterModalLoginForm);

  const closeModalBtn = document.getElementById("closeBtn");
  closeModalBtn.addEventListener("click", closeModalLoginForm);

  const loginBtn = document.getElementById("return");
  loginBtn.addEventListener("click", ModalLoginFormBtn);

  const apiKey = "00db522083214b5e7320d3f08f119798";
  let userInput = document.getElementById("search").value;
  console.log(userInput);
  if (!userInput) {
    userInput = "Sofia";
  }
  const cityData = await fetchData(
    `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${apiKey}`
  );

  console.log(cityData);
  console.log(cityData[0].name);

  const lat = cityData[0].lat;
  const lon = cityData[0].lon;

  const weatherData = await fetchData(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`
  );

  console.log(weatherData);
  const currentTemp = document.getElementById("h2");
  currentTemp.innerHTML = `${weatherData.current.temp.toFixed(0)} °C`;

  const tuesDay = document.getElementById("tuesday");
  tuesDay.innerHTML = `${weatherData.daily[1].temp.day.toFixed(0)} °C`;

  const wednesDay = document.getElementById("wednesday");
  wednesDay.innerHTML = `${weatherData.daily[2].temp.day.toFixed(0)} °C`;

  const tuersDay = document.getElementById("tuersday");
  tuersDay.innerHTML = `${weatherData.daily[3].temp.day.toFixed(0)} °C`;

  const friDay = document.getElementById("friday");
  friDay.innerHTML = ` ${weatherData.daily[4].temp.day.toFixed(0)} °C `;

  const saturDay = document.getElementById("saturday");
  saturDay.innerHTML = `${weatherData.daily[5].temp.day.toFixed(0)} °C`;

  const sunDay = document.getElementById("sunday");
  sunDay.innerHTML = `${weatherData.daily[6].temp.day.toFixed(0)} °C`;

  let getDate = new Date();
  let dayOfWeekNumber = getDate.getDay();
  let nameOfDay;

  switch (dayOfWeekNumber) {
    case 0:
      nameOfDay = "Sunday";

      break;
    case 1:
      nameOfDay = "Monday";

      break;
    case 2:
      nameOfDay = "Tuesday";

      break;
    case 3:
      nameOfDay = "Wednesday";

      break;
    case 4:
      nameOfDay = "Thursday";
      break;
    case 5:
      nameOfDay = "Friday";
      break;
    case 6:
      nameOfDay = "Saturday";
      break;
  }
  let weekday0 = document.getElementById("day0");
  weekday0.innerHTML = `Sunday`;

  let weekday1 = document.getElementById("day1");
  weekday1.innerHTML = `Monday`;

  let weekday2 = document.getElementById("day2");
  weekday2.innerHTML = `Tuesday`;

  let weekday3 = document.getElementById("day3");
  weekday3.innerHTML = `Wednesday`;

  let weekday4 = document.getElementById("day4");
  weekday4.innerHTML = `Thursday`;

  let weekday5 = document.getElementById("day5");
  weekday5.innerHTML = `Friday`;

  let weekday6 = document.getElementById("day6");
  weekday6.innerHTML = `Saturday`;

  const today = document.getElementById(`day` + dayOfWeekNumber);
  today.innerHTML = "Today";

  const caption = document.getElementById("caption");
  caption.innerHTML = weatherData.current.weather[0].description; //слагаме му текст,който взимаме от response

  const timeZone = document.getElementById("timeZone"); //взимаме h1
  timeZone.innerHTML = cityData[0].local_names.en; //задаваме му timezone ,езика на който искаме да бъде от response

  const iconId = weatherData.current.weather[0].icon;
  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${iconId}.png`
  );
  weatherIcon.setAttribute("alt", `weater Icon`);
  caption.appendChild(weatherIcon); // Поставяме иконата
}

const changeHanler = (value) => {
  const userInput = document.getElementById("search");
  userInput.value = value;

  weather();
};
window.onload = weather;
