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

    newBookForm.css('color', 'white');

    var loadAllBooks = function () {
        $.ajax({
            url: "http://localhost:8888/Bookshelf/api/src/Books.php",
            method: "GET",
            dataType: "JSON"
        }).done(function (booksTable) {
                //console.log("udalo się");
                console.log(booksTable);
                var bookDiv = $('#books');
                bookDiv.empty();
                for (var i = 0; i < booksTable.length; i++) {
                    var titleDiv = $('<button>');
                    titleDiv.attr('data-id', booksTable[i].id);
                    titleDiv.attr('data-index', i);
                    titleDiv.addClass('list-group-item mainDiv');
                    var titleSpan = $('<h3>');
                    titleSpan.text(booksTable[i].name);
                    titleSpan.addClass('pull-left');
                    var authorSpan = $('<h3>');
                    authorSpan.text(booksTable[i].author);
                    authorSpan.addClass('pull-right');

                    titleDiv.append(titleSpan, authorSpan);

                    var descDiv = $('<div>');
                    descDiv.addClass('list-group-item active');
                    descDiv.css('height', 'auto');
                    descDiv.css('min-height', '100px');

                    descDiv.text(booksTable[i].description);


                    //titleDiv.text(booksTable[i].name + '' + booksTable[i].author);
                    descDiv.append($('<button class="delButton btn btn-danger pull-right">Delete</button>'));
                    descDiv.append($('<button class="editButtons btn btn-default pull-right">Edit</button>'));
                    titleDiv.appendTo(bookDiv);
                    descDiv.appendTo(bookDiv);


                    var delbttns = $('.delButton');
                    delbttns.addClass('');
                    /*
                     var showButtons = $('.showButton');
                     showButtons.addClass('btn btn-success pull-right');
                     */

                    delbttns.eq(i).on('click', function () {
                        var bookid = $(this).parent().prev().attr('data-id');
                        console.log(bookid);
                        $.ajax({
                            url: "http://localhost:8888/Bookshelf/api/src/Books.php",
                            method: "DELETE",
                            data: 'id=' + bookid
                            //dataType: 'JSON'

                        }).done(function (data) {
                            console.log(data);
                            loadAllBooks();

                        }).fail(function (xhr, status, errorThrown) {
                            console.log('fail');
                            console.log(status);
                            console.log(errorThrown);
                        })

                    });


                    descDiv.hide();

                    titleDiv.click(function () {

                        var nextDiv = $(this).next();

                        console.log(nextDiv.css('display'));

                        if (nextDiv.css('display') == 'none') {
                            $(this).next('div').show();
                        } else {
                            $(this).next('div').hide();
                        }


                    });

                }
                var editDescFrom = $('<form class="form-horizontal">');

                var labelName = $('<label class="control-label">');
                var labelAuthor = $('<label class="control-label">');
                var labelDesc = $('<label class="control-label">');

                editDescFrom.append(labelName);
                labelName.text('Nazwa:');
                labelName.append($('<input class="form-control" name="bookName" type="text">'));

                editDescFrom.append(labelAuthor);
                labelAuthor.text('Author:');
                labelAuthor.append($('<input class="form-control" name="bookAuthor" type="text">'));

                editDescFrom.append(labelDesc);
                labelDesc.text('Description:');
                labelDesc.append($('<input class="form-control" name="bookDesc">'));

                var submitinput = $('<input type="submit" class="btn btn-success">');

                editDescFrom.append(submitinput);
                var nameInput = editDescFrom.find('input');


                var editbttns = $('.editButtons');
                editbttns.on('click', function () {

                    var bookindex = $(this).parent().prev().attr('data-index');
                    var last = $(this).parent().find();
                    console.log(last);

                    $(this).parent().append(editDescFrom);

                    nameInput.eq(0).attr('value', booksTable[bookindex].name);
                    nameInput.eq(1).attr('value', booksTable[bookindex].author);
                    nameInput.eq(2).attr('value', booksTable[bookindex].description);

                    console.log(bookindex);


                    console.log(submitinput);
                    submitinput.on('click', function (e) {
                        e.preventDefault();

                        console.log($(this));
                        var bookid = $(this).parent().parent().prev().attr('data-id');

                        var name = $(this).prev().prev().prev().children().val();
                        var author = $(this).prev().prev().children().val();
                        var description = $(this).prev().children().val();

                        $.ajax({
                            url: "http://localhost:8888/Bookshelf/api/src/Books.php",
                            method: "PUT",
                            data: "id=" + bookid + "&description=" + description + "&author=" + author + "&name=" + name

                        }).done(function (data) {
                            console.log(data);
                            loadAllBooks();

                        }).fail(function (xhr, status, errorThrown) {
                            console.log('fail');
                            console.log(status);
                            console.log(errorThrown);
                        })


                    });

                });



            }
        ).fail(function (xhr, status, errorThrown) {
            console.log('fail');
            console.log(status);
            console.log(errorThrown);
        })
    };

    loadAllBooks();


// setInterval(loadAllBooks,5000);
//loadAllBooks();

})
;
