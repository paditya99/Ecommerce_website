class ApiFeatures{
    constructor(query,querystr){ 
        this.query = query;
        this.querystr = querystr;  
    }

    search(){
        const keyword=this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {};

        this.query=this.query.find({...keyword});
        return this;
    }
    
    filter(){
       const queryCopy={...this.querystr};
       const removeItems=["keyword","page","limit"];
       removeItems.forEach(key=>delete queryCopy[key]);
       
       //Filter for price and rating
        let querystr=JSON.stringify(queryCopy);
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g, key=> `$${key}`);
        this.query=this.query.find(JSON.parse(querystr));
        return this;
       
    }

    pagination(resultsPerPage){
        const currPage=Number(this.querystr.page) || 1;
        const skip=resultsPerPage*(currPage-1);
        this.query=this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
    
}

module.exports=ApiFeatures