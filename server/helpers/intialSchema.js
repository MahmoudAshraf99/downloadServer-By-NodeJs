const intialSchema = (modelName, req)=>{
    const file = new modelName({
        title: req.body.title,
        imgFileName: req.files.image[0].filename,
        pdfFileName: req.files.pdfFile[0].filename,
        content1: req.body.content1,
        content2: req.body.content2,
        content3: req.body.content3,  
        content4: req.body.content4,
        author: req.body.author,
        keywords: req.body.keywords,
        size: Math.round(req.files.pdfFile[0].size / 1000000),
        downloads: 0,
        created: Data.now()

    })
    return file;
}
module.exports = intialSchema;