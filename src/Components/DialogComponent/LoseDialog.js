import React from 'react';
import DialogComponent from './DialogComponent';


const LoseDialog = ({openLoseDialog,setOpenLoseDialog}) => {


    return(<DialogComponent
        open={openLoseDialog}
        openDialog={setOpenLoseDialog}
        closeDialog={() => setOpenLoseDialog(false)}
        handleConfirm={() => setOpenLoseDialog(false)}
        title='PERDISTE'
        firstButton='VOLVER AL INICIO'
        secondButton='JUGAR DE NUEVO'
    >
    Quieres volver a intentarlo ?
    </DialogComponent>)
}

export default LoseDialog;