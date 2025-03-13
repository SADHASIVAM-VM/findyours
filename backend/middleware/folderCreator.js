const fs = require('fs')

const path = require('path');

function fileCreate() {
    const uploadPath = path.join(__dirname,'../', 'uploads');

    if (!fs.existsSync(uploadPath)) {
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) console.error("Error creating folder:", err);
        });
    }
}
module.exports = fileCreate;