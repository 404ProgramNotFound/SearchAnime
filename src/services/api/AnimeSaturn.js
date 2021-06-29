const axios = require("axios");
const cheerio = require("cheerio");

function search(nome, callback) {
  axios
    .get(`https://www.animesaturn.it/animelist?search=${nome}`)
    .then((res) => {
      var animeResult = [];
      const $ = cheerio.load(res.data);
      $(".item-archivio").each((i, el) => {
        let link = $(el).children("a").attr("href");
        let locandina = $(el)
          .children("a")
          .children(".locandina-archivio")
          .attr("src");
        let titolo = $(el)
          .children(".info-archivio")
          .children("h3")
          .text()
          .trim();
        let trama = $(el)
          .children(".info-archivio")
          .children("a")
          .children("p")
          .text()
          .trim();
        animeResult[i] = {
          key: `${i}`,
          title: titolo,
          link: link,
          locandina: locandina,
          trama: trama,
        };
      });
      animeResult = [
        { key: "left-spacer" },
        ...animeResult,
        { key: "right-spacer" },
      ];
      callback(animeResult);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getAnimeInfo(link, callback) {
  axios
    .get(link)
    .then((res) => {
      var animeInfoResult = [];
      const $ = cheerio.load(res.data);
      $(".container.shadow.rounded.bg-dark-as-box.p-3").each((i, el) => {
        if (i == 3) {
          $(el).each(function () {
            let info = $(this).text().split("\n");
            info.forEach((info) => {
              info = info.trim();

              if (info != "") {
                let temp = info.split(":");
                animeInfoResult.push({ info: temp });
              }
            });
          });
        } else if (i == 4) {
          $(el)
            .children("a")
            .each((i, el) => {
              animeInfoResult.push({ tag: $(el).text() });
            });
        } else if (i == 5) {
          animeInfoResult.push({ trama: $(el).children("div").text().trim() });
        } else if (i == 6) {
          $(el)
            .children("div")
            .children("div")
            .children("div")
            .children("div")
            .each((i, el) => {
              animeInfoResult.push({
                episode: [
                  $(el).children("a").text().trim(),
                  $(el).children("a").attr("href"),
                ],
              });
            })
            .each((i, el) => {});
        }
      });
      callback(animeInfoResult);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function episode(link, callback) {
  let anime = [];
  axios
    .get(link)
    .then((res) => {
      const $ = cheerio.load(res.data);
      anime.push($(".card-body").children("a").attr("href"));
      axios.get($(".card-body").children("a").attr("href")).then((res) => {
        const $ = cheerio.load(res.data);
        let aus = $("source").attr("src");
        if (aus != null) {
          anime.push(aus);
        } else {
          let re = /file: "[^"]*"/g;
          let results = res.data.match(re);
          let link = results[0].split('"');

          anime.push(link[1]);
        }
        callback(anime);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**/
module.exports = { search, getAnimeInfo, episode };
