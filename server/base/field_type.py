from enum import Enum

class FieldType(Enum):
    """Field type enum."""
    # Segments for Text, Barcode field
    Segments = 1
    # Number for Number, Progress, Currency, Rating field
    Number = 2
    SingleSelect = 3
    MultiSelect = 4
    DateTime = 5
    Checkbox = 7
    User = 11
    Phone = 13
    Url = 15
    Attachment = 17
    SingleLink = 18
    Lookup = 19
    Formula = 20
    DuplexLink = 21
    Location = 22
    GroupChat = 23
    CreatedTime = 1001
    ModifiedTime = 1002
    CreatedUser = 1003
    ModifiedUser = 1004
    AutoNumber = 1005
  
class FieldUIType(Enum):
    """Field UI type enum."""
    Text = "Text"
    Barcode = "Barcode"
    Number = "Number"
    Progress = "Progress"
    Currency = "Currency"
    Rating = "Rating"
    SingleSelect = "SingleSelect"
    MultiSelect = "MultiSelect"
    DateTime = "Datetime"
    Checkbox = "Checkbox"
    User = "User"
    GroupChat = "GroupChat"
    Phone = "Phone"
    Url = "Url"
    Attachment = "Attachment"
    SingleLink = "SingleLink"
    Formula = "Formula"
    DuplexLink = "DuplexLink"
    Location = "Location"
    CreatedTime = "CreatedTime"
    ModifiedTime = "ModifiedTime"
    CreatedUser = "CreatedUser"
    ModifiedUser = "ModifiedUser"
    AutoNumber = "AutoNumber"
    Lookup = "Lookup"
