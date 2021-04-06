import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveChapter, startUploading } from '../../actions/chapters';

export const ChaptersAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector( state => state.chapters );

    const handleSave = () => {
        dispatch( startSaveChapter( active ) );
    }

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }

    return (
        <div className="chapters__appbar">
            <span>Manga</span>

            <input 
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
