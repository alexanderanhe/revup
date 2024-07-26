import * as deepl from 'deepl-node';

export async function translaterService(text: string, target_lang: deepl.TargetLanguageCode = 'es', source_lang?: deepl.SourceLanguageCode) {
  const translator = new deepl.Translator(`${process.env.DEEPL_API_KEY}`);
  try {
    const result = await translator.translateText(text, source_lang ?? null, target_lang);
    return result.text;
  } catch (e) {
    console.error(e);
    return null
  }
}