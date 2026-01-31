import { tutorServices } from '@/Services/tutor.services';
import React from 'react';

const Home = async() => {

    const { data, error } = await tutorServices.getAllTutors()

    console.log(data);

    return (
        <div>
           <h1>Common Layout Page....</h1> 
        </div>
    );
};

export default Home;<h1>Common Layout Page....</h1>