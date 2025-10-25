let posts = [];

function addPost() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const imageInput = document.getElementById('imageFile');
  const file = imageInput.files[0];

  if (title && content) {
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imageUrl = e.target.result;
        posts.push({ title, content, imageUrl });
        renderPosts();

        // Reset form sau khi thêm bài viết
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        imageInput.value = '';
      };
      reader.readAsDataURL(file);
    } else {
      posts.push({ title, content, imageUrl: null });
      renderPosts();

      // Reset form nếu không có ảnh
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      imageInput.value = '';
    }
  }
}

function renderPosts() {
  const container = document.getElementById('posts');
  container.innerHTML = '';

  const searchTerm = document.getElementById('search').value.toLowerCase();

  posts
    .filter(post => post.title.toLowerCase().includes(searchTerm))
    .forEach((post, index) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${post.title}</h3>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Ảnh bài viết" style="max-width:100%; margin-bottom:10px;">` : ''}
        <p>${post.content}</p>
        <button onclick="deletePost(${index})">Xóa</button>
      `;
      container.appendChild(div);
    });
}

function deletePost(index) {
  posts.splice(index, 1);
  renderPosts();
}

document.getElementById('search').addEventListener('input', renderPosts);
