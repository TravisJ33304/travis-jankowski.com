const showDescription = (button) => {
    const targetId = button.getAttribute('data-target');
    const target = document.getElementById(targetId);
    target.style.display = 'block';
}

const hideDescription = (targetId) => {
    const target = document.getElementById(targetId);
    target.style.display = 'none';
}
