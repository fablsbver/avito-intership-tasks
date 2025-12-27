import { customAlphabet, nanoid } from "nanoid";

export class StringGenerator {
  /** Возвращает случайную строку длиной length (по умолчанию 101) */
  static randomString(length: number = 101): string {
    return nanoid(length);
  }

  /** Возвращает строку из спецсимволов длиной length */
  static randomSpecialSymbols(length: number = 30): string {
    const generator = customAlphabet('!@#$%^&*()', length);
    return generator();
  }
} 