function setDefaultDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('datepicker').value = formattedDate;
    return formattedDate;
}

export { setDefaultDate };
