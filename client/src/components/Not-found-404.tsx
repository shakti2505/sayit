import React from 'react';
import svg404 from '../assets/images/404.svg';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface Props {
    // define your props here
}

const NotFound: React.FC<Props> = () => {
    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <img src={svg404} width={500} height={500} alt='404'/> 
            <Link to='/'>
            <Button>Back to home</Button>
            </Link>
        </div>
    );
};

export default NotFound;