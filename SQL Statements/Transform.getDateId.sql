CREATE FUNCTION [Transform].[getDateId]
(
	
	@Year int
	,@Quarter int
)
RETURNS int
AS
BEGIN

	
	-- Return the result of the function
	RETURN (@Quarter + @Year*4) -7920

END
GO