const apikey = `cd98a2ae03554d54b9150ee4003a6ba3`;
let container = document.getElementById("news");

async function news() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function display(articles) {
  container.innerHTML = "";
  articles.forEach((article) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const tit =
      article.title.length > 30
        ? article.title.slice(0, 30) + "More"
        : article.title;
    title.textContent = tit;
    const des = document.createElement("p");
    const p =
      article.description.length > 100
        ? article.description.slice(0, 100) + " More"
        : article.description;
    des.textContent = p;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(des);
    container.appendChild(card);
    card.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  });
}
const searchField = document.getElementById("search");
const btn = document.getElementById("btn");
btn.addEventListener("click", async () => {
  const qq = searchField.value.trim();
  if (qq !== "") {
    try {
      const articles = await fetchnews(qq);
      display(articles);
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
async function fetchnews(qq) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${qq}&pageSize=10&apiKey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}
(async () => {
  try {
    const articles = await news();
    display(articles);
  } catch (error) {
    console.error("Error:", error);
  }
})();

(async () => {
  try {
    const articles = await news();
    if (articles && articles.length > 0) {
      display(articles);
    } else {
      console.error("No articles found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();
