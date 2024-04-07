const updatepostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const contents = document.querySelector('#post-content').value.trim();
    const id = document.querySelector('#post-id').value.trim();

    if (title && contents) {
        const response = await fetch(`/api/posts/${id}`, { 
        method: 'PUT',
        body: JSON.stringify({ title, contents, id }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    }
};

document.querySelector('.post-form').addEventListener('submit', updatepostFormHandler);