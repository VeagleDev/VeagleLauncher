import React from 'react';

const ProgressBlock = (props: any) => {
    if (!props || typeof props.state !== 'string' || typeof props.percentage !== 'number') {
        return <div>Erreur: les props sont incorrectes.</div>;
    }

    return (
        <div className="flex flex-col ">
            <span className="">Étape du téléchargement : {props.state}</span>
            <span className="">Pourcentage du téléchargement : {props.percentage}%</span>
        </div>
    )


};

export default ProgressBlock;
