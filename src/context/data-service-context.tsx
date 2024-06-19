import { createContext, ReactNode, useContext } from 'react';
import { IDataService } from '@/interfaces/data-service';

const DataServiceContext = createContext<IDataService | null>(null);

export const DataServiceProvider = ({
  children,
  service,
}: {
  children: ReactNode;
  service: IDataService;
}) => {
  return (
    <DataServiceContext.Provider value={service}>
      {children}
    </DataServiceContext.Provider>
  );
};

export const useDataService = () => {
  const context = useContext(DataServiceContext);
  if (!context) {
    throw new Error('useDataService must be used within a DataServiceProvider');
  }
  return context;
};
