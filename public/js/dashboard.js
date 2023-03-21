let toggled = true;

const showCreatePost = async () => {
    let createPost = document.querySelector('.post-create')
    let posts = document.querySelector('#dashboards-posts')

    if(toggled) {
        createPost.style.display = 'block'
        posts.style.display = 'none'
        toggled = false;
    } else {
        createPost.style.display = 'none'
        posts.style.display = 'block'
        toggled = true;
    }
};

const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').ariaValueMax.trim();
    const content = document.querySelector('#post-content').ariaValueMax.trim();

    if(title && content) {
        const response = await fetch('/api/post/create', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            window.location.href = '/dashboard'
        } else {
            alert('Failed to create post');
        }
    }
}

const selectPost = async (event) => {
    var target = getLiTag(event.target)

    document.location.replace(`/post/${target.id}`);
}

function getLiTag(target) {
    if(!(target.tagName === 'LI')) {
        target = getLiTag(target.parentElement)
    }
    return target;
}

var tags = document.getElementsByTagName("li")
for (const key in tags) {
    if(tags[key].tagName === 'LI') {
        tags[key].addEventListener('click', selectPost);
    }
}

document.querySelector('#new-post').addEventListener('click', showCreatePost);
document.querySelector('.create-post-form').addEventListener('submit', createPost);