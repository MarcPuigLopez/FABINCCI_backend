
// Generación del ID para el user
const generateId = () => {
    const random = Math.random().toString(32).substring(2);
    const timestamp = Date.now().toString(32);
    return random + timestamp;
}

export default generateId