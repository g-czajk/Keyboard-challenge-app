const clearStorage = () => {
    localStorage.removeItem("records");
    location.reload();
};

export { clearStorage };
