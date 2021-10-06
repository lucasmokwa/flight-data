const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");

const config = require("./dbconfig");
const TicketInfo = require("./TicketInfo");
const port = 4001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

async function getPrice(origin, dest) {
  try {
    let conn = await sql.connect(config);

    const priceQuery = await conn
      .request()
      .input("origin", sql.VarChar(20), origin)
      .input("dest", sql.VarChar(20), dest)
      .query("SELECT Transform.getTicketPrice(@origin, @dest) AS result");
    const directPriceQuery = await conn
      .request()
      .input("origin", sql.VarChar(20), origin)
      .input("dest", sql.VarChar(20), dest)
      .query("SELECT Transform.getTicketPriceDirect(@origin, @dest)AS result");

    const price = priceQuery.recordsets[0][0].result;
    const directPrice = directPriceQuery.recordsets[0][0].result;

    const ticketPrice = new TicketInfo(price, directPrice);
    return ticketPrice;
  } catch (e) {
    console.log(e);
  }
}

app.get("/getPrice", async (req, res) => {
  try {
    origin = req.query.origin;
    dest = req.query.dest;
    if (origin === undefined || dest === undefined) {
      throw err;
    }
    let data = await getPrice(origin, dest);
    res.send(data);
  } catch (e) {
    return res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log("Listening on " + port);
});
