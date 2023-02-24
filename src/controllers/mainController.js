const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		const productsVisited = products.filter(product => product.category === "visited");
		const salesProducts = products.filter(product => product.category === "in-sale");


		return res.render('index',{
			products,
			productsVisited,
			salesProducts,
			toThousand
		})
	},
	search: (req, res) => {
		const {keywords} = req.query;

		const productsFiltered = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()) || product.description.toLowerCase().includes(keywords.toLowerCase()))

		return res.render('results',{
			productsFiltered,
			toThousand
		})
	},
};

module.exports = controller;
