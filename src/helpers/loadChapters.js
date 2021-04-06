import { db } from '../firebase/firebase-config';



export const loadChapters = async ( uid ) => {

    const chaptersSnap = await db.collection(`${ uid }/manga/chapters`).get();
    const chapters = [];

    chaptersSnap.forEach( snapHijo => {
        chapters.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    
    return chapters;
}



