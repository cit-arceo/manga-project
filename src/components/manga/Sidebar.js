import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MangaEntries } from './MangaEntries'
import { startLogout } from '../../actions/auth';
import { startNewChapter } from '../../actions/chapters';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const hanleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNew = () => {
        dispatch( startNewChapter() );
    }

    return (
        <aside className="manga__sidebar">
            
            <div className="manga__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fa fa-user-circle-o"></i>
                    <span> { name }</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ hanleLogout }
                >
                    Logout
                </button>
            </div>

            <div 
                className="manga__new-entry"
                onClick={ handleAddNew }
            >
                <i className="fa fa-upload fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <MangaEntries />    

        </aside>
    )
}
