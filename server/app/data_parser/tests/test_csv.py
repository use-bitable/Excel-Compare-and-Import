import os
import csv
from openpyxl.utils import range_boundaries


TEST_DIR = os.path.dirname(__file__)
CSV_FILE_PATH = os.path.join(TEST_DIR, "./assets/data.csv")
f = open(CSV_FILE_PATH, "r", encoding="utf-8-sig")
reader = csv.reader(f)
# for row in reader:
#     print(row)
print(range_boundaries("1:12"))