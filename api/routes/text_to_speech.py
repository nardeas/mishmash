from api.app import *


import base64
import asyncio
import concurrent
import functools
import os
from google.cloud import texttospeech


def google_text_to_speech(api_key, **kwargs):
    try:
        client = texttospeech.TextToSpeechClient.from_service_account_file(api_key)

        prompt = kwargs["prompt"]
        gender = kwargs["gender"].lower()
        language_code = kwargs["language_code"]

        synthesis_input = texttospeech.SynthesisInput(text=prompt)

        if "male" in gender:
            voice_gender = texttospeech.SsmlVoiceGender.MALE
        elif "female" in gender:
            voice_gender = texttospeech.SsmlVoiceGender.FEMALE
        else:
            voice_gender = texttospeech.SsmlVoiceGender.NEUTRAL
        voice = texttospeech.VoiceSelectionParams(
            language_code=language_code, ssml_gender=voice_gender
        )
        audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
        response = client.synthesize_speech(
            input=synthesis_input, voice=voice, audio_config=audio_config
        )
        logger.info(f"converted {prompt} to languge {language_code} with voice {gender}")
        return base64.b64encode(response.audio_content)
    except:
        logger.exception("Text2Speech api failed:")
        return None


async def text_to_speech(*args, **kwargs):
    with concurrent.futures.ProcessPoolExecutor(max_workers=1) as exc:
        return await asyncio.get_running_loop().run_in_executor(
            exc,
            functools.partial(
                google_text_to_speech, os.environ["GOOGLE_APPLICATION_CREDENTIALS"], **kwargs
            ),
        )


@app.get("/text2speech")
async def create(prompt: str = "", gender: str = "neutral", language_code="en-US"):
    logger.info(f"creating image using the following prompt: {repr(prompt)}")
    result = await text_to_speech(prompt=prompt, gender=gender, language_code=language_code)
    return result
