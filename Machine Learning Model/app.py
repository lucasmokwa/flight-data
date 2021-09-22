import pyodbc
import pandas as pd

import config


conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}',
                      server=config.server,
                      database=config.database,
                      user=config.user,
                      password=config.password,
                      trusted_connection='no')

cursor = conn.cursor()


query = 'SELECT TOP 1 * FROM dbo.coupon_dev_data'
pd_dataframe = pd.read_sql_query(query, conn)

print(pd_dataframe)
