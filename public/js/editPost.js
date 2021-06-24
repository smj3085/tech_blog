const editFormHandler = async (event) => {
  event.preventDefault();
  
    const name = document.querySelector('#edit-name').value.trim();
    const description = document.querySelector('#edit-desc').value.trim();
  
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, name, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log('ERROR')
    }
};  

document.querySelector('.updateBtn').addEventListener('submit', editFormHandler);

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document.querySelector('.deleteBtn').addEventListener('submit', delButtonHandler);