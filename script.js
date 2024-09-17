// Select the form and the links list
const form = document.getElementById('link-form');
const linksList = document.getElementById('links-list');

// Load saved links from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadLinks);

function loadLinks() {
    const storedLinks = JSON.parse(localStorage.getItem('affiliateLinks')) || [];
    
    // Loop through stored links and display them
    storedLinks.forEach((link, index) => {
        addLinkToList(link.name, link.url, index);
    });
}

// Event listener for form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values from the form
    const linkName = document.getElementById('link-name').value;
    const linkUrl = document.getElementById('link-url').value;

    // Add the new link to the displayed list
    const index = saveLink(linkName, linkUrl);
    addLinkToList(linkName, linkUrl, index);

    // Clear the form
    form.reset();
});

function addLinkToList(name, url, index) {
    // Create a new list item with the affiliate link
    const li = document.createElement('li');
    li.innerHTML = `
        <a href="${url}" target="_blank">${name}</a>
        <button class="copy-btn" data-url="${url}">Copy</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    
    // Append the new link to the links list
    linksList.appendChild(li);
    
    // Add event listener for delete and copy buttons
    li.querySelector('.delete-btn').addEventListener('click', deleteLink);
    li.querySelector('.copy-btn').addEventListener('click', copyLink);
}

function saveLink(name, url) {
    // Retrieve the current list of saved links from local storage
    const storedLinks = JSON.parse(localStorage.getItem('affiliateLinks')) || [];

    // Add the new link to the list
    const index = storedLinks.push({ name, url }) - 1;

    // Save the updated list back to local storage
    localStorage.setItem('affiliateLinks', JSON.stringify(storedLinks));

    return index;
}

function deleteLink(e) {
    const index = e.target.getAttribute('data-index');

    // Retrieve the current list of saved links
    let storedLinks = JSON.parse(localStorage.getItem('affiliateLinks'));

    // Remove the link at the given index
    storedLinks.splice(index, 1);

    // Update local storage
    localStorage.setItem('affiliateLinks', JSON.stringify(storedLinks));

    // Refresh the displayed links
    linksList.innerHTML = '';
    loadLinks();
}

function copyLink(e) {
    const url = e.target.getAttribute('data-url');

    // Create a temporary input element to copy the URL
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Alert the user that the link has been copied
    alert('Link copied to clipboard!');
}