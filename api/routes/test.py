from api.app import *

@app.get('/test')
async def test_route():
    return {'test': 1}
