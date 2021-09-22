ALTER PROCEDURE [Transform].[ProcessDataDirect]
AS
BEGIN
	SET NOCOUNT ON;

	DROP TABLE IF EXISTS Transform.ticketDataDirect
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
		Transform.ticketDataDirect
	FROM 
		dbo.market_import_data
	WHERE 
		MktFare > 10
		AND MktCoupons = 1

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
		Transform.ticketDataDirect
	GROUP BY
		Origin,
		Dest


	-- REMOVE OUTLIERS - KEEP 90% = 1.645 STD
	DROP TABLE IF EXISTS Transform.AveragePriceDirect
	SELECT 
		TD.Origin
		,TD.Dest
		,TD.Year
		,TD.Quarter
		,SUM(MktFare*Passengers)/SUM(Passengers) AS Avg
		,SUM(Passengers) AS Passengers
	INTO 
		Transform.AveragePriceDirect
	-- SELECT * 
	FROM
		Transform.ticketDataDirect TD
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


