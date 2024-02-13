const showDescription = (button) => {
    const targetId = button.getAttribute('data-target');
    const target = document.getElementById(targetId);
    target.style.display = 'block';
}

function hideDescription(event, targetId) {
    if (event.target.className === 'description-background' || event.target.className === 'btn btn-primary') {
        var targetDiv = document.getElementById(targetId);
        targetDiv.style.display = 'none';
    }
}