/* globals document, window, console */

function solve() {
    return function (selector, initialSuggestions) {
        var wrapper = document.querySelector(selector);
        initialSuggestions = initialSuggestions || [];

        var input = wrapper.getElementsByClassName('tb-pattern')[0];
        var ul = wrapper.getElementsByClassName('suggestions-list')[0];
        var button = wrapper.getElementsByClassName('btn-add')[0];

        var li = document.createElement('li');
        li.className = 'suggestion';
        var a = document.createElement('a');
        a.className = 'suggestion-link';
        a.href = '#';


        Array.prototype.contains = function (v) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].toLowerCase() === v.toLowerCase()) return true;
            }
            return false;
        };

        Array.prototype.unique = function () {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
                if (!arr.contains(this[i])) {
                    arr.push(this[i]);
                }
            }
            return arr;
        };


        AddElementsFromArray();

       
        // ADD ALL ELEMENTS FROM ARRAY
        function AddElementsFromArray() {
            ul.innerHTML = '';
            initialSuggestions = initialSuggestions.unique();
            for (var i = 0, len = initialSuggestions.length; i < len; i += 1) {
                var newLi = li.cloneNode(true);
                var newA = a.cloneNode(true);
                newA.innerHTML = initialSuggestions[i];
                ul.appendChild(newLi);
                newLi.appendChild(newA);
            }
        }

        // EVENTS
        // Add event
        button.addEventListener('click', function () {
            var enteredValue = input.value;

            initialSuggestions.push(enteredValue);
            AddElementsFromArray();
            input.value = '';
        }, false);

        // link event
        ul.addEventListener('click', function (ev) {
            var target = ev.target;
            if (target.className === 'suggestion-link') {
                input.value = target.innerHTML;
            }
        }, false);

        // filter event
        input.addEventListener('input', function () {
            var inputValue = input.value.toLowerCase();
            var allLi = ul.getElementsByClassName('suggestion');
            var len = allLi.length;

            for (var j = 0; j < len; j += 1) {
                var currentA = allLi[j].firstElementChild.innerHTML.toLowerCase();

                if (currentA.indexOf(inputValue) === -1) {
                    allLi[j].style.display = 'none';
                } else {
                    allLi[j].style.display = '';
                }
            }

        }, false);
    };
}

module.exports = solve;