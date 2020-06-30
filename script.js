 //DOM Elements
 let button = document.getElementById('add-book');
 let form = document.getElementById('book-form'); 
 let overlay = document.getElementById('overlay');
 let submit = document.getElementById('submit');
 let cancel = document.getElementById('cancel')
 let bookName = document.getElementById('book-name');
 let authorName = document.getElementById('author-name');
 let pages = document.getElementById('pages');
 let library = document.getElementById('library-chart');

 //Event Delegation
 function getEventTarget(e) {
     e = e || window.event; 
     return e.target || e.srcElement; 
 }
 
 //Array to Store Books
 let myLibrary = []; 
 
 //Function to create Book Objects        
 function book(title, author, pages) {
     this.title = title
     this.author = author
     this.pages = pages
     this.read = 'not'
     this.info = function() {
         return `${title} by ${author}, ${pages} pages.`
     }
 }

 //Function to Add Books to Library
 function addBooksToLibrary(title, author, pages) {
     let newItem = new book(title, author, pages); 
     myLibrary.push(newItem);
 } 

 //Function to Make Form Appear
 function formAppear() {
     overlay.style.visibility = 'visible';
 }


 //Function to create Title Div
 function createTitle() {
     let newDiv = document.createElement('div');
         newDiv.innerHTML = myLibrary[i].title
         newDiv.classList.add('bold');
         library.appendChild(newDiv);
 }
 
 //Function to create Author Div
 function createAuthor() {
     newDiv = document.createElement('div');
     newDiv.innerHTML = myLibrary[i].author; 
     library.appendChild(newDiv);
 }

 //Function to Create Pages Div
 function createPages() {
     newDiv = document.createElement('div');
     newDiv.innerHTML = myLibrary[i].pages; 
     library.appendChild(newDiv);
 }

 //Function to Create Read Button
 function createReadButton() {
     let readButton = document.createElement('button');
     readButton.dataset.index = [i];
     readButton.classList.add('read')
     library.appendChild(readButton); 
     let readIcon = document.createElement('i');
     readIcon.classList = 'material-icons';
     readIcon.innerHTML = 'done'; 
     readButton.appendChild(readIcon);
 }

 //Function to Create Delete Button
 function createDeleteButton() {
     let deleteButton = document.createElement('button');
     deleteButton.dataset.index = [i];
     deleteButton.classList.add('delete');
     library.appendChild(deleteButton); 
     let deleteIcon = document.createElement('i'); 
     deleteIcon.classList = 'material-icons'; 
     deleteIcon.innerHTML = 'delete';
     deleteButton.appendChild(deleteIcon);
 }

 //Function to Render the Book Objects
 function render(array) {
     for (i = 0; i < array.length; i++) {
         createTitle();
         createAuthor(); 
         createPages();
         createReadButton();
         createDeleteButton();
     }
 }

 //Click Event for Delete/Read Button
 library.addEventListener('click', function(e) {
     let target = getEventTarget(e);
     let num = target.dataset.index;
     if (target.className === 'delete') {
         myLibrary.splice(num, 1);
         while (library.firstChild) {
         library.removeChild(library.lastChild);
         }
         render(myLibrary); 
     } else if (target.classList.contains('read')) {
         if (myLibrary[num].read === 'read') {
             target.classList.remove('red');
             return myLibrary[num].read = 'not';
         } 
         target.classList.add('red');
         myLibrary[num].read = 'read'; 
     }
 })
 
 //Submit Button Functionality
 submit.addEventListener('click', function(e) {
     let newName = bookName.value;
     let newAuthor = authorName.value; 
     let newPages = pages.value;  
     if (newName !== '' && newAuthor !== '' && newPages !== '') {
     addBooksToLibrary(newName, newAuthor, newPages);
     while (library.firstChild) {
         library.removeChild(library.lastChild);
     }
     render(myLibrary);
     form.reset();
     overlay.style.visibility = 'hidden';
     e.preventDefault();
     }
 });

 //Cancel Button Functionality
 cancel.addEventListener('click', function(e) {
     form.reset();
     overlay.style.visibility = 'hidden';
 })

 //Click Event Listener for "Add Book" Button 
 button.addEventListener('click', function() {
     formAppear();
 });

 //Default Books to Display on Screen
 addBooksToLibrary('Catcher in the Rye', 'J.D Salinger', '203', 'not'); 
 addBooksToLibrary('Slaughterhouse-5', 'Kurt Vonnegut', '200', 'not');
 addBooksToLibrary('A Clockwork Orange', 'Anthony Burgess', '188', 'not');
 render(myLibrary);