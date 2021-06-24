const editFormHandler = async (event) => {
  event.preventDefault();
  
    const name = document.querySelector('#post-name').value.trim();
    const description = document.querySelector('#post-desc').value.trim();
  
    const response = await fetch(`/api/posts/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log('ERROR')
    }
};  

document.querySelector('#updateBtn').addEventListener('submit', editFormHandler);

  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/delete/${id}`, {
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