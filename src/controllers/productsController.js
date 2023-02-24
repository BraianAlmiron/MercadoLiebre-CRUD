const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		return res.render('products',{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const detailProduct = products.find(product => product.id === +id);

		return res.render('detail',{
			
			detailProduct,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name,price,discount,description,category,image} = req.body;

		const newProduct = {
			id: products[products.length - 1].id + 1,
			name: name.trim(),
			price: +price,
			description: description.trim(),
			image: req.file ? req.file.filename : 'default-image.png',
			discount: +discount,
			category: category.trim()
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, 3), 'utf-8');
		return res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const {id} = req.params;

		const productEdit = products.find(product => product.id === +id);
		return res.render('product-edit-form.ejs',{
			...productEdit
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name,price,discount,description,category,image} = req.body;

		const id = +req.params.id

		const productEdit = products.find(product => product.id === +id);

		const productUpdated = {
			id,
			name: name.trim(),
			price: +price,
			description: description.trim(),
			image: productEdit.image,
			discount: +discount,
			category: category.trim()
		};

		const productsModified = products.map(product => {
			if(product.id === id){
				return productUpdated
			}
			return product
		});

		fs.writeFileSync(productsFilePath,JSON.stringify(productsModified, null, 3), 'utf-8');

		return res.redirect('/products/detail/' + id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params;
		const productsModified = products.filter(product => product.id !== +id);

		fs.writeFileSync(productsFilePath,JSON.stringify(productsModified, null, 3), 'utf-8');
		return res.redirect('/')
	}
};

module.exports = controller;