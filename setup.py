"""Setup environment for the server."""
from importlib import import_module


def check_module(module_name):
    """Check if module exists."""
    try:
        import_module(module_name)
        return True
    except ImportError:
        return False


if __name__ == '__main__':
    if not check_module('pipenv'):
        print('Please install pipenv first')
    
