import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadChapters } from '../helpers/loadChapters';
import { fileUpload } from '../helpers/fileUpload';


export const startNewChapter = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newChapter = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/manga/chapters`).add( newChapter );

        dispatch( activeChapter( doc.id, newChapter ) );
        dispatch( addNewChapter( doc.id, newChapter ) );

    }
}

export const activeChapter = ( id, chapter ) => ({
    type: types.chaptersActive,
    payload: {
        id,
        ...chapter
    }
});

export const addNewChapter = ( id, chapter ) => ({
    type: types.chaptersAddNew,
    payload: {
        id, ...chapter
    }
})


export const startLoadingChapters = ( uid ) => {
    return async( dispatch ) => {
        
        const chapters = await loadChapters( uid );
        dispatch( setChapters( chapters ) );

    }
}


export const setChapters = ( chapters ) => ({
    type: types.chaptersLoad,
    payload: chapters
});


export const startSaveChapter = ( chapter ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !chapter.url ){
            delete chapter.url;
        }

        const chapterToFirestore = { ...chapter };
        delete chapterToFirestore.id;

        await db.doc(`${ uid }/manga/chapters/${ chapter.id }`).update( chapterToFirestore );

        dispatch( refreshChapter( chapter.id, chapterToFirestore ) );
        Swal.fire('Saved', chapter.title, 'success');
    }
}

export const refreshChapter = ( id, chapter ) => ({
    type: types.chaptersUpdated,
    payload: {
        id,
        chapter: {
            id,
            ...chapter
        }
    }
});


export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeChapter } = getState().chapters;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        activeChapter.url = fileUrl;

        dispatch( startSaveChapter( activeChapter ) )
        

        Swal.close();
    }
}


export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
         
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/manga/chapters/${ id }`).delete();

        dispatch( deleteChapter(id) );

    }
}

export const deleteChapter = (id) => ({
    type: types.chaptersDelete,
    payload: id
});


export const chapterLogout = () => ({
    type: types.chaptersLogoutCleaning
});
