const BASE_URL = 'http://localhost:8000';

async function get(endpoint: string) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  const json = await response.json();
  console.log('JSON', json);
  return json;
}

type Gender = 'neutral' | 'male' | 'female';
type Language = 'en-US' | 'fr-FR' | 'de-DE';

export function getAudioFromText({
  prompt,
  gender = 'neutral',
  language = 'en-US',
}: {
  prompt: string;
  gender?: Gender;
  language?: Language;
}) {
  const p = encodeURIComponent(prompt);
  const g = encodeURIComponent(gender);
  const l = encodeURIComponent(language);
  return get(`text2speech?prompt=${p}&gender=${g}&language_code=${l}`);
}

export function getImageFromText({
  prompt,
  count = 1,
  size = 1,
}: {
  prompt: string;
  count?: number;
  size?: 1 | 2 | 3;
}): Promise<{ result: Array<string> }> {
  const p = encodeURIComponent(prompt);
  return get(`text2image?prompt=${p}&count=${count}&size=${size}`);
}

export function getTextContent({ prompt }: { prompt: string }) {
  const p = encodeURIComponent(prompt);
  return get(`textcontent?prompt=${p}`);
}

export const api = {
  getAudioFromText,
  getImageFromText,
  getTextContent,
};
