import pyodbc
import pandas as pd

import config

conn = pyodbc.connect('Driver={SQL Server};'
                      f'Server={config.server};'
                      f'Database={config.database};'
                      f'UID={config.user};'
                      f"PWD={config.password};"
                      'Trusted_Connection=No;')

cursor = conn.cursor()


query = 'SELECT TOP 1 * FROM dbo.coupon_dev_data'
pd_dataframe = pd.read_sql_query(query, conn)

print(pd_dataframe)
