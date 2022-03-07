export interface UserAnswersObject {
    userID: string;
    age: string | null;
    gender: string | null;
    firstLanguage: string | null;
    currentLanguage: string | null;
    phoneModel: string | null;
    consentresearch: boolean | null;
    consentcommercial: boolean | null;
}

export type UserAnswersObjectKeys = keyof UserAnswersObject;

export const getUserAnswersDefaultState = (
    canonicalUserID: string
): UserAnswersObject => {
    return {
        userID: canonicalUserID,
        age: null,
        gender: null,
        firstLanguage: null,
        currentLanguage: null,
        phoneModel: null,
        consentresearch: null,
        consentcommercial: null,
    };
};


export const formatUserData = (answers: UserAnswersObject) => {
    return {
        ...answers
    };
};