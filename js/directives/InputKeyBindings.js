var keyBindingDirective = angular.module('outlinear.keyBindingDirective', [])

/*
 * Handles key presses for input elements
 */

keyBindingDirective.directive('olStandardInputKeybindings', function() {
    return function(scope, el, attr) {
        el.bind('keydown', function(e) {
            // CTRL key commands
            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case 83: // CTRL-S: strikethrough
                        e.preventDefault();
                        scope.toggleStrike(el);
                        break;

                    case 40: // CTRL-down: move line down
                        e.preventDefault();
                        scope.moveDown(el);
                        break;

                    case 38: // CTRL-up: move line up
                        e.preventDefault();
                        scope.moveUp(el);
                        break;
                }
                return;
            }

            switch (e.keyCode) {
                case 40: // down
                    e.preventDefault()
                    scope.focusNext(el);
                    break;
                case 38: // up
                    e.preventDefault();
                    scope.focusPrev(el);
                    break;
                case 9: // tab: change indent
                    e.preventDefault();
                    if (e.shiftKey)
                        scope.decreaseIndent(el);
                    else
                        scope.increaseIndent(el);
                    break;
                case 13: // enter: create new line
                    e.preventDefault();
                    scope.insertLineAfter(el);
                    scope.focusNext(el);
                    break;
                case 46: // delete: delete line
                    e.preventDefault();
                    scope.deleteLine(el);
                    break;
            }
        });
    }
});



keyBindingDirective.directive('olVimInputKeybindings', function() {
    var insert_mode = false;
    return function(scope, el, attr) {
        el.bind('keydown', function(e) {
            // special case when CTRL is pressed
            // avoids preventing default browser behaviour
            if (e.ctrlKey) {
                return;
            }
            switch (e.keyCode) {
                case 40: // down
                    e.preventDefault()
                    scope.focusNext(el);
                    break;
                case 38: // up
                    e.preventDefault();
                    scope.focusPrev(el);
                    break;
                case 9: // tab: change indent
                    e.preventDefault();
                    if (e.shiftKey)
                        scope.decreaseIndent(el);
                    else
                        scope.increaseIndent(el);
                    break;

                case 73: // i: enter insert mode
                    // move to insert mode if we're not in it
                    if (!insert_mode) {
                        e.preventDefault()
                        insert_mode = true;
                    }
                    break;
                case 27: // esc: leave insert mode
                    insert_mode = false;
                    break;
            }

            // command mode (!insert_mode) keys
            if (!insert_mode) {
                e.preventDefault();
                switch(e.keyCode) {
                    case 74: // j: go down
                        scope.focusNext(el);
                        break;
                    case 75: // k: go up
                        scope.focusPrev(el);
                        break;
                }
            }
        });
   }
});


