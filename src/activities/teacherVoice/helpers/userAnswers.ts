import { DraggableInputItem } from '../components/draggableInput/DraggableInput.component';
import { AudioObject } from './primingAudio';

export interface UserAnswersObject {
    userID: string;
    age: string | null;
    mic: string | null;
    noiseLevel: string | null;
    isFirstTimeParticipating: string | null;
    gender: string | null;
    genderIdentity: string | null;
    describedIdentity: string | null;
    isEnglishFirstLanguage: string | null;
    firstLanguage: string | null;
    englishProficiency: string | null;
    educationLevel: string | null;
    publicSpeakingExperience: string | null;
    countryOfBirth: string | null;
    currentLocation: string | null;
    wouldYouRather: {
        chosen: AudioObject | null;
        notChosen: AudioObject | null;
    };
    rankAudios: DraggableInputItem[] | null;
}

export type UserAnswersObjectKeys = keyof UserAnswersObject;

export const getUserAnswersDefaultState = (
    canonicalUserID: string
): UserAnswersObject => {
    return {
        userID: canonicalUserID,
        age: null,
        mic: null,
        noiseLevel: null,
        isFirstTimeParticipating: null,
        gender: null,
        genderIdentity: null,
        describedIdentity: null,
        isEnglishFirstLanguage: null,
        firstLanguage: null,
        englishProficiency: null,
        educationLevel: null,
        publicSpeakingExperience: null,
        countryOfBirth: null,
        currentLocation: null,
        wouldYouRather: {
            chosen: null,
            notChosen: null,
        },
        rankAudios: null,
    };
};

export const formatUserData = (answers: UserAnswersObject) => {
    const chosen = answers.wouldYouRather.chosen?.title;
    const notChosen = answers.wouldYouRather.notChosen?.title;
    const rankAudios = answers.rankAudios
        ? answers.rankAudios.map((video) => video.title)
        : null;
    return {
        ...answers,
        wouldYouRather: {
            chosen: chosen,
            notChosen: notChosen,
        },
        rankAudios: rankAudios,
    };
};
