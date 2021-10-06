ALTER PROCEDURE [Transform].[ProcessData]
AS

BEGIN
	SET NOCOUNT ON;

	DROP TABLE IF EXISTS #TICKET_DATA
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
		#TICKET_DATA
	-- SELECT * 
	FROM 
		Extract.RawData


	-- AGGREGATE NUM OF PASSENGERS
	DROP TABLE IF EXISTS #TICKET_AVERAGE 
	SELECT 
		Origin
		,Dest
		,Year
		,Quarter
		,ISNULL(STDEV(MktFare),0)  AS StdDev
		,AVG(MktFare) AS AveragePrice
		,SUM(Passengers) AS Passengers
	INTO 
		#TICKET_AVERAGE
	FROM
		#TICKET_DATA
	GROUP BY
		Origin,
		Dest,
		Year,
		Quarter

	-- GET MEDIAN OF TICKET FARE AND CREATE TABLE THAT WILL BE EXPORTED TO PROD SERVER
	DROP TABLE IF EXISTS Transform.Export
	SELECT  DISTINCT
        TD.Origin
		,TD.Dest
		,TD.Year
		,TD.Quarter
        ,PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY MktFare) OVER
		(PARTITION BY         TD.Origin
							,TD.Dest
							,TD.Year
							,TD.Quarter) AS Avg
		,A.Passengers
	INTO
		Transform.Export
	FROM    
		#TICKET_DATA TD
		INNER JOIN #TICKET_AVERAGE A
			ON A.Dest = TD.Dest
			AND A.Origin = TD.Origin

END
