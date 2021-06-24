const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
    const comment_body = document.querySelector('#comment').value.trim();

    if (comment_body) {
        const response = await fetch(`/api/posts/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment_body, post_id }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace(`/post`);
          } else {
            console.log('Failed to create comment')
          }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);