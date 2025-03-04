class NoFileException(Exception):
    """Not Found File Exception"""

class CreateFileException(Exception):
    """Create File Error"""

class CreateDirException(Exception):
    """Create Dir Error"""

class CaculateMD5Exception(Exception):
    """Caculate MD5 Error"""

class ChunkNotFoundException(Exception):
    """Chunk Not Found Error"""

class NoChunkMetaException(Exception):
    """Not Found Chunk Meta Error"""

class InvalidateFileException(Exception):
    """Invalid File Error"""

class FileNumberLimitException(Exception):
    """User File Number Limit Exceeded Error"""
