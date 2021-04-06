import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeChapter } from '../../actions/chapters';

export const MangaEntry = ({ id, date, title, body, url }) => {
    
    const chapterDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch( 
            activeChapter( id, {
                date, title, body, url
            })
        );
    }
    
    return (
        <div 
            className="manga__entry pointer"
            onClick={handleEntryClick}
        >
            {
                url &&
                <div 
                    className="manga__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }

            <div className="manga__entry-body">
                <p className="manga__entry-title">
                    { title }
                </p>
                <p className="manga__entry-content">
                    { body }
                </p>
            </div>

            <div className="manga__entry-date-box">
                <span>{ chapterDate.format('dddd')}</span>
                <h4>{chapterDate.format('Do')}</h4>
            </div>

        </div>
    )
}
