import base64
from google.cloud import texttospeech


def generate_audio_content(text, language_code="en-US", gender="neutral"):
    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=text)

    if "male" in gender.lower():
        voice_gender = texttospeech.SsmlVoiceGender.MALE
    elif "female" in gender.lower():
        voice_gender = texttospeech.SsmlVoiceGender.FEMALE
    else:
        voice_gender = texttospeech.SsmlVoiceGender.NEUTRAL
    voice = texttospeech.VoiceSelectionParams(language_code=language_code, ssml_gender=voice_gender)
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    return base64.b64encode(response.audio_content)

