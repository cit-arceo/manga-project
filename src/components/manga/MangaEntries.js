import React from 'react'
import { useSelector } from 'react-redux';
import { MangaEntry } from './MangaEntry';

export const MangaEntries = () => {

    const { chapters } = useSelector( state => state.chapters );

    return (
        <div className="manga__entries">
            
            {
                chapters.map( chapter => (
                    <MangaEntry 
                        key={ chapter.id }
                        { ...chapter }
                    />
                ))
            }

        </div>
    )
}
