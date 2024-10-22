import TableSales from './TableSales';
import SearchSales from './SearchSales';  
import ButtonSales from './ButtonSales';
import PurchaseStatusSelect from './FilterPurchase';
const SalesHistory = () => {
  return (
    <div className="sales-history-container">
      <div className='mt-4'>
        <ButtonSales/>
      </div>  
      <div className='mt-4'>
        <SearchSales onSearch={() => {}}/>
      </div>
      <div>
        <PurchaseStatusSelect onChange={() => {}}/>
      </div>
      <div className='mt-4'>
        <TableSales/>
      </div>
    </div>
  );
};

export default SalesHistory;  