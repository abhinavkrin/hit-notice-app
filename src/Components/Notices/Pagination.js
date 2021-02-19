import React from 'react';
import { Link } from 'react-router-dom';
import { MAX_PAGE } from '../../config';

function Pagination({page}){
    const p = parseInt(page);
    return (
        <div className="w-100 d-flex justify-content-between align-items-center mr-auto ml-auto" style={{maxWidth: "300px"}}>
        {p-1!==0 ?
            <span>
                <Link to={"/page/"+(p-1)}>
                    <button className={"cbutton"}>PREVIOUS</button>
                </Link>
            </span>
            :
            <button className={"cbutton disabled"}>PREVIOUS</button>
        }
        <span style={{fontWeight: "500"}}>
            PAGE {p}
        </span>
        {p<MAX_PAGE ?
            <span>
                <Link to={"/page/"+(p+1)}>
                    <button className="cbutton">NEXT</button>
                </Link>
            </span>
            :
            <button className={"cbutton disabled"}>NEXT</button>
        }
    </div>
    )
}

export default Pagination;