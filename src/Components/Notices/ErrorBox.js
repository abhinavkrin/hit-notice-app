import React from 'react';
import { MAX_PAGE } from '../../config';
import errorImg from '../../Assets/Images/error.svg';

function ErrorBox(){
    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <img src={errorImg} alt="Error" width="150"></img>
            </div>
            <div className="col-12 d-flex justify-content-center">
            <div>
                <h5 className="text-center">Faild to load notices</h5>
                <div className="w-100 text-center">Check</div>
                <ul className="ml-auto">
                <li>
                    Network is available
                </li>
                <li>
                    Only page 1 - {MAX_PAGE} can be shown
                </li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default ErrorBox;