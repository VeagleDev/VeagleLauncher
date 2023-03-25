import React from 'react';

const ProgressBlock = (props: any) => {
    if (!props || typeof props.state !== 'string' || typeof props.percentage !== 'number') {
        return <div>Erreur: les props sont incorrectes.</div>;
    }


};

export default ProgressBlock;
