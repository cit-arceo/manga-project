import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ChaptersAppBar } from './ChaptersAppBar'
import { useForm } from '../../hooks/useForm';
import { activeChapter, startDeleting } from '../../actions/chapters';

export const ChapterScreen = () => {

    const dispatch = useDispatch();

    const { active:chapter } = useSelector( state => state.chapters );
    const [ formValues, handleInputChange, reset ] = useForm( chapter );
    const { body, title, id } = formValues;

    const activeId = useRef( chapter.id );

    useEffect(() => {
        
        if ( chapter.id !== activeId.current ) {
            reset( chapter );
            activeId.current = chapter.id
        }

    }, [chapter, reset])

    useEffect(() => {
        
        dispatch( activeChapter( formValues.id, { ...formValues } ) );

    }, [formValues, dispatch])


    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }

    return (
        <div className="chapters__main-content">
            
            <ChaptersAppBar />

            <div className="chapters__content">

                <input 
                    type="text"
                    placeholder="Tittle manga"
                    className="chapters__title-input"
                    autoComplete="off"
                    name="tittle"
                    value={ title }
                    onChange= { handleInputChange }
                />

                <textarea
                    placeholder="Description"
                    className="chapters__textarea"
                    name="body"
                    value= { body }
                    onChange={ handleInputChange }
                ></textarea>
                
                {
                    (chapter.url) 
                    && (
                        <div className="chapters__image">
                            <img 
                                src={ chapter.url }
                                alt="imagen"
                            />
                        </div>
                    )
                }
            </div>

            <button 
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
