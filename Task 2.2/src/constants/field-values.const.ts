import { StringGenerator } from "utils/generators/string.generator";

export const FieldValues = {

    CorrectValue: {
        Title: 'Заголовок',
        Description: 'Описание задачи',
    },

    TooLongValue: {
        TooLongTitle: StringGenerator.randomString(),
        TooLongDescription: StringGenerator.randomString(),
    },

    SpecialSymbolValue: {
        SpecialSymbolTitle: StringGenerator.randomSpecialSymbols(),
        SpecialSymbolDescription: StringGenerator.randomSpecialSymbols(),
    },

    EmptyValue: {
        EmptyTitle: '',
        EmptyDescription: '',
    },

    UpdatedValue: {
        UpdatedTitle: 'Обновленный заголовок',
        UpdatedDescription: 'Обновленное описание',
    }

} as const;