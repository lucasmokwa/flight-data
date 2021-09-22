ALTER PROCEDURE Transform.ProcessData
AS
BEGIN
	SET NOCOUNT ON;

	DROP TABLE IF EXISTS Transform.ticketData
	SELECT 
		Origin
		,Dest
		,OriginCityMarketID
		,DestCityMarketID
		,Passengers
		,MktFare
		,Year
		,Quarter
	INTO
		Transform.ticketData
	FROM 
		dbo.market_import_data
	WHERE 
		MktFare > 10

	--SELECT * FROM Transform.ticketData
	DROP TABLE IF EXISTS #TICKET_AVERAGE 
	SELECT 
		Origin
		,Dest
		,ISNULL(STDEV(MktFare),0)  AS StdDev
		,AVG(MktFare) AS AveragePrice
	INTO 
		#TICKET_AVERAGE
	FROM
		Transform.ticketData
	GROUP BY
		Origin,
		Dest,
		Year,
		Quarter

	-- REMOVE OUTLIERS - KEEP 90% = 1.645 STD
	DROP TABLE IF EXISTS Transform.AveragePrice
	SELECT 
		TD.Origin
		,TD.Dest
		,TD.Year
		,TD.Quarter
		,SUM(MktFare*Passengers)/SUM(Passengers) AS AveragePrice
	INTO 
		Transform.AveragePrice
	-- SELECT *
	FROM
		Transform.ticketData TD
		INNER JOIN #TICKET_AVERAGE A
			ON A.Dest = TD.Dest
			AND A.Origin = TD.Origin
		WHERE 
			MktFare > AveragePrice - 1.645 * StdDev 
			AND MktFare < AveragePrice + 1.645 * StdDev 
	GROUP BY
		TD.Origin,
		TD.Dest,
		TD.Year,
		TD.Quarter

		
END
GO
