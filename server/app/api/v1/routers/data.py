from typing import Annotated, Union
from fastapi import APIRouter, status, Depends, Body
from server.file import fileManager
from server.api.utils import make_response
from server.schemes import (
    DataPreviewRequestBodyModel,
    User,
    BasicResponseModel,
    XLSXDataParserConfigModel,
    XLSParserConfigModel,
    CSVParserConfigModel,
    XLSXDataSourceModel,
    XLSDataSourceModel,
    CSVDataSourceModel,
    XLSXDataPreviewResponseDataModel,
    XLSDataPreviewResponseDataModel,
    CSVDataPreviewResponseDataModel,
)
from server.data_parser import (
    dataParser,
)
from .._constants import API_V1_LIST
from ..dependencies import get_current_user

DATA_API_NAMESPACE = "data"
DATA_API_META = API_V1_LIST[DATA_API_NAMESPACE]
DATA_API_RESOURCES = DATA_API_META["resource"]

router = APIRouter(
    prefix=DATA_API_META["prefix"],
    tags=DATA_API_META["tags"],
)


@router.post(
    DATA_API_RESOURCES["preview"]["path"],
    status_code=status.HTTP_200_OK,
    response_model=BasicResponseModel[
        Union[
            XLSDataPreviewResponseDataModel,
            XLSXDataPreviewResponseDataModel,
            CSVDataPreviewResponseDataModel,
        ]
    ],
)
async def preview_data(
    request_body: Annotated[
        DataPreviewRequestBodyModel[
            Union[
                XLSXDataParserConfigModel, XLSParserConfigModel, CSVParserConfigModel
            ],
            Union[XLSXDataSourceModel, XLSDataSourceModel, CSVDataSourceModel],
        ],
        Body(),
    ],
    user: User = Depends(get_current_user),
):
    """Preview data API."""
    config = request_body.config
    data_source = request_body.data_source
    if data_source.source_type == "file":
        user_file_manager = fileManager.get_user_manager(user)
        token = data_source.token
        file_item = user_file_manager.get_file_from_token(token)
        return make_response(
            data=dataParser.preview(data_source.type, file_item, config.model_dump())
        )
