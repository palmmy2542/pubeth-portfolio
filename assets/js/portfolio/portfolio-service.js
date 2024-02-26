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
    href="/portfolio-details/index.html?id=${port.id}"
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

function getPrefixUrl(url) {
  const lastIndexOfUnderscore = url.lastIndexOf("_");
  const imageOrderWithType = url.substring(lastIndexOfUnderscore + 1);
  const lastIndexOfDot = imageOrderWithType.lastIndexOf(".");
  const imageType = imageOrderWithType.substring(lastIndexOfDot + 1);
  const prefix = url.substring(0, lastIndexOfUnderscore + 1);
  return { prefix, type: imageType };
}

function renderPortfolioById({ id = "", portfolio = [] }) {
  let htmlContent = "";
  const lang = getCurrentLang();

  portfolio
    .filter((port) => port.id === id)
    .forEach((port) => {
      const sub_title = port[`[${lang}]sub_title`] || "";
      const description = port[`[${lang}]description`] || "";
      const max_image_number = port.image_showcase_max_number || 0;
      const { prefix, type } = getPrefixUrl(port.cover_image);
      const all_images = Array.from(
        { length: max_image_number },
        (_, i) => i
      ).map((i) => prefix + `0${i + 1}.${type}`);
      htmlContent += `
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="portfolio-details">
            <div class="inner">
              <h2>${port.title}</h2>
              <p class="subtitle">
                ${sub_title}
              </p>
              <p>
                ${description}
              </p>
              <div class="portfolio-view-list d-flex flex-wrap">
                <div class="port-view">
                  <span>Project Types</span>
                  <h4>${CATEGORY[port.type]}</h4>
                </div>
              </div>
            </div>
            <div class="portfolio-thumb-inner text-center">
            ${all_images
              .map((url) => {
                return `<div class="thumb mb--30">
                    <img
                      src="${url}"
                      alt="Portfolio-images"
                    />
                </div>`;
              })
              .join("")}
            </div>
          </div>
        </div>
      </div>
    </div>`;
    });

  // Append the HTML content to the data container
  document.getElementsByClassName("rn-portfolio-details").item(0).innerHTML +=
    htmlContent;
}

function renderRandomPortfolio({ portfolio = [] }) {
  let htmlContent = "";

  Array.from({ length: 2 }, (_, i) => i).forEach((_) => {
    const port = portfolio[Math.floor(Math.random() * portfolio.length)];
    htmlContent += ` <div class="col-lg-6 col-md-6 col-12">
    <div class="related-work text-center mt--30">
      <div class="thumb">
        <a href="/portfolio-details/index.html?id=${port.id}">
          <img
            src="${port.cover_image}"
            alt="Portfolio-images"
          />
        </a>
      </div>
      <div class="inner">
        <h4>
          <a href="/portfolio-details/index.html?id=${port.id}">${
      port.title
    }</a>
        </h4>
        <span class="category">${CATEGORY[port.type]}</span>
      </div>
    </div>
  </div>`;
  });

  // Append the HTML content to the data container
  document.getElementById("portfolio-related-work").innerHTML += htmlContent;
}
