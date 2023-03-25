import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader: React.FC = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-primary-bg pb-16">
            <div className="text-white font-bold text-4xl mb-4">Griff</div>
            <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 flex justify-center items-center">
                    <ClipLoader
                        size={80}
                        color={'#EB5E28'}
                        className="absolute border-4 border-solid border-dark-orange rounded-full"
                    />
                </div>
                <div className="flex items-center text-white text-l  mt-8">
                    Récupération des informations ...
                </div>
            </div>
            <div className="absolute bottom-8 text-white text-lg underline text-[14px]">
                Contactez-nous si cela prend plus de temps que prévu.
            </div>
        </div>
    );
};

export default Loader;
