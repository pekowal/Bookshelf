document.addEventListener('DOMContentLoaded', function () {

    console.log('dziala');

    var newBookForm = $('#createForm');


    newBookForm.on('submit', function (e) {
        e.preventDefault();

        var nameInput = $('#nameInput');
        var descInput = $('#descInput');
        var authorInput = $('#authorInput');


        var name = nameInput.val();
        var description = descInput.val();
        var author = authorInput.val();

        $.ajax({
            url: "http://localhost:8888/Bookshelf/api/src/Books.php",
            method: "POST",
            data: "name=" + name + "&description=" + description + "&author=" + author

        }).done(function (data) {
            console.log('DONE');

            loadAllBooks();

        })

    });

    newBookForm.css('color','white');

    var loadAllBooks = function () {
        $.ajax({
            url: "http://localhost:8888/Bookshelf/api/src/Books.php",
            method: "GET",
            dataType: "JSON"
        }).done(function (booksTable) {
            console.log("udalo się");
            console.log(booksTable);
            var bookDiv = $('#books');
            bookDiv.empty();
            for (var i = 0; i < booksTable.length; i++) {
                var titleDiv = $('<button>');
                titleDiv.attr('data-id', booksTable[i].id);
                titleDiv.addClass('list-group-item');
                var titleSpan = $('<h3>');
                titleSpan.text(booksTable[i].name);
                titleSpan.addClass('pull-left');
                var authorSpan = $('<h3>');
                authorSpan.text(booksTable[i].author);
                authorSpan.addClass('pull-right');

                titleDiv.append(titleSpan,authorSpan);

                var descDiv = $('<div>');
                descDiv.addClass('list-group-item active');
                descDiv.css('height','100px');
                descDiv.text(booksTable[i].description);



                //titleDiv.text(booksTable[i].name + '' + booksTable[i].author);
                descDiv.append($('<button class="delButton">Delete</button>'));
                //descDiv.append($('<button class="showButton">Show</button>'));
                titleDiv.appendTo(bookDiv);
                descDiv.appendTo(bookDiv);


                var delbttns = $('.delButton');
                delbttns.addClass('btn btn-danger pull-right');
                /*
                var showButtons = $('.showButton');
                showButtons.addClass('btn btn-success pull-right');
                */

                descDiv.hide();

                titleDiv.click(function () {

                    var nextDiv = $(this).next();

                    console.log(nextDiv.css('display'))

                    if(nextDiv.css('display') == 'none'){
                        $(this).next('div').show();
                    }else{
                        $(this).next('div').hide();
                    }

                });

            }






        }).fail(function (xhr, status, errorThrown) {
            console.log('fail');
            console.log(status);
            console.log(errorThrown);
        })
    };

    var deleteBook = function () {
        $.ajax({
            url: "http://localhost:8888/Bookshelf/api/src/Books.php",
            method: "DELETE",
            dataType: "JSON"

        }).done(function (data) {
            console.log('delete ajax');
        })

    };


    loadAllBooks();


    // setInterval(loadAllBooks,5000);
    //loadAllBooks();

});
