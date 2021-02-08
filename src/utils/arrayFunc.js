export const countDuplicatesItemArray = (value, array) => {
    let count = 0;
    array.forEach(arrayvalue => {
        if (arrayvalue == value) {
            count++;
        }
    });
    return count;
};//realiza un foreach para contar los valores duplicados

export const removeArrayDuplicates = array => {
    return Array.from(new Set(array));
};//remueve los duplicados y solo devuelve el array sin duplicados

export const removeItemArray = (array, item) => {
    const index = array.indexOf(item);

    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}//eliminar un campo de un array