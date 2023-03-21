const selectPost = async (event) => {
    var target = getLiTag(event.target)

    document.location.raplace(`/post/${target.id}`);
}

function getLiTag(target) {
    if(!(target.tagName === 'LI')) {
        target = getLiTag(target.parentElement)
    }
    return target;
}

var tags = document.getElementsByTagName("li")
for(const key in tags) {
    if(tags[key].tagName === 'LI') {
        tags[key].addEventListener('click, selectPost');
    }
}