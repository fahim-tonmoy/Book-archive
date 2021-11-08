const toggleSpnnier = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

const searchBook = () => {
    const searchField = document.getElementById('search-value');

    const searchFieldValue = searchField.value;
    // console.log(searchFieldValue);

    // clearing the value
    searchField.value = '';
    
    // display spinner 
    toggleSpnnier('block');
    // fetching data
    const bookUrl = `https://openlibrary.org/search.json?q=${searchFieldValue}`
    fetch(bookUrl)
        .then (res => res.json())
        .then(data => displaySearchResult(data))

}


const displaySearchResult = books => {
    // console.log(books)
    
    
    const searchResult = document.getElementById('display-result');
    const numberiOfResult = document.getElementById('result-mumber');
    
    
    // checking if there is any results 
    if (books.numFound === 0) {
        numberiOfResult.textContent = '';
        searchResult.innerHTML = '';
        const span = document.createElement('span');
        span.innerHTML = `<h2 class="my-5 text-center" style="color: red">No Result Found</h2>`;
        numberiOfResult.appendChild(span);
        toggleSpnnier('none');
    } else {
        searchResult.innerHTML = '';
        numberiOfResult.textContent = '';
        const span = document.createElement('span');
        span.innerHTML = `<h2 class="my-5 text-center" style="color: green">Result Found: ${books.numFound}</h2>`;
        numberiOfResult.appendChild(span);
    // console.log(numberiOfResult);

    // going through book of books one by one
        books.docs.forEach(book => {
            // console.log(book);
            // image URL
            const bookImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-75">
                <img src="${bookImageUrl}" class="card-img-top img-fluid h-50 mb-5" alt="">
                <div class="card-body">
                    <h5 class="card-title mb-2">Title: ${book.title}</h5>
                    <p class="card-text"><b>Authors: </b>${book.author_name}</p>
                    <p class="card-text"><b>Publishing Year: </b>${book.first_publish_year}</p>
                    <p class="card-text"><b>Edition: </b>${book.edition_count}</p>
            </div>
            `;
            searchResult.appendChild(div)
        });
        toggleSpnnier('none');
    }
}

// 