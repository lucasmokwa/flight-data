CREATE FUNCTION [Transform].[getTicketPriceDirect]
(
	
	@Origin VARCHAR(50)
	,@Dest VARCHAR(50)
)
	RETURNS int
	AS
	BEGIN

	DECLARE @res int;
	

	SELECT 
		@res = Round(SUM(Avg),2) 
	FROM
		Transform.AveragePriceDirect
	WHERE 
		(Origin = @Origin and dest = @Dest)
		OR (Origin = @Dest and dest = @Origin)


	RETURN @res;

END
GO
