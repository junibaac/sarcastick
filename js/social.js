// --- SOCIAL MODAL & INTERACTIONS ---

window.openModal = function (post) {
    CURRENT_MEME = post;
    imageModal.style.display = "flex";
    modalImg.src = post.url;
    modalAuthor.textContent = post.uploadedBy;
    modalDate.textContent = new Date(post.uploadDate).toLocaleString();
    modalTitle.textContent = post.name;
    modalVotes.textContent = post.likedBy.length;
  
    updateModalLikeUI();
    renderComments(post.comments);
  };
  
  window.closeModal = function() {
      if(imageModal) imageModal.style.display = 'none';
      CURRENT_MEME = null;
  }
  
  function updateModalLikeUI() {
    if (!CURRENT_MEME) return;
    const hasLiked = CURRENT_MEME.likedBy.includes(USER_NICKNAME);
    const likeBtn = document.querySelector(
      '.action-btn[onclick="voteCurrent()"]',
    );
    if (likeBtn) {
      likeBtn.innerHTML = `${hasLiked ? "❤️ Ti piace" : "👍 Like"} <span>${CURRENT_MEME.likedBy.length}</span>`;
      likeBtn.style.color = hasLiked ? "#ff00ff" : "#606770";
    }
  }
  
  window.votePost = async function (postId) {
    const post = MEME_DATABASE.find((p) => p.id === postId);
    if (!post) return;
  
    const index = post.likedBy.indexOf(USER_NICKNAME);
    if (index === -1) post.likedBy.push(USER_NICKNAME);
    else post.likedBy.splice(index, 1);
  
    renderGallery(MEME_DATABASE);
    if(CURRENT_MEME && CURRENT_MEME.id === postId) updateModalLikeUI();
    await syncDB();
  };
  
  window.voteCurrent = async function () {
    if (!CURRENT_MEME) return;
    await votePost(CURRENT_MEME.id);
  };
  
  window.submitComment = async function () {
    const text = commentInput.value.trim();
    if (!text || !CURRENT_MEME) return;
  
    CURRENT_MEME.comments.push({
      user: USER_NICKNAME,
      text: text,
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  
    commentInput.value = "";
    renderComments(CURRENT_MEME.comments);
    await syncDB();
  };
  
  function renderComments(comments) {
    commentList.innerHTML = "";
    if (comments.length === 0) {
      commentList.innerHTML =
        '<div style="color:#90949c; text-align:center; padding:10px;">Vuoto spaziale...</div>';
      return;
    }
    comments.forEach((c) => {
      const div = document.createElement("div");
      div.className = "comment-item";
      div.innerHTML = `<span class="comment-author-name">${c.user}</span> <span style="color:#1d2129;">${c.text}</span><div style="font-size:11px; color:#90949c;">${c.date}</div>`;
      commentList.appendChild(div);
    });
  }
