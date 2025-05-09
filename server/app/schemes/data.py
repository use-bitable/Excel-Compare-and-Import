from __future__ import annotations
from typing import Literal, Optional
from pydantic import BaseModel, Field


class DataRangeModel(BaseModel):
    """Data range"""

    min_row: int = Field(default=1, description="Min row", gt=1)
    """Min row"""
    max_row: Optional[int] = Field(default=None, description="Max row", gt=1)
    """Max row"""
    min_col: int = Field(default=1, description="Min column", gt=1)
    """Min column"""
    max_col: Optional[int] = Field(default=None, description="Max column", gt=1)
    """Max column"""


class DataSourceModel[T](BaseModel):
    type: T = Field(description="The type of the data source.")
    source_type: Literal["file", "network"]


class CSVParserConfigModel(BaseModel):
    """CSV data parser config model."""

    data_range: Optional[str | DataRangeModel] = Field(
        default=None,
        description="Data range",
        examples=[
            "A1:B2",
            "1:20",
            "A:C",
            {"min_row": 1, "max_row": 20, "min_col": 1, "max_col": 3},
        ],
    )
    header: Optional[int] = Field(
        default=1,
        description="Header row index, start from 1\n\nDefault: 1",
    )


class CSVDataSourceModel(DataSourceModel[Literal[".csv"]]):
    """CSV data source model."""

    token: str = Field(description="File token for the CSV file")
    source_type: Literal["file"] = Field(
        default="file",
        description="Source type, default is file",
    )


class XLSParserConfigModel(CSVParserConfigModel):
    """XLS data parser config."""

    sheet_name: Optional[str] = Field(
        default=None, description="Sheet name, if set None, will parse the first sheet"
    )


class XLSDataSourceModel(DataSourceModel[Literal[".xls"]]):
    """XLS data source model."""

    token: str = Field(description="XLS file token")
    source_type: Literal["file"] = Field(default="file", description="Data source type")


class XLSXDataParserConfigModel(XLSParserConfigModel):
    """XLSX data parser config."""

    performance_mode: Optional[bool] = Field(
        default=False,
        description="If performance mode open. If false, the images and hyperlinks will not be parsed",
    )
    """Performance mode

    Default: False
    """


class XLSXDataSourceModel(DataSourceModel[Literal[".xlsx", ".xlsm", ".xltx", ".xltm"]]):
    """XLSX data source model."""

    token: str = Field(description="File token for the file")
    source_type: Literal["file"] = Field(default="file", description="Data source type")


class PaginationConfigModel[C: dict](BaseModel):
    """Pagination config model."""

    page_size: Optional[int] = Field(
        default=None,
        description="Page size, default is None",
        gt=0,
    )
    page_token: Optional[int] = Field(
        default=0,
        description="Page token, default is 0",
        ge=0,
    )
    config: Optional[C] = Field(
        default=None,
        description="Config",
    )


class DataPreviewRequestBodyModel[C: dict, D: DataSourceModel](BaseModel):
    config: PaginationConfigModel[C] = Field(
        description="The configuration for the data preview request."
    )
    data_source: D


class DataMetaModel[E: dict](BaseModel):
    fields: list[str] = Field(description="Fields")
    total: int = Field(description="Total count")
    can_parse: bool = Field(description="Can parse")
    errors: list[str] = Field(description="Errors")
    extra: E = Field(description="Extra")


class UrlValue(BaseModel):
    """URL value"""

    url: str
    """URL"""
    text: str
    """Text"""
    type: Literal["url"]


class FileValue(BaseModel):
    """File value"""

    name: str
    """File name"""
    type: Literal["file"]
    size: int
    """File size"""
    md5: str
    """MD5 hash"""
    token: Optional[str]
    """Token"""
    parent_token: str
    """Parent token"""


class DataPreviewResponseDataModel[E: dict](BaseModel):
    meta: DataMetaModel[E] = Field(description="Meta")
    data: list[
        dict[
            str,
            str | int | float | UrlValue | list[FileValue] | None | bool,
        ]
    ] = Field(description="Parsed data")


class XLSXDataPreviewExtraModel(BaseModel):
    """XLSX data preview extra model."""

    sheet_name: str = Field(description="Sheet name")
    """Sheet name"""
    sheet_names: list[str] = Field(description="Sheet names")
    """Sheet names"""
    data_range: DataRangeModel
    header_index: int = Field(
        description="Header row index, start from 1",
        gt=1,
    )


class XLSXDataPreviewResponseDataModel(
    DataPreviewResponseDataModel[XLSXDataPreviewExtraModel]
):
    """XLSX data preview request body model."""

    pass


class XLSDataPreviewResponseDataModel(
    DataPreviewResponseDataModel[XLSXDataPreviewExtraModel]
):
    """XLS data preview request body model."""

    pass


class CSVDataPreviewResponseDataModel(
    DataPreviewResponseDataModel[XLSXDataPreviewExtraModel]
):
    """CSV data preview request body model."""

    pass
