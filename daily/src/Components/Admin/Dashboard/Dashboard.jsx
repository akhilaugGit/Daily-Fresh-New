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

    // Modern color palette with gradients
    const COLORS = [
        '#3498db', '#2ecc71', '#f39c12', '#e74c3c', 
        '#9b59b6', '#1abc9c', '#f1c40f', '#34495e',
        '#16a085', '#d35400', '#8e44ad', '#27ae60'
    ];

    // Custom label for pie chart with improved positioning to prevent overlap
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius * 1.2; // Reduced radius to prevent overlap with legend
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        // Only show labels on the left side to avoid legend overlap
        if (x < cx) {
            return (
                <text 
                    x={x} 
                    y={y} 
                    fill="#2c3e50"
                    textAnchor="end"
                    dominantBaseline="central"
                    fontSize="12"
                    fontFamily="'Poppins', sans-serif"
                    fontWeight="500"
                >
                    {`${name}: ${value}`}
                </text>
            );
        }
        return null; // Don't show labels on right side (where legend is)
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
        return <div style={{
            color: '#e74c3c',
            padding: '20px',
            borderRadius: '10px',
            background: 'rgba(231, 76, 60, 0.1)',
            border: '1px solid #e74c3c',
            textAlign: 'center',
            margin: '50px auto',
            maxWidth: '600px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>Error: {error}</div>;
    }

    // Modern, premium dashboard styles with background image
    const dashboardStyle = {
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2671&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // For parallax effect
        backgroundPosition: 'center',
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        color: '#2c3e50',
        overflow: 'hidden',
        position: 'relative'
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        zIndex: 0
    };

    const headerStyle = {
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginTop: '20px',
        background: 'linear-gradient(to right,rgb(161, 52, 219),rgb(70, 46, 204))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '1px',
        position: 'relative',
        zIndex: 1
    };

    const containerStyle = {
        padding: '25px',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
    };

    const searchBarStyle = {
        width: '100%',
        maxWidth: '500px',
        padding: '15px 25px',
        border: 'none',
        borderRadius: '50px',
        outline: 'none',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        margin: '0 auto 30px',
        display: 'block'
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap'
    };

    const buttonStyle = (isActive) => ({
        padding: '12px 25px',
        borderRadius: '50px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        background: isActive ? 'linear-gradient(to right, #3498db, #2ecc71)' : 'rgba(255, 255, 255, 0.8)',
        color: isActive ? '#fff' : '#2c3e50',
        boxShadow: isActive ? '0 10px 20px rgba(52, 152, 219, 0.3)' : '0 5px 15px rgba(0, 0, 0, 0.05)',
        transform: isActive ? 'translateY(-2px)' : 'none'
    });

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        transform: 'translateY(0)',
        minHeight: '500px',
        marginBottom: '25px'
    };

    const cardHeaderStyle = {
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '20px',
        background: 'linear-gradient(to right, #3498db, #2ecc71)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(to right, #3498db, #2ecc71)',
        borderImageSlice: 1,
        paddingBottom: '10px',
        position: 'relative'
    };

    const tableContainerStyle = {
        overflowX: 'auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '25px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        marginBottom: '30px'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        fontSize: '1rem'
    };

    const thStyle = {
        textAlign: 'left',
        padding: '15px 20px',
        color: '#2c3e50',
        fontWeight: '600',
        borderBottom: '2px solid #3498db',
        background: 'linear-gradient(to right, rgba(52, 152, 219, 0.1), rgba(46, 204, 113, 0.1))'
    };

    const reportButtonStyle = {
        padding: '14px 30px',
        borderRadius: '50px',
        border: 'none',
        background: 'linear-gradient(to right, #3498db, #2ecc71)',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'block',
        margin: '25px auto 0',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 20px rgba(52, 152, 219, 0.3)'
    };

    // Style for product rows that will be passed to ProductCard component via a className
    const productRowStyle = {
        margin: '10px 0',
        transition: 'all 0.3s ease',
        borderRadius: '10px',
        background: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
    };

    return (
        <div style={dashboardStyle}>
            <div style={overlayStyle}></div>
            <Navbar />
            <h1 style={headerStyle}>Admin Dashboard</h1>
            
            <div style={containerStyle}>
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={searchQuery}
                    onChange={handleSearch}
                    style={searchBarStyle}
                    onFocus={(e) => {
                        e.target.style.boxShadow = '0 15px 30px rgba(52, 152, 219, 0.2)';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                        e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.05)';
                        e.target.style.transform = 'translateY(0)';
                    }}
                />

                <div style={buttonContainerStyle}>
                    <button 
                        style={buttonStyle(selectedCategory === 'fish')}
                        onClick={() => filterProducts('fish')}
                        onMouseOver={(e) => {
                            if (selectedCategory !== 'fish') {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedCategory !== 'fish') {
                                e.target.style.transform = 'none';
                                e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                            }
                        }}
                    >
                        Fish
                    </button>
                    <button 
                        style={buttonStyle(selectedCategory === 'poultry')}
                        onClick={() => filterProducts('poultry')}
                        onMouseOver={(e) => {
                            if (selectedCategory !== 'poultry') {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedCategory !== 'poultry') {
                                e.target.style.transform = 'none';
                                e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                            }
                        }}
                    >
                        Poultry
                    </button>
                    <button 
                        style={buttonStyle(selectedCategory === 'all')}
                        onClick={() => filterProducts('all')}
                        onMouseOver={(e) => {
                            if (selectedCategory !== 'all') {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedCategory !== 'all') {
                                e.target.style.transform = 'none';
                                e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
                            }
                        }}
                    >
                        Show All
                    </button>
                </div>

                {/* Product Stock Distribution - Full Width */}
                <div 
                    style={cardStyle}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-5px)';
                        e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <h2 style={cardHeaderStyle}>Product Stock Distribution</h2>
                    <div style={{ width: '100%', height: '450px' }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    innerRadius={60} // Added innerRadius for donut effect
                                    fill="#8884d8"
                                    dataKey="value"
                                    labelLine={true}
                                    label={renderCustomizedLabel}
                                    paddingAngle={2} // Added padding between segments
                                    animationBegin={0}
                                    animationDuration={1500} // Slower animation for elegance
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[index % COLORS.length]} 
                                            stroke="rgba(255,255,255,0.5)"
                                            strokeWidth={2}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    formatter={(value, name) => [`${value} units`, name]}
                                    contentStyle={{ 
                                        fontSize: '14px',
                                        borderRadius: '10px',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                                        border: 'none',
                                        padding: '10px 15px'
                                    }}
                                />
                                <Legend 
                                    layout="vertical" 
                                    align="right"
                                    verticalAlign="middle"
                                    wrapperStyle={{ 
                                        fontSize: '12px',
                                        fontFamily: "'Poppins', sans-serif",
                                        paddingLeft: '20px'
                                    }}
                                    iconType="circle"
                                    iconSize={10}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Product Stock Levels - Full Width Below Pie Chart */}
                <div 
                    style={cardStyle}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-5px)';
                        e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <h2 style={cardHeaderStyle}>Product Stock Levels</h2>
                    <div style={{ width: '100%', height: '450px' }}>
                        <ResponsiveContainer>
                            <BarChart 
                                data={barChartData} 
                                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                            >
                                <CartesianGrid 
                                    strokeDasharray="3 3" 
                                    stroke="rgba(0,0,0,0.1)" 
                                    vertical={false}
                                />
                                <XAxis 
                                    dataKey="name" 
                                    angle={-45} 
                                    textAnchor="end" 
                                    height={80} 
                                    interval={0}
                                    tick={{ 
                                        fontSize: 12,
                                        fontFamily: "'Poppins', sans-serif",
                                        fill: '#2c3e50'
                                    }}
                                    axisLine={{ stroke: '#e0e0e0' }}
                                    tickLine={{ stroke: '#e0e0e0' }}
                                />
                                <YAxis 
                                    tick={{ 
                                        fontSize: 12,
                                        fontFamily: "'Poppins', sans-serif",
                                        fill: '#2c3e50'
                                    }}
                                    axisLine={{ stroke: '#e0e0e0' }}
                                    tickLine={{ stroke: '#e0e0e0' }}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        fontSize: '14px',
                                        borderRadius: '10px',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                                        border: 'none',
                                        padding: '10px 15px',
                                        fontFamily: "'Poppins', sans-serif"
                                    }}
                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                />
                                <Bar 
                                    dataKey="stock" 
                                    radius={[10, 10, 0, 0]} // Rounded bar tops
                                    animationBegin={0}
                                    animationDuration={1500} // Slower animation for elegance
                                >
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

                <div style={tableContainerStyle}>
                    <h2 style={cardHeaderStyle}>Product List</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={{...thStyle, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>Product Name</th>
                                    <th style={thStyle}>Category</th>
                                    <th style={{...thStyle, borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => (
                                    <tr key={product._id || index} style={{
                                        background: index % 2 === 0 ? 'rgba(240, 240, 240, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                                        transition: 'all 0.3s ease',
                                        borderRadius: '10px',
                                        marginBottom: '8px'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                                        e.target.style.background = 'rgba(240, 248, 255, 0.8)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = 'none';
                                        e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                                        e.target.style.background = index % 2 === 0 ? 'rgba(240, 240, 240, 0.5)' : 'rgba(255, 255, 255, 0.5)';
                                    }}>
                                        <td style={{
                                            padding: '15px 20px', 
                                            borderTopLeftRadius: '10px',
                                            borderBottomLeftRadius: '10px',
                                            fontWeight: '500'
                                        }}>{product.name}</td>
                                        <td style={{padding: '15px 20px'}}>
                                            <span style={{
                                                padding: '5px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.85rem',
                                                background: product.category === 'fish' ? 'rgba(52, 152, 219, 0.2)' : 'rgba(46, 204, 113, 0.2)',
                                                color: product.category === 'fish' ? '#2980b9' : '#27ae60'
                                            }}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td style={{
                                            padding: '15px 20px', 
                                            borderTopRightRadius: '10px',
                                            borderBottomRightRadius: '10px',
                                            fontWeight: '600'
                                        }}>
                                            <span style={{
                                                color: product.stock > 40 ? '#27ae60' : product.stock > 25 ? '#f39c12' : '#e74c3c'
                                            }}>
                                                {product.stock}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button 
                        onClick={generatePDF}
                        style={reportButtonStyle}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 15px 30px rgba(52, 152, 219, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'none';
                            e.target.style.boxShadow = '0 10px 20px rgba(52, 152, 219, 0.3)';
                        }}
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