from .core import DataParser
from .xlsx import XLSXParser
from .xls import XLSParser
from .csv import CSVParser


dataParser = DataParser(
    plugins=[XLSXParser(), XLSParser(), CSVParser()],
)
