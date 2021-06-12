const updatePost = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const title = $('#edit-title').val().trim();
      const description = $('#edit-description').val().trim();

      if (title && description) {
        const response = await fetch(`/api/posts/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
          });
    
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            console.log('ERROR')
          }
      }
      }
  };
  
  $('#updateButton').on('submit', updatePost);