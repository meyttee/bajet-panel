export const regexPatterns = {
  persianCharactersWithSpace: {
    value: /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\u200c\s]+$/,
    message: "لطفا فقط از حروف فارسی و فاصله استفاده کنید.",
  },
} as const;
