import React from 'react'
import Nav from '../Nav/Nav';
import Tablemain from './Tablemain';

function Table() {
    return (
        <>
            <header className="header">
                <div className="header-container">
                    <Nav />
                    <Tablemain />
                </div>
            </header>
        </>
    )
}

export default Table;