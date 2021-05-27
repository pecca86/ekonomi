/* 
 Function that wraps in the async call
 This enables us to write less try-catch code
 fn = function
 returns = a function with req, res, next
 */
 function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

module.exports = wrapAsync