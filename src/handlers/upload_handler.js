export let uploadFileHandler = (req, res) => {
    try {
        console.log('upload handler req.file ->', req.file)
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "no file attached to request"
            })
        }
        let data = {
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
            upload_path: `/uploads/${req.file.filename}`
        }
        res.status(200).json({
            success: true,
            data: data,
        })
    } catch (error) {
        console.log('upload handler error ->', error)
        res.status(500).json({
            success: false,
            message: "internal server error",
            stack: error?.message
        })
    }
}