function solve() {
    return function (fileContentsByName) {


        // select
        var AddButton = $('.add-btn.visible');
        var input = $('.file-explorer input');
        var fileExplorer = $('.file-explorer');
        var mainUl = $(fileExplorer.children()[1]);
        var allDelButns = $('.del-btn');
        var filePrev = $('.file-content');

        // create
        var li = $('<li />').addClass('file-item').addClass('item');
        var itemName = $('<a />').addClass('item-name');
        var delBtn = $('<a />').addClass('del-btn');



        // EVENTS
        // add input field
        AddButton.on('click', function () {
            AddButton.toggleClass('visible');
            input.toggleClass('visible');
        });


        // add file
        input.on('keypress', function (e) {
            var code = e.keyCode || e.which;
            if (code == 13) {  
                var newLi = li.clone();
                var newItemName = itemName.clone();
                var newDelBtn = delBtn.clone();
                var value = input.val();

                if (value.indexOf('/') > -1) {
                    var valueElements = value.split('/');
                    var nameOfDir = valueElements[0];
                    var allInnerDirs = $('.dir-item');

                    for (var i = 0; i < allInnerDirs.length; i += 1) {
                        var innerA = $(allInnerDirs[i]).children().first();
                        if (innerA.html() === nameOfDir) {
                            newItemName.html(valueElements[1]);

                            newLi.append(newItemName);
                            newLi.append(newDelBtn);
                            var innerUl = $(allInnerDirs[i]).find('.items');
                            innerUl.append(newLi);
                            fileContentsByName[valueElements[1]] = '';
                            console.log(fileContentsByName);
                        }
                    }
                } else {
                    newItemName.html(value);
                    newLi.append(newItemName);
                    newLi.append(newDelBtn);
                    mainUl.append(newLi);
                    fileContentsByName[value] = '';
                }

                input.val('');

                AddButton.toggleClass('visible');
                input.toggleClass('visible');
            }
        });

        // remove file
        mainUl.on('click', '.del-btn', function (ev) {
            var target = $(ev.target);
            target.parent().remove();
        });

        //collapse
        mainUl.on('click', '.dir-item', function (ev) {
            var target = $(ev.target);
            target.parent().toggleClass('collapsed');
        });


        mainUl.on('click', '.file-item', function (ev) {
            var target = $(ev.target);
            var content = target.html();
            filePrev.text(fileContentsByName[content]).html();
        });
    };
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}