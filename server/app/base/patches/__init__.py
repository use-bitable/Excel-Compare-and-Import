def patch():
    from baseopensdk.api.base.v1.resource import AppTableRecord
    from .services.app_record import search

    AppTableRecord.search = search
