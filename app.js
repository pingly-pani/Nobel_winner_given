const buttons = document.querySelectorAll("#category input");
const yearInput = document.getElementById("yearInput");
const search = document.getElementById("searchForm");
const displayResult = document.getElementById("displayResult");

const cat = document.getElementById("cat");

let category = ""; //cuz forEach can't return a value so I using assign valur method then

//get category value by click
const buttonValue = buttons.forEach((button) => {
  button.addEventListener("click", () => {
    category = button.value;
    cat.textContent = category;
  });
});

//get yearTo and submit to getnobelwinner
search.addEventListener("submit", (e) => {
  e.preventDefault();
  const yearTo = yearInput.value;
  getNobelWinner(category, yearTo);
});

//fetch and custom parameter then sent to getWinnerDetail
async function getNobelWinner(category, yearTo) {
  const config = {
    params: {
      nobelPrizeCategory: category,
      nobelPrizeYear: yearTo,
    },
  };
  const res = await axios.get(
    "https://api.nobelprize.org/2.1/laureates",
    config
  );
  getWinnerDetail(res.data.laureates);
}

const link = document.getElementById("link");
const title = document.getElementById("title");
const motivate = document.getElementById("motivate");
//display result
async function getWinnerDetail(data) {
  for (let item of data)  {   title.textContent = `Name: ${item.fullName.en}`;
    title.style.color = "black";
    link.href = item.nobelPrizes[0].links[1].href;
    link.textContent = "More info";
    motivate.textContent = `"${item.nobelPrizes[0].motivation.en}"`;
  }
}
