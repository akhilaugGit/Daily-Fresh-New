import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, 
  PieChart, Pie, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import Navbar from './Navbar/Navbar';
import ProductCard from './ProductCard/ProductCard';
import Footer from './Footer/Footer';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    const COLORS = [
        '#2196F3', '#4CAF50', '#FFC107', '#F44336', 
        '#9C27B0', '#00BCD4', '#FF9800', '#795548',
        '#607D8B', '#E91E63', '#3F51B5', '#009688'
    ];

    // Custom label for pie chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius * 1.4; // Increased radius for label placement
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="black"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="12"
            >
                {`${name}: ${value}`}
            </text>
        );
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/view-product`);
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching the products!", error);
                setError(error.message);
                // Sample data for testing
                const sampleData = [
                    { name: 'Salmon', category: 'fish', stock: 50 },
                    { name: 'Tuna', category: 'fish', stock: 30 },
                    { name: 'Chicken', category: 'poultry', stock: 40 },
                    { name: 'Turkey', category: 'poultry', stock: 60 },
                    { name: 'Trout', category: 'fish', stock: 25 },
                    { name: 'Duck', category: 'poultry', stock: 35 }
                ];
                setProducts(sampleData);
                setFilteredProducts(sampleData);
            }
        };
        fetchProducts();
    }, []);

    const filterProducts = (category) => {
        let updatedProducts = products;

        if (category !== 'all') {
            updatedProducts = updatedProducts.filter((product) => product.category === category);
        }

        if (searchQuery) {
            updatedProducts = updatedProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
        setSelectedCategory(category);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        filterProducts(selectedCategory);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Product Report', 14, 10);
        
        doc.autoTable({
            head: [['Product Name', 'Category', 'Stock']],
            body: filteredProducts.map((product) => [
                product.name,
                product.category,
                product.stock
            ]),
        });

        doc.save('Product_Report.pdf');
    };

    // Prepare data for the pie chart
    const pieChartData = filteredProducts.map(product => ({
        name: product.name,
        value: product.stock
    }));

    // Prepare data for the bar chart - sort by stock level
    const barChartData = [...filteredProducts]
        .sort((a, b) => b.stock - a.stock)
        .map(product => ({
            name: product.name,
            stock: product.stock
        }));

    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <h1>Admin Dashboard</h1>
            
            <div className="p-6">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="🔎 Search by name"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <div className="flex gap-4 mb-6">
                    <button 
                        className={`px-4 py-2 rounded-lg ${selectedCategory === 'fish' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        onClick={() => filterProducts('fish')}
                    >
                        Fish
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-lg ${selectedCategory === 'poultry' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        onClick={() => filterProducts('poultry')}
                    >
                        Poultry
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        onClick={() => filterProducts('all')}
                    >
                        Show All
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Product Stock Distribution */}
                    <div className="bg-white p-4 rounded-lg shadow" style={{ minHeight: '500px' }}>
                        <h2 className="text-xl font-bold mb-4">Product Stock Distribution</h2>
                        <div style={{ width: '100%', height: '450px' }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={130}
                                        fill="#8884d8"
                                        dataKey="value"
                                        labelLine={true}
                                        label={renderCustomizedLabel}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={COLORS[index % COLORS.length]} 
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value, name) => [`${value} units`, name]}
                                        contentStyle={{ fontSize: '14px' }}
                                    />
                                    <Legend 
                                        layout="vertical" 
                                        align="right"
                                        verticalAlign="middle"
                                        wrapperStyle={{ fontSize: '12px' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Product Stock Levels */}
                    <div className="bg-white p-4 rounded-lg shadow" style={{ minHeight: '500px' }}>
                        <h2 className="text-xl font-bold mb-4">Product Stock Levels</h2>
                        <div style={{ width: '100%', height: '450px' }}>
                            <ResponsiveContainer>
                                <BarChart 
                                    data={barChartData} 
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis 
                                        dataKey="name" 
                                        angle={-45} 
                                        textAnchor="end" 
                                        height={80} 
                                        interval={0}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip contentStyle={{ fontSize: '14px' }} />
                                    <Bar dataKey="stock" fill="#8884d8">
                                        {barChartData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={COLORS[index % COLORS.length]} 
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Product List</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left p-2">Product Name</th>
                                    <th className="text-left p-2">Category</th>
                                    <th className="text-left p-2">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        name={product.name}
                                        category={product.category}
                                        stock={product.stock}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button 
                        onClick={generatePDF}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Generate Report
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;