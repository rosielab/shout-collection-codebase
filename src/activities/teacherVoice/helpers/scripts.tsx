import { Citation } from '../components/citation/Citation.component';

export type ScriptLevel = 'general' | 'elementary';

export interface Script {
    text: string;
    cite: string | JSX.Element;
}

export interface ScriptTypes {
    general: Array<Script>;
    elementary: Array<Script>;
}

export const elementaryLevelScripts: Array<Script> = [
    {
        text: 'Peg and Datiz go to the Arctic Circle to learn about arctic animals. They cant wait to see a polar bear. The Arctic Circle is a cold and snowy place. The polar bear sits. The polar bear digs. The polar bear nips his pal. The polar bear gets wet. The polar bear jogs. The polar bear walks.',
        cite: (
            <Citation
                title={'“Polar Bears in the Arctic”'}
                titleLink={
                    'https://freekidsbooks.org/polar-bears-in-the-arctic-learn-to-read-with-wordscientists/'
                }
                author={'written by WordScientists'}
                license={' CC-BY-SA-NC'}
                licenseLink={
                    'https://creativecommons.org/licenses/by-nc-sa/4.0/'
                }
            />
        ),
    },
    {
        text: 'I am an architect. Architects design and make buildings because they like buildings and houses. Just like I do. Which is why Ma calls me her little architect. To build a house, you need space in some place. Your house could be in a full-of-trees forest place',
        cite: (
            <Citation
                title={'“The Best House Of All”'}
                titleLink={
                    'https://freekidsbooks.org/the-best-house-of-all-a-picture-book-for-little-architects/'
                }
                author={'written by Natasha Sharma'}
                license={'CC-BY-4.0'}
                licenseLink={'https://creativecommons.org/licenses/by/4.0/'}
            />
        ),
    },
    {
        text: 'To build a house, you also need stuff. To find stuff, you must look around. A forest has trees. A mountain has stones. The arctic has snow. A village has mud, big leaves for thatch, and bamboo. A city has bricks, cement, steel, and glass',
        cite: (
            <Citation
                title={'“The Best House Of All”'}
                titleLink={
                    'https://freekidsbooks.org/the-best-house-of-all-a-picture-book-for-little-architects/'
                }
                author={'written by Natasha Sharma'}
                license={'CC-BY-4.0'}
                licenseLink={'https://creativecommons.org/licenses/by/4.0/'}
            />
        ),
    },
    {
        text: 'A house has all kinds of stuff. Before you build your house, you must know what you want it to do. Igloos made of snow keep you warm! Wood and stone houses with sloping roofs make the rain and snow run right off. ',
        cite: (
            <Citation
                title={'“The Best House Of All”'}
                titleLink={
                    'https://freekidsbooks.org/the-best-house-of-all-a-picture-book-for-little-architects/'
                }
                author={'written by Natasha Sharma'}
                license={'CC-BY-4.0'}
                licenseLink={'https://creativecommons.org/licenses/by/4.0/'}
            />
        ),
    },
];

export const scripts = [
    {
        text: 'Mathematics is essential in many fields, including natural sciences, engineering, medicine, finance, computer science and social sciences. Some areas of mathematics, such as statistics and game theory, are developed in direct correlation with their applications, and are often grouped under the name of applied mathematics.',
        cite: 'Citation: “Mathematics” Wikipedia, Wikimedia Foundation,  30 November 2021',
    },
    {
        text: 'New knowledge in science is advanced by research from scientists who are motivated by curiosity about the world and a desire to solve problems. Contemporary scientific research is highly collaborative and is usually done by teams in academic and research institutions, government agencies, and companies',
        cite: 'Citation: “Science.” Wikipedia, Wikimedia Foundation, 27 November 2021',
    },
    {
        text: 'Over time, philosophers like Plato, Aristotle, Socrates and Kant, among others, questioned the meaning of art. Several dialogues in Plato tackle questions about art: Socrates says that poetry is inspired by the muses, and is not rational.',
        cite: 'Citation: “Art.” Wikipedia, Wikimedia Foundation, 27 November 2021',
    },
    {
        text: 'Modern English has been spreading around the world since the 17th century by the worldwide influence of the British Empire and the United States. Through all types of printed and electronic media of these countries, English has become the leading language of international discourse',
        cite: 'Citation: “English.” Wikipedia, Wikimedia Foundation, 28 November 2021',
    },
    {
        text: "An individual's culture or ethnicity plays a role in their music cognition, including their preferences, emotional reaction, and musical memory. Musical preferences are biased toward culturally familiar musical traditions beginning in infancy",
        cite: 'Citation: “Music.” Wikipedia, Wikimedia Foundation, 6 November 2021',
    },
];

export const allScripts: ScriptTypes = {
    general: scripts,
    elementary: elementaryLevelScripts,
};
