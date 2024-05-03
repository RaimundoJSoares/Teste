import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';

interface ProductData {
  portfolioProductId: number;
  productName: string;
  correctedQuota: number;
  value: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [filterId, setFilterId] = useState<string>('');
  const [filterName, setFilterName] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://6270328d6a36d4d62c16327c.mockapi.io/getFixedIncomeClassData");
        const dailyEquityByPortfolioChartData: ProductData[] = response.data.data.dailyEquityByPortfolioChartData; // Ajuste aqui para acessar data.dailyEquityByPortfolioChartData
        setProducts(dailyEquityByPortfolioChartData);
        setFilteredProducts(dailyEquityByPortfolioChartData);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterId(event.target.value);
    filterProducts(event.target.value, filterName);
  };

  const handleFilterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    filterProducts(filterId, event.target.value);
  };

  const filterProducts = (id: string, name: string) => {
    const filtered = products.filter(product => {
      return (
        product.portfolioProductId.toString().includes(id) &&
        product.productName.toLowerCase().includes(name.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
  };

  const toggleSortOrder = () => {
    if (Array.isArray(filteredProducts)) { // Verifica se filteredProducts é um array antes de ordená-lo
      const sorted = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.value - b.value;
        } else {
          return b.value - a.value;
        }
      });
      setFilteredProducts(sorted);
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <div>
      <h1>Lista de Produtos de Investimento</h1>
      <div>
        <input type="text" placeholder="Id do Produto" value={filterId} onChange={handleFilterIdChange} />
        <input type="text" placeholder="Nome do Produto" value={filterName} onChange={handleFilterNameChange} />
      </div>
      <button onClick={toggleSortOrder}>Ordenar por Valor ({sortOrder === 'asc' ? 'ascendente' : 'descendente'})</button>
      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default App;
