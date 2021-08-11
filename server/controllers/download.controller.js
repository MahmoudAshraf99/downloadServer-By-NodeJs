const mongoose = require('mongoose')
const downloadSchema = require('../models/file.model')
const paginatePage = require('../helpers/paginateFunction')
const intialSchema = require('../helpers/intialSchema')
var downloadVariable = '';
var numOfDownload = 0; 
var fileId
var model

const PDF = mongoose.model('PDF', downloadSchema)
const PROGRAMMING = mongoose.model("PROGRAMMING", downloadSchema)
const MARKETING = mongoose.model("MARKETING", downloadSchema);
const ENGINEERING = mongoose.model("ENGINEERING", downloadSchema);


const getHomeAdmin = (req, res)=>{
    res.render("admin/admin", {
        path: "/admin",
        csrfToken: req.csrfToken()
    }) 
}

const getProgamAdmin = (req, res)=>{
    res.render("admin/admin-programming", {
        path: "/admin/programming",
        csrfToken: req.csrfToken()
    }) 
}
const getEngAdmin = (req, res)=>{
    res.render("admin/admin-engineering", {
        path: "/admin/engineering",
        csrfToken: req.csrfToken()
    }) 
}
const getMarketAdmin = (req, res)=>{
    res.render("admin/admin-marketing", {
        path: "/admin/marketing",
        csrfToken: req.csrfToken()
    }) 
}

const makePost = (req, modelName, path, res)=>{
    const file =  intialSchema(modelName, req);
    file.save()
    .then(data=>{
        return res.status(200).redirect(path)
    })
    .catch(err => console.log(err))
}
const postHomeAdmin = (req, res)=>{
    return makePost(req, PDF, '/', res)
}
const postEngAdmin = (req, res)=>{
    return makePost(req, ENGINEERING, '/engineering', res)
}
const postMarketAdmin = (req, res)=>{
    return makePost(req, MARKETING, '/marketing', res)
}
const postProgAdmin = (req, res)=>{
    return makePost(req, PROGRAMMING, '/programming', res)
}
const getHome = (req, res)=>{
    paginatePage(req, 6, PDF, '/', "home", res);
    return paginatePage;
}

const getProgramming = (req, res)=>{
    paginatePage(req, 9, PROGRAMMING, '/programming', 'programming', res);
    return paginatePage;
}

const getEngineering = (req, res)=>{
    paginatePage(req, 9, ENGINEERING, '/engineering', 'engineering', res);
    return paginatePage;
}

const getMarketing = (req, res)=>{
    paginatePage(req, 9, MARKETING, '/marketing', 'marketing', res);
    return paginatePage;
}

const filePathToDownload = async (req, modelName, downPage, res)=>{
    const postID = req.params.postID
    await modelName.findById(postID)
    .then((data) => {
        res.render("downloads/"+downPage, {details: data})     
        let file = `${process.cwd()}/public/uploads/${data.pdfFileName}`
        //countDownload()
        downloadVariable = file;
        fileId = data._id;
        numOfDownload = data.downloads;
        model = modelName;
        //modelName.updateOne({_id: data._id}, {$set:{ downloads: data.downloads+1} } )
    }).catch(err => res.send(err)) 
}

const getHomeDownloadPage = (req, res)=>{
    filePathToDownload(req, PDF,"home-download", res);
    return filePathToDownload;
}
const getProgrammingDownloadPage = (req, res)=>{
    filePathToDownload(req, PROGRAMMING,"programming-download", res);
    return filePathToDownload;
}
const getEngineeringDownloadPage = (req, res)=>{
    filePathToDownload(req, ENGINEERING,"engineering-download", res);
    return filePathToDownload;
}
const getMarketingDownloadPage = (req, res)=>{
    filePathToDownload(req, MARKETING,"marketing-download", res);
    return filePathToDownload;
}

const downloadFunction = (req, res)=>{
    model.findByIdAndUpdate(fileId, { $set: {downloads: numOfDownload+1}}, (err)=>{
        if(!err){
            //countDownload(req, userDownload, res);
            return res.download(downloadVariable);
        }else{
            res.json({
                error: "Sorry u can't Download Now "
            })
        }
    }) 
}

module.exports = {
    getHome,
    getHomeAdmin,
    postHomeAdmin,
    getProgramming,
    getEngineering,
    getMarketing,
    getHomeDownloadPage,
    getProgrammingDownloadPage,
    getEngineeringDownloadPage,
    getMarketingDownloadPage,
    downloadFunction, 
    getProgamAdmin,
    getEngAdmin,
    getMarketAdmin,
    postEngAdmin,
    postMarketAdmin,
    postProgAdmin
}