import os
import logging

import openai

openai.api_key = os.getenv("OPENAI_API_KEY")


def strip_non_alnum_from_text(text):
    # avoid outputs like: ':\n\n\n\nNew iPhone: Now with 100% more battery life!'
    first_alnum_character = 0
    for idx, s in enumerate(text):
        if s.isalnum():
            first_alnum_character = idx
            break
    return text[first_alnum_character:].strip()


def generate_text_content(prompt):
    """
    Inlcude previous prompt input separeted by \n\n

    Examples:
    "Create funny one sentence marketing text for new iPhone"

    "Create marketing text for new iPhone model\n\nThe new iPhone model is the most powerful and \
    sophisticated iPhone yet. It has a powerful A12 processor and a new design that is sleek and \
    stylish. This phone is sure to revolutionize the smartphone industry.\n\ntranslate to spanish"
    """
    try:
        response = openai.Completion.create(
            model="text-davinci-002",
            prompt=prompt,
            max_tokens=256,
            temperature=0.7,
            top_p=1,
            n=1,
            stream=False,
            logprobs=None,
            echo=False,
        )
        res_dict = response.to_dict()
        logging.info(f"Completion API completed with: {res_dict}")
        if res_dict["choices"]:
            res_text = res_dict["choices"][0].to_dict()["text"].strip()
            return strip_non_alnum_from_text(res_text)
        return None
    except:
        logging.exception("Completion api failed:")
        return None

