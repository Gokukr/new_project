import pandas as pd

# Load the dataset
df = pd.read_csv("data.csv")  # Replace with actual file path

# Convert column names to uppercase
df.columns = df.columns.str.upper()

# Strip whitespace and convert values to uppercase
df["TABLENAME"] = df["TABLENAME"].str.upper()
df["SSMS_TABLE_NAMES"] = df["SSMS_TABLE_NAMES"].str.upper()

# Get distinct values from both columns
unique_tablename = df["TABLENAME"].drop_duplicates()
unique_ssms_table_names = df["SSMS_TABLE_NAMES"].drop_duplicates()
# print(len(df["TABLENAME"]))
print(len(df["SSMS_TABLE_NAMES"]))
print(len(unique_ssms_table_names))

# Find values in SSMS_TABLE_NAMES that are NOT in TABLENAME
missing_values = unique_ssms_table_names[~unique_ssms_table_names.isin(unique_tablename)]

# Display the missing values
for i in missing_values:
    print(i)
