// const commentFormHandler = async (event) => {
//   event.preventDefault();

//   const post_id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//   ];
//   const comment_body = document.querySelector('input[name="comment"]').value.trim();

//     if (comment_body) {
//         const response = await fetch(`/api/comments`, {
//             method: 'POST',
//             body: JSON.stringify({comment_body, post_id }),
//             headers: { 'Content-Type': 'application/json' },
//           });

//           if (response.ok) {
//             document.location.replace(`/post/${id}`);
//           } else {
//             console.log('Failed to create comment')
//           }
//     }
// };

// document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

async function commentFormHandler(event) {
  event.preventDefault();

  const comment_body = document.querySelector('textarea[name="comment-desc"]').value.trim();

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment_body) {
    const response = await fetch(`/api/comment`, {
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
      alert('Failed to create post');
    }
  }
}

document.querySelector('.comment-form').addEventListener('click', commentFormHandler);