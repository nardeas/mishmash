from api.app import *

@app.get('/')
async def test_route():
    logger.info('test route')
    return {'test': 1}
