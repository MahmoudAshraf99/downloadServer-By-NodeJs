const paginatePage = (req, itemPerPage, modelName, path, pageTitle, res)=>{
    let ITEM_PER_PAGE = itemPerPage;
    const page = +req.query.page || 1;
    let totalItems;
    modelName.find().countDocuments()
        .then((numProducrs)=>{
            totalItems = numProducrs;
            return modelName.find()
                .skip((page-1)*ITEM_PER_PAGE)
                .limit(ITEM_PER_PAGE)
        })
        .then( (post)=>{
            return res.status(200).render("routes/"+pageTitle,{
                path: path,
                posts: post,
                page_title: pageTitle,
                currentPage: page,
                hasNextPage: ITEM_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEM_PER_PAGE)
                    
            })
        })
        .catch((err) => {
            return res.status(500).send(err);
        })
}
module.exports = paginatePage;