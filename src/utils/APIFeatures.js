function APIFeatures(query, queryString) {
	this.query = query; // Post.find()
	this.queryString = queryString; // req.query
	this.paginating = () => {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit || 10;
		const skip = limit * (page - 1);

		this.query = this.query.limit(limit).skip(skip);
		return this;
	};
	//this.query = Post.find().sort(sort)
	this.sorting = () => {
		const sort = this.queryString.sort || '-createdAt';
		this.query = this.query.sort(sort);
		return this;
	};
	//this.query = Post.find().find({$text: {$search: search}})
	this.searching = () => {
		const search = this.queryString.search;
		if (search) {
			this.query = this.query.find({
				$text: { $search: search },
			});
		} else {
			this.query = this.query.find();
		}
		return this;
	};

	this.filtering = (arrKey = []) => {
		var queryObj = { ...this.queryString };

		//convert to array, ex: company: 123,abc => company: ['123', 'abc']
		arrKey.forEach((e) => {
			const tmp = queryObj[e]?.split(',');
			if (tmp) {
				queryObj = {
					...queryObj,
					[e]: tmp,
				};
			}
		});

		const excludedFields = ['page', 'sort', 'search', 'limit'];
		excludedFields.forEach((el) => delete queryObj[el]);
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gte|gt|lt|lte|regex)\b/g,
			(match) => '$' + match
		);
		// {{price: {gt: '100'}}} => {"price": {$gt: "100"}}
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	};
}

module.exports = APIFeatures;
