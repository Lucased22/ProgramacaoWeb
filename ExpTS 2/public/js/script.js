function removeMajor(id){
    fetch(`/majors/remove/${id}`, {method: `POST`}).then(response => {
        if (response.ok) {
            console.log(`Major with id ${id} removed successfully.`); //browser
            window.location.href = `/majors`;
        }
        else{
            console.error(`Failed to remove major with id ${id}.`); 
            console.log(response.status);
        }
    } )
}

function removeUser(id){
    console.log(`botão clicado`);
    fetch(`/users/remove/${id}`, {method: `POST`}).then(response => {
        if (response.ok) {
            console.log(`User with id ${id} removed successfully.`); //browser
            window.location.href = `/users`;
        }
        else{
            console.error(`Failed to remove user with id ${id}.`); 
            console.log(response.status);
        }
    } )
}