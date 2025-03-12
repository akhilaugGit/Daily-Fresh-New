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
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Premium, elegant color palette
    const COLORS = [
        '#3366FF', '#33CC99', '#FF9966', '#FF6699', 
        '#9966FF', '#00CCCC', '#FFCC33', '#8A6E52',
        '#607D8B', '#FF5252', '#5E7CE2', '#00BFA5'
    ];

    // Custom label for pie chart with improved positioning
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius * 1.6; // Increased radius for better label spacing
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text 
                x={x} 
                y={y} 
                fill="#333333"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="12"
                fontWeight="500"
                style={{ 
                    textShadow: '0 0 3px rgba(255, 255, 255, 0.7)',
                    fontFamily: 'Arial, sans-serif'
                }}
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

    // Enhanced styling for shadows, cards, and depth effects
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
            fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif"
        },
        pageTitle: {
            textAlign: 'center',
            fontSize: '2.2rem',
            fontWeight: '600',
            color: '#2d3748',
            margin: '20px 0',
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            letterSpacing: '0.5px'
        },
        contentContainer: {
            padding: '20px 32px',
            maxWidth: '1400px',
            margin: '0 auto'
        },
        searchBar: {
            width: "300px",
            padding: "12px 20px",
            border: isSearchFocused ? "2px solid #3366FF" : "1px solid rgba(255, 255, 255, 0.4)",
            borderRadius: "30px",
            outline: "none",
            fontSize: "15px",
            transition: "all 0.3s ease-in-out",
            boxShadow: isSearchFocused 
                ? "0 4px 20px rgba(51, 102, 255, 0.25)" 
                : "0 8px 20px rgba(0, 0, 0, 0.08)",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            color: "#333",
            marginBottom: "16px"
        },
        buttonGroup: {
            display: "flex",
            gap: "12px",
            marginBottom: "24px"
        },
        button: {
            padding: "10px 20px",
            borderRadius: "30px",
            border: "none",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        },
        fishButton: {
            background: selectedCategory === 'fish' ? 
                "linear-gradient(135deg, #00bcd4, #3366FF)" : 
                "rgba(255, 255, 255, 0.85)",
            color: selectedCategory === 'fish' ? "#fff" : "#333"
        },
        poultryButton: {
            background: selectedCategory === 'poultry' ? 
                "linear-gradient(135deg, #33CC99, #00BFA5)" : 
                "rgba(255, 255, 255, 0.85)",
            color: selectedCategory === 'poultry' ? "#fff" : "#333"
        },
        allButton: {
            background: selectedCategory === 'all' ? 
                "linear-gradient(135deg, #5E7CE2, #3366FF)" : 
                "rgba(255, 255, 255, 0.85)",
            color: selectedCategory === 'all' ? "#fff" : "#333"
        },
        chartCard: {
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            transition: "transform 0.3s ease-in-out",
            minHeight: "550px"
        },
        chartTitle: {
            fontSize: "20px",
            fontWeight: "600",
            color: "#2d3748",
            marginBottom: "20px",
            textAlign: "center",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: "12px"
        },
        chartContainer: {
            width: "100%",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        productListCard: {
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            marginTop: "24px"
        },
        tableHeader: {
            textAlign: "left",
            padding: "12px 16px",
            fontSize: "16px",
            fontWeight: "600",
            color: "#2d3748",
            borderBottom: "2px solid #e2e8f0"
        },
        generateButton: {
            marginTop: "20px",
            padding: "12px 24px",
            background: "linear-gradient(135deg, #3366FF, #5E7CE2)",
            color: "white",
            border: "none",
            borderRadius: "30px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 15px rgba(51, 102, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        gridContainer: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "24px"
        },
        errorMessage: {
            color: "#ff5252",
            padding: "16px",
            background: "rgba(255, 82, 82, 0.1)",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "500"
        }
    };

    if (error) {
        return <div style={styles.errorMessage}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            <Navbar />
            <h1 style={styles.pageTitle}>Premium Fish Market Dashboard</h1>
            
            <div style={styles.contentContainer}>
                <div>
                    <input
                        type="text"
                        placeholder="🔎 Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                        style={styles.searchBar}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                </div>
                <br/>

                <div style={styles.buttonGroup}>
                    <button 
                        style={{...styles.button, ...styles.fishButton}}
                        onClick={() => filterProducts('fish')}
                        onMouseOver={(e) => {
                            if (selectedCategory !== 'fish') {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedCategory !== 'fish') {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            }
                        }}
                    >
                        Fish Products
                    </button>
                    <button 
                        style={{...styles.button, ...styles.poultryButton}}
                        onClick={() => filterProducts('poultry')}
                        onMouseOver={(e) => {
                            if (selectedCategory !== 'poultry') {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedCategory !== 'poultry') {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            }
                        }}
                    >
                        Poultry Products
                    </button>
                    <button 
                        style={{...styles.button, ...styles.allButton}}
                        onClick={() => filterProducts('all')}
                        onMouseOver={(e) => {
                            if (selectedCategory !== 'all') {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.12)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (selectedCategory !== 'all') {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            }
                        }}
                    >
                        All Products
                    </button>
                </div>

                <div style={styles.gridContainer}>
                    {/* Product Stock Distribution */}
                    <div style={styles.chartCard}
                         onMouseOver={(e) => {
                             e.target.style.transform = 'translateY(-5px)';
                             e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                         }}
                         onMouseOut={(e) => {
                             e.target.style.transform = 'translateY(0)';
                             e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                         }}>
                        <h2 style={styles.chartTitle}>Product Stock Distribution</h2>
                        <div style={styles.chartContainer}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={150}
                                        innerRadius={60}
                                        fill="#8884d8"
                                        dataKey="value"
                                        labelLine={true}
                                        label={renderCustomizedLabel}
                                        paddingAngle={3}
                                        animationBegin={0}
                                        animationDuration={1500}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={COLORS[index % COLORS.length]} 
                                                stroke="rgba(255, 255, 255, 0.5)"
                                                strokeWidth={2}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value, name) => [`${value} units`, name]}
                                        contentStyle={{ 
                                            fontSize: '14px', 
                                            borderRadius: '10px', 
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            border: 'none'
                                        }}
                                        animationDuration={300}
                                    />
                                    <Legend 
                                        layout="vertical" 
                                        align="right"
                                        verticalAlign="middle"
                                        wrapperStyle={{ 
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            paddingLeft: '20px'
                                        }}
                                        iconType="circle"
                                        iconSize={10}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Product Stock Levels */}
                    <div style={styles.chartCard}
                         onMouseOver={(e) => {
                             e.target.style.transform = 'translateY(-5px)';
                             e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                         }}
                         onMouseOut={(e) => {
                             e.target.style.transform = 'translateY(0)';
                             e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                         }}>
                        <h2 style={styles.chartTitle}>Product Stock Levels</h2>
                        <div style={styles.chartContainer}>
                            <ResponsiveContainer>
                                <BarChart 
                                    data={barChartData} 
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                    barGap={8}
                                    barCategoryGap={16}
                                >
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        stroke="rgba(0, 0, 0, 0.1)"
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
                                            fontWeight: 500,
                                            fill: '#333'
                                        }}
                                        axisLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
                                        tickLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
                                    />
                                    <YAxis 
                                        tick={{ 
                                            fontSize: 12,
                                            fontWeight: 500,
                                            fill: '#333'
                                        }}
                                        axisLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
                                        tickLine={{ stroke: 'rgba(0, 0, 0, 0.2)' }}
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            fontSize: '14px', 
                                            borderRadius: '10px', 
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            border: 'none'
                                        }}
                                        cursor={{ 
                                            fill: 'rgba(0, 0, 0, 0.05)' 
                                        }}
                                        animationDuration={300}
                                    />
                                    <Bar 
                                        dataKey="stock" 
                                        radius={[8, 8, 0, 0]} 
                                        animationBegin={0}
                                        animationDuration={1500}
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
                </div>

                <div style={styles.productListCard}>
                    <h2 style={styles.chartTitle}>Product Inventory</h2>
                    <div style={{overflowX: 'auto'}}>
                        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                            <thead>
                                <tr>
                                    <th style={styles.tableHeader}>Product Name</th>
                                    <th style={styles.tableHeader}>Category</th>
                                    <th style={styles.tableHeader}>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => (
                                    <tr key={product._id || index} style={{
                                        background: index % 2 === 0 ? 'rgba(240, 245, 255, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                                        transition: 'all 0.2s ease-in-out'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'rgba(230, 240, 255, 0.8)';
                                        e.currentTarget.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = index % 2 === 0 ? 'rgba(240, 245, 255, 0.5)' : 'rgba(255, 255, 255, 0.5)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}>
                                        <td style={{
                                            padding: '16px', 
                                            fontSize: '15px',
                                            borderBottom: '1px solid #e2e8f0',
                                            color: '#2d3748',
                                            fontWeight: '500'
                                        }}>{product.name}</td>
                                        <td style={{
                                            padding: '16px', 
                                            fontSize: '15px',
                                            borderBottom: '1px solid #e2e8f0',
                                            color: product.category === 'fish' ? '#3366FF' : '#33CC99',
                                            fontWeight: '600'
                                        }}>{product.category}</td>
                                        <td style={{
                                            padding: '16px', 
                                            fontSize: '15px',
                                            borderBottom: '1px solid #e2e8f0',
                                            color: product.stock > 40 ? '#33CC99' : (product.stock < 30 ? '#FF5252' : '#FFAA00'),
                                            fontWeight: '600'
                                        }}>{product.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button 
                        onClick={generatePDF}
                        style={styles.generateButton}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 20px rgba(51, 102, 255, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(51, 102, 255, 0.3)';
                        }}
                    >
                        <span style={{marginRight: '8px'}}>📊</span>
                        Generate Report
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;