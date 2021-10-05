const sql = require("mssql");

const config = require("./dbconfig");
const TicketInfo = require("./ticketInfo.js");

const getPrice = async (origin, dest) => {
  try {
    let conn = await sql.connect(config);

    const priceQuery = await conn
      .request()
      .input("origin", sql.VarChar(20), origin)
      .input("dest", sql.VarChar(20), dest)
      .query("SELECT Transform.getTicketPrice(@origin, @dest) AS result");

    const price = priceQuery.recordsets[0][0].result;

    const ticketPrice = new TicketInfo(price);
    return ticketPrice;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getPrice;
