async function editFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="post-title"]').value.trim();
  const description = document.querySelector('textarea[name="content"]').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
      name,
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

const delButtonHandler = async (event) => {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  }
};

document
  .querySelector('.editBtn')
  .addEventListener('click', editFormHandler);

document
  .querySelector('.deleteBtn')
  .addEventListener('click', delButtonHandler);