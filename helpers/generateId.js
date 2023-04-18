const generateId = () => {
    const reandom = Math.random().toString(32).substring(2);
    const timestamp = Date.now().toString(32);
    return reandom + timestamp;
}

export default generateId