export interface UserAnswersObject {
    userID: string;
    age: string | null;
    gender: string | null;
    genderIdentity: string | null;
    describedIdentity: string | null;
    firstLanguage: string | null;
    currentLanguage: string | null;
    phoneModel: string | null;
}

export type UserAnswersObjectKeys = keyof UserAnswersObject;

export const getUserAnswersDefaultState = (
    canonicalUserID: string
): UserAnswersObject => {
    return {
        userID: canonicalUserID,
        age: null,
        gender: null,
        genderIdentity: null,
        describedIdentity: null,
        firstLanguage: null,
        currentLanguage: null,
        phoneModel: null,
    };
};


export const formatUserData = (answers: UserAnswersObject) => {
    return {
        ...answers
    };
};