# FastAPI
from fastapi.responses import Response as FastAPIResponse

# python's
from requests import Response as RequestsResponse
from typing import Any
import json

def get_domain(service_name: str, port: int = 8000) -> str:
    '''
    Get domain for a particular service, running on port 8000 of same docker network 
    '''
    return f"http://{service_name}:{port}"

def Response(response: RequestsResponse) -> Any:
    '''
    Formatted Response to a request, with status code and content-type 
    '''
    return FastAPIResponse(json.dumps(response.json()), response.status_code, headers={"content-type": "application/json"})
