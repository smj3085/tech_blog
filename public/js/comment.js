const newComment = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('post-id');
    const comment = $('#comment').val().trim();

    if (comment) {
        const response = await fetch(`/api/posts/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace(`/comments/${id}`);
          } else {
            console.log('ERROR')
          }
    }
};

$('#commentButton').on('submit', newComment);