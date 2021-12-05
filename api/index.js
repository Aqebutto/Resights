import sales from "./sales.js";

export default async function (req, res, next) {
  // adding response header
  res.setHeader("Content-Type", "application/json");

  // adds stringified data at `/api/sales` endpoint
  if (req._parsedOriginalUrl.pathname === "/api/sales") {
    let query = req._parsedOriginalUrl.query;

    if (query) {
      // getting query object
      let query = getQueryObject(req._parsedOriginalUrl.query.split("&"));

      // getting searched / filtered array
      let searchedData = searchData(sales.results, query.search);

      // setting the total value for the json response
      query.total = searchedData.length;

      // slicing data
      // improvement - should be queried from the DB
      let parsedData = searchedData.slice(
        (query.page - 1) * query.per_page,
        (query.page - 1) * query.per_page + query.per_page
      );

      // returning the JSON
      res.end(JSON.stringify({ query: query, data: parsedData }));
    } else {
      // returning the entire data base
      res.end(JSON.stringify({ query: query, data: sales.results }));
    }
  } else {
    // all other routes will return empty obj
    res.end(JSON.stringify({}));
  }
  next();
}

// improvement tip - move to backend
function searchData(data, search) {
  let filteredArray = data.filter((ele) => {
    let flg = false;
    Object.values(ele).forEach((item) => {
      // if occurance found, then `flg` = `true`, then stop search
      if (!flg) {
        if (typeof item === "object") {
          Object.values(item).forEach((objItem) => {
            flg =
              flg ||
              objItem.toString().toLowerCase().includes(search.toLowerCase());
          });
        } else {
          flg = item.toString().toLowerCase().includes(search.toLowerCase());
        }
      }
    });
    return flg;
  });
  return filteredArray;
}

//getting query object
function getQueryObject(queryArray) {
  let queryObj = {};
  queryArray.forEach((ele) => {
    let sa = ele.split("="); // sa = array that has been split
    queryObj[sa[0]] = sa[0] === "search" ? sa[1] : parseInt(sa[1]);
  });
  return queryObj;
}
