
const asyncHandler = (ctrl) => {
    return (req, res, next) => {
        Promise.resolve(ctrl (req, res, next)).catch(next)
    }
}

module.exports = asyncHandler;