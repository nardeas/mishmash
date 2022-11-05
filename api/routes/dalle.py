from api.app import *

import openai
import asyncio
import concurrent
import functools
import os


def dalle_create_image_with_auth(api_key, **kwargs):
    openai.api_key = api_key
    return openai.Image.create(**kwargs)

async def dalle_create_image(*args, **kwargs):
    with concurrent.futures.ProcessPoolExecutor(max_workers=1) as exc:
        return await asyncio.get_running_loop().run_in_executor(
            exc,
            functools.partial(
                dalle_create_image_with_auth,
                os.environ['OPENAI_KEY'],
                **kwargs
            )
        )

@app.get('/image')
async def create_image_route(prompt: str = '', count: int = 1):
    print(f'creating image using the following prompt: {repr(prompt)}')
    result = await dalle_create_image(
        prompt=prompt,
        n=count,
        size='1024x1024'
    )
    return result
