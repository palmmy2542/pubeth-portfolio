async function getPortfolio() {
  const { data } = await $.getJSON(
    "/assets/db/portfolio/portfolio.json",
    ({ data = [] }) => data
  );
  return data;
}

function getProductsByCate({ products = [], categories = [] }) {
  if (categories.length === 0) {
    return products;
  }
  return (
    products.filter(({ category }) => categories.includes(category)) || products
  );
}

const CATEGORY = {
  WEBSITE: "Web Development",
  MOBILE_APPLICATION: "App Development",
};

function getCurrentLang() {
  const lang = localStorage.getItem("lang") || "en";
  return lang;
}

function renderPortfolio({ portfolio = [] }) {
  let htmlContent = "";
  const lang = getCurrentLang();

  portfolio.forEach((port) => {
    const sub_title = port[`[${lang}]sub_title`] || "";
    htmlContent += `<a
    class="item-portfolio-static gallery masonry_item portfolio-33-33 cat--3"
    href="/portfolio-details/${port.id}"
  >
    <div class="portfolio-static">
      <div class="thumbnail-inner">
        <div class="thumbnail">
          <img src="${port.cover_image}" alt="${port.sub_title}"/>
        </div>
      </div>
      <div class="content">
        <div class="inner">
          <p>${CATEGORY[port.type]}</p>
          <h4>${port.title}</h4>
          <p class="line-clamp--3">${sub_title}</p>
        </div>
      </div>
    </div>
  </a>`;
  });
  // Append the HTML content to the data container
  document.getElementsByClassName("portfolio-showcase").item(0).innerHTML +=
    htmlContent;
}
