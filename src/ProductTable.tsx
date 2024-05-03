import React from 'react';
import './index.css'; // Importa os estilos CSS

interface Product {
  portfolioProductId: number;
  productName: string;
  correctedQuota: number;
  value: number;
}

interface Props {
  products?: Product[];
}

const ProductTable: React.FC<Props> = ({ products = [] }) => {
  return (
    <div className="table-container"> {/* Adiciona uma div para permitir rolagem horizontal */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome do Produto</th>
            <th>Cota Corrigida</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={`${product.portfolioProductId}_${index}`}> {/* Adicionando o índice na chave */}
              <td>{product.portfolioProductId}</td>
              <td>{product.productName}</td>
              <td>{product.correctedQuota}</td>
              <td>{product.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
