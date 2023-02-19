const ctrlWrapper = controllers => {
    const func = async (req, res, next) => {
        try {
            await controllers(req, res, next);
        } catch (error) {
            res.status(500).json({ message: `${error.message}` });
        }
    }
    return func;
}

module.exports = ctrlWrapper;