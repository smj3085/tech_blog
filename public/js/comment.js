async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
          comment,
          post_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create a comment');
      }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('click', commentFormHandler);