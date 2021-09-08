import React from 'react';


const ListCreadores = ({ creador }) => {


    return (
        <div>
            <center><h1>MQuotes</h1></center>
            {creador.map((creator) => (
                <div className="flex bg-white w-full mb-5 shadow-sm rounded-lg dark:bg-gray-300 group overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-5/12 p-2 dark:bg-white rounded-tl-lg rounded-bl-lg">
                    <h5 className="bg-contain bg-no-repeat bg-center w-full h-full transition-transform duration-300 group-hover:transform group-hover:scale-125">{creator.Nombre}</h5>
                    </div>
                    <div className="w-7/12 p-5">
                    <h1 className="md:text-2xl">{creator.ContactName}</h1>
                    <div className="mt-4">{creator.ExpirationDate}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListCreadores;
