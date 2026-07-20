import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
await prisma.language.createMany({
  data: [
    {
      code: "en",
      locale: "en-US",
      name: "English",
      nativeName: "English",
      isDefault: true,
    },
    {
      code: "id",
      locale: "id-ID",
      name: "Indonesian",
      nativeName: "Bahasa Indonesia",
    },
    {
      code: "ms",
      locale: "ms-MY",
      name: "Malay",
      nativeName: "Bahasa Melayu",
    },
    {
      code: "th",
      locale: "th-TH",
      name: "Thai",
      nativeName: "ไทย",
    },
    {
      code: "vi",
      locale: "vi-VN",
      name: "Vietnamese",
      nativeName: "Tiếng Việt",
    },
    {
      code: "tl",
      locale: "fil-PH",
      name: "Filipino",
      nativeName: "Filipino",
    },
    {
      code: "zh-CN",
      locale: "zh-CN",
      name: "Chinese (Simplified)",
      nativeName: "简体中文",
    },
    {
      code: "zh-TW",
      locale: "zh-TW",
      name: "Chinese (Traditional)",
      nativeName: "繁體中文",
    },
    {
      code: "ja",
      locale: "ja-JP",
      name: "Japanese",
      nativeName: "日本語",
    },
    {
      code: "ko",
      locale: "ko-KR",
      name: "Korean",
      nativeName: "한국어",
    },
    {
      code: "hi",
      locale: "hi-IN",
      name: "Hindi",
      nativeName: "हिन्दी",
    },
    {
      code: "bn",
      locale: "bn-BD",
      name: "Bengali",
      nativeName: "বাংলা",
    },
    {
      code: "ta",
      locale: "ta-IN",
      name: "Tamil",
      nativeName: "தமிழ்",
    },
    {
      code: "ur",
      locale: "ur-PK",
      name: "Urdu",
      nativeName: "اردو",
      isRTL: true,
    },
    {
      code: "ar",
      locale: "ar-SA",
      name: "Arabic",
      nativeName: "العربية",
      isRTL: true,
    },
    {
      code: "he",
      locale: "he-IL",
      name: "Hebrew",
      nativeName: "עברית",
      isRTL: true,
    },
    {
      code: "tr",
      locale: "tr-TR",
      name: "Turkish",
      nativeName: "Türkçe",
    },
    {
      code: "ru",
      locale: "ru-RU",
      name: "Russian",
      nativeName: "Русский",
    },
    {
      code: "uk",
      locale: "uk-UA",
      name: "Ukrainian",
      nativeName: "Українська",
    },
    {
      code: "pl",
      locale: "pl-PL",
      name: "Polish",
      nativeName: "Polski",
    },
    {
      code: "cs",
      locale: "cs-CZ",
      name: "Czech",
      nativeName: "Čeština",
    },
    {
      code: "hu",
      locale: "hu-HU",
      name: "Hungarian",
      nativeName: "Magyar",
    },
    {
      code: "ro",
      locale: "ro-RO",
      name: "Romanian",
      nativeName: "Română",
    },
    {
      code: "el",
      locale: "el-GR",
      name: "Greek",
      nativeName: "Ελληνικά",
    },
    {
      code: "de",
      locale: "de-DE",
      name: "German",
      nativeName: "Deutsch",
    },
    {
      code: "fr",
      locale: "fr-FR",
      name: "French",
      nativeName: "Français",
    },
    {
      code: "es",
      locale: "es-ES",
      name: "Spanish",
      nativeName: "Español",
    },
    {
      code: "pt",
      locale: "pt-PT",
      name: "Portuguese",
      nativeName: "Português",
    },
    {
      code: "pt-BR",
      locale: "pt-BR",
      name: "Portuguese (Brazil)",
      nativeName: "Português (Brasil)",
    },
    {
      code: "it",
      locale: "it-IT",
      name: "Italian",
      nativeName: "Italiano",
    },
    {
      code: "nl",
      locale: "nl-NL",
      name: "Dutch",
      nativeName: "Nederlands",
    },
    {
      code: "sv",
      locale: "sv-SE",
      name: "Swedish",
      nativeName: "Svenska",
    },
    {
      code: "da",
      locale: "da-DK",
      name: "Danish",
      nativeName: "Dansk",
    },
    {
      code: "no",
      locale: "nb-NO",
      name: "Norwegian",
      nativeName: "Norsk",
    },
    {
      code: "fi",
      locale: "fi-FI",
      name: "Finnish",
      nativeName: "Suomi",
    },
  ],
  skipDuplicates: true,
});

 console.log("✅ Languages seeded");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });