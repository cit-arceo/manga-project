import React from 'react';
import { Sidebar } from './Sidebar';
import { ChapterScreen } from '../chapters/ChapterScreen';
import { NothingSelected } from './NothingSelected';
import { useSelector } from 'react-redux';

export const MangaScreen = () => {
    
    const { active } = useSelector( state => state.chapters );
    
    return (
        <div className="manga__main-content">
            
            <Sidebar />


            <main>

                {
                    ( active )
                    ? (<ChapterScreen />)
                    : (<NothingSelected />)
                }

            </main>


        </div>
    )
}
